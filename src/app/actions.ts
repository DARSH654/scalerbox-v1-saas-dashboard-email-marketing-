
"use server";

import { generateResponse, GenerateResponseOutput } from "@/ai/flows/generate-response";
import { generateImage, GenerateImageOutput } from "@/ai/flows/generate-image";
import { enhancePrompt, EnhancePromptOutput } from "@/ai/flows/enhance-prompt";
import { z } from "zod";
import { createServerClient } from "@/lib/supabase";

// Define rates per million tokens
const MODEL_PRICING = {
    'default': { input: 0.50, output: 1.50 }, // Gemini 1.5 Pro
    'gemini': { input: 0.50, output: 1.50 }, // Generic Gemini
    'gemini 1.5 pro': { input: 0.50, output: 1.50 },
    'gemini 2.5 flash': { input: 0.30, output: 2.50 },
    'claude': { input: 3, output: 15 }, // Opus
    'gpt': { input: 5, output: 15 }, // GPT-4o
    'grok': { input: 3, output: 6 },
    'deepseek': { input: 0.14, output: 0.28 },
    'llama': { input: 0.2, output: 0.2 },
    'imagen': { cost: 0.039 } // Flat cost per image
};

interface TeamMembership {
    teamId: string;
    dateAdded: Date;
    usageLimit?: number;
}

async function getTeamUsagePriority(userId: string): Promise<TeamMembership[]> {
    const supabase = createServerClient();

    // Get all teams where user is a member
    const { data: teams, error } = await supabase
        .from('teams')
        .select('id, created_at')
        .contains('member_ids', [userId]);

    if (error) {
        console.error('Error fetching teams:', error);
        return [];
    }

    // Get user data for usage limit
    const { data: userData } = await supabase
        .from('users')
        .select('usage_limit, created_at')
        .eq('id', userId)
        .single();

    const memberships: TeamMembership[] = (teams || []).map(team => ({
        teamId: team.id,
        dateAdded: new Date(userData?.created_at || new Date()),
        usageLimit: userData?.usage_limit
    }));

    // Sort by dateAdded (FIFO - earliest first)
    memberships.sort((a, b) => a.dateAdded.getTime() - b.dateAdded.getTime());

    return memberships;
}

async function getTeamUsage(teamId: string): Promise<number> {
    const supabase = createServerClient();
    const { data, error } = await supabase
        .from('usage')
        .select('tokens')
        .eq('team_id', teamId);

    if (error) {
        console.error('Error fetching team usage:', error);
        return 0;
    }

    return (data || []).reduce((sum, row) => sum + (row.tokens || 0), 0);
}

async function logUsageToTeam(
    teamId: string,
    userId: string,
    model: string,
    type: 'Chat' | 'Image',
    words: number,
    cost: number
) {
    const supabase = createServerClient();

    const { error } = await supabase.from('usage').insert({
        team_id: teamId,
        user_id: userId,
        model,
        type,
        tokens: words,
        cost,
    });

    if (error) {
        console.error('Error logging usage:', error);
    }
}

async function logUsage(
    userId: string,
    model: string,
    type: 'Chat' | 'Image',
    words: number,
    cost: number,
    teamId?: string
) {
    if (!userId) return;

    try {
        if (teamId) {
            // Log to team usage collection
            await logUsageToTeam(teamId, userId, model, type, words, cost);
        } else {
            // Personal workspace - use FIFO logic
            const memberships = await getTeamUsagePriority(userId);

            if (memberships.length === 0) {
                // User has no team memberships - log without team
                await logUsageToTeam('personal', userId, model, type, words, cost);
                return;
            }

            let remainingWords = words;

            for (const membership of memberships) {
                if (remainingWords <= 0) break;

                const teamUsage = await getTeamUsage(membership.teamId);
                const TEAM_LIMIT = 200000;
                const teamRemaining = TEAM_LIMIT - teamUsage;

                // Check member's personal limit if set
                const effectiveLimit = membership.usageLimit
                    ? Math.min(membership.usageLimit, teamRemaining)
                    : teamRemaining;

                if (effectiveLimit <= 0) continue; // This team is exhausted, try next

                const wordsToDeduct = Math.min(remainingWords, effectiveLimit);

                await logUsageToTeam(
                    membership.teamId,
                    userId,
                    model,
                    type,
                    wordsToDeduct,
                    cost * (wordsToDeduct / words) // Proportional cost
                );

                remainingWords -= wordsToDeduct;
            }

            if (remainingWords > 0) {
                // Still some words left - log to personal
                await logUsageToTeam('personal', userId, model, type, remainingWords, cost * (remainingWords / words));
            }
        }
    } catch (error) {
        console.error("Error logging usage:", error);
        // Don't throw - usage logging shouldn't block the response
    }
}


const calculateCost = (modelName: string, inputTokens: number, outputTokens: number): number => {
    const modelNameLower = modelName.toLowerCase();
    let rates = MODEL_PRICING['default'];

    for (const key in MODEL_PRICING) {
        if (modelNameLower.includes(key)) {
            // @ts-ignore
            rates = MODEL_PRICING[key];
            break;
        }
    }

    if ('cost' in rates) {
        return (rates as { cost: number }).cost; // Fixed cost for image models
    }

    const inputCost = (inputTokens / 1_000_000) * rates.input;
    const outputCost = (outputTokens / 1_000_000) * rates.output;

    return inputCost + outputCost;
};

const countWords = (text: string): number => {
    if (!text) return 0;
    return text.trim().split(/\s+/).length;
};

type ActionResponseData = {
    isImage: boolean;
    response: string; // url for image, text for text
    title?: string;
    cost: number;
    words: number;
    modelName: string;
    chatId?: string; // Add chatId to the response
};


type ActionResponse = {
    data?: ActionResponseData;
    error?: string;
}

// List of models designated for image generation
const IMAGE_MODELS = [
    "ChatGPT DALL-E 3", "Flux", "Flux 1.1", "Flux 1.1 pro", "Flux 1.1 Ultra", "Flux loRA",
    "Ideogram 2.0", "Imagen 3", "Imagen 4", "Leanardo.ai", "Midjourney", "Midjourney Version 7",
    "Midjourney Version 6", "Midjourney Version 5.2", "Midjourney Version 5.1", "Midjourney Version 5",
    "Stable Diffusion 3", "Stable Diffusion 3.5", "Stable sketch", "Stable style", "Stable structure"
];

const messageSchema = z.object({
    message: z.string(),
    isNewChat: z.boolean(),
    selectedModel: z.string(),
    selectedPersona: z.string(),
    userId: z.string(),
    workspaceId: z.string().optional().nullable(),
    teamId: z.string().optional().nullable(), // ⭐ ADD THIS
    image: z.string().optional().nullable(),
    history: z.string().transform((str) => JSON.parse(str) as { role: 'user' | 'bot', content: string }[]),
    wordLimit: z.string().optional().nullable().transform(val => val ? parseInt(val, 10) : undefined),
});

export async function sendMessage(formData: FormData, signal?: AbortSignal): Promise<ActionResponse> {
    const parsed = messageSchema.safeParse({
        message: formData.get("message"),
        isNewChat: formData.get("isNewChat") === "true",
        selectedModel: formData.get("selectedModel"),
        selectedPersona: formData.get("selectedPersona"),
        userId: formData.get("userId"),
        workspaceId: formData.get("workspaceId"),
        teamId: formData.get("teamId"),
        image: formData.get("image"),
        history: formData.get("history"),
        wordLimit: formData.get("wordLimit"),
    });

    if (!parsed.success) {
        const formattedError = Object.entries(parsed.error.flatten().fieldErrors)
            .map(([field, errors]) => `${field}: ${errors.join(', ')}`)
            .join('; ');
        return { error: `Invalid input: ${formattedError}` };
    }

    const { message, isNewChat, selectedModel, selectedPersona, userId, workspaceId, teamId, image, history, wordLimit } = parsed.data;

    // Check usage limits (optional - won't block if no teams found)
    if (teamId) {
        const teamUsage = await getTeamUsage(teamId);
        const TEAM_LIMIT = 200000;
        if (teamUsage >= TEAM_LIMIT) {
            return { error: "Your team's usage limit has been reached. Please contact your team owner." };
        }
    }

    let title: string | undefined;
    let chatIdToUse: string | undefined;

    try {
        if (signal?.aborted) throw new Error("AbortError");

        const supabase = createServerClient();

        // Create new chat if needed
        if (isNewChat) {
            if (message) {
                title = message.slice(0, 50) + (message.length > 50 ? '...' : '');
            }

            const { data: newChat, error: chatError } = await supabase
                .from('chats')
                .insert({
                    title: title || "New Chat",
                    user_id: userId,
                    workspace_id: workspaceId || null,
                    last_message_snippet: (message || "Image uploaded").substring(0, 90),
                    ai_model: selectedModel
                })
                .select('id')
                .single();

            if (chatError) {
                console.error('Error creating chat:', chatError);
                return { error: `Failed to create chat: ${chatError.message}` };
            }

            chatIdToUse = newChat?.id;
        }

        const isImageModelSelected = IMAGE_MODELS.includes(selectedModel);

        if (isImageModelSelected) {
            if (!message.trim()) {
                return { error: "Image prompt cannot be empty." };
            }

            const imageResponse = await generateImage({ prompt: message });
            const cost = calculateCost('imagen', imageResponse.usage.inputTokens, imageResponse.usage.outputTokens);
            const words = countWords(message);

            // Log usage
            await logUsage(userId, selectedModel, 'Image', words, cost, teamId || undefined);

            // Save image to Supabase images table
            await supabase.from('images').insert({
                url: imageResponse.imageUrl,
                prompt: message,
                user_id: userId,
                workspace_id: workspaceId || null,
                is_pinned: false,
                model: selectedModel
            });

            return {
                data: {
                    response: imageResponse.imageUrl,
                    title,
                    isImage: true,
                    words: words,
                    cost,
                    modelName: selectedModel,
                    chatId: isNewChat ? chatIdToUse : undefined,
                }
            };
        } else {
            const modelNameLower = selectedModel.toLowerCase();
            const customContext = formData.get("customContext") as string | undefined;

            const responsePayload: any = {
                message,
                image: image ?? undefined,
                persona: selectedPersona,
                model: selectedModel,
                history,
                isClaude: modelNameLower.includes('claude'),
                isDeepSeek: modelNameLower.includes('deepseek'),
                isGemini: modelNameLower.includes('gemini'),
                isGpt: modelNameLower.includes('gpt'),
                isGrok: modelNameLower.includes('grok'),
                isLlama: modelNameLower.includes('llama'),
                wordLimit: wordLimit,
            };

            if (customContext) {
                responsePayload.customContext = customContext;
            }

            // Generate AI response using Gemini API via Genkit
            const textResponse = await generateResponse(responsePayload);

            const cost = calculateCost(selectedModel, textResponse.usage.inputTokens, textResponse.usage.outputTokens);
            const words = countWords(textResponse.response);

            // Log usage (non-blocking)
            await logUsage(userId, selectedModel, 'Chat', words, cost, teamId || undefined);

            // Save messages to Supabase if we have a chat ID
            if (chatIdToUse) {
                // Save user message
                await supabase.from('messages').insert({
                    chat_id: chatIdToUse,
                    role: 'user',
                    content: message,
                    model: selectedModel
                });

                // Save assistant response
                await supabase.from('messages').insert({
                    chat_id: chatIdToUse,
                    role: 'assistant',
                    content: textResponse.response,
                    model: selectedModel
                });
            }

            return {
                data: {
                    response: textResponse.response,
                    title,
                    isImage: false,
                    words,
                    cost,
                    modelName: selectedModel,
                    chatId: isNewChat ? chatIdToUse : undefined,
                }
            };
        }

    } catch (error) {
        if ((error as Error).name === 'AbortError') {
            return { error: 'Request was aborted.' };
        }
        const errorMessage = error instanceof Error ? error.message : 'Failed to get response from AI.';
        console.error("sendMessage action error:", error);
        return { error: errorMessage };
    }
}

const enhancePromptSchema = z.object({
    prompt: z.string(),
    wordCount: z.string(),
    userId: z.string(),
    workspaceId: z.string().optional(),
});

type EnhanceActionResponseData = {
    enhancedPrompt: string;
    cost: number;
    words: number;
};

type EnhanceActionResponse = {
    data?: EnhanceActionResponseData;
    error?: string;
};

export async function enhanceUserPrompt(formData: FormData): Promise<EnhanceActionResponse> {
    const parsed = enhancePromptSchema.safeParse({
        prompt: formData.get("prompt"),
        wordCount: formData.get("wordCount"),
        userId: formData.get("userId"),
        workspaceId: formData.get("workspaceId") || undefined,
    });

    if (!parsed.success) {
        return { error: "Invalid input for prompt enhancement." };
    }

    const { prompt, wordCount, userId, workspaceId } = parsed.data;

    try {
        const supabase = createServerClient();
        const response = await enhancePrompt({
            prompt: prompt,
            wordCount: Number(wordCount)
        });

        await supabase.from('prompts').insert({
            title: response.title,
            prompt: response.enhancedPrompt,
            user_id: userId,
            workspace_id: workspaceId || null,
        });

        const cost = calculateCost('gemini 2.5 flash', response.usage.inputTokens, response.usage.outputTokens);
        const inputWords = countWords(prompt);
        const outputWords = countWords(response.enhancedPrompt);
        const words = inputWords + outputWords;

        return {
            data: {
                enhancedPrompt: response.enhancedPrompt,
                cost,
                words
            }
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to enhance and save prompt.';
        console.error("enhanceUserPrompt action error:", error);
        return { error: errorMessage };
    }
}

const createWorkspaceSchema = z.object({
    name: z.string().min(1, "Workspace name is required."),
    creatorId: z.string(),
    teamId: z.string(),
    customContext: z.string().max(5000, "Custom context cannot exceed 5000 characters.").optional(),
});

type CreateWorkspaceResponse = {
    data?: { id: string };
    error?: string;
}

export async function createWorkspace(formData: FormData): Promise<CreateWorkspaceResponse> {
    const parsed = createWorkspaceSchema.safeParse({
        name: formData.get('name'),
        creatorId: formData.get('creatorId'),
        teamId: formData.get('teamId'),
        customContext: formData.get('customContext') || undefined,
    });

    if (!parsed.success) {
        return { error: "Invalid workspace data." };
    }

    const { name, creatorId, teamId, customContext } = parsed.data;

    try {
        const supabase = createServerClient();

        // Get team to find owner
        const { data: team } = await supabase
            .from('teams')
            .select('owner_id')
            .eq('id', teamId)
            .single();

        if (!team) {
            return { error: "Team not found." };
        }

        const ownerIds = Array.from(new Set([creatorId, team.owner_id].filter(Boolean)));

        // Create workspace
        const { data: newWorkspace, error: workspaceError } = await supabase
            .from('workspaces')
            .insert({
                name,
                avatar_url: '',
                owner_ids: ownerIds,
                team_id: teamId,
                member_ids: [creatorId],
                custom_context: customContext || '',
                can_view_access_rules: true,
            })
            .select('id')
            .single();

        if (workspaceError || !newWorkspace) {
            return { error: `Failed to create workspace: ${workspaceError?.message}` };
        }

        // Add default permissions
        await supabase.from('workspace_permissions').insert({
            workspace_id: newWorkspace.id,
            prompts: { view: true, add: true, edit: true, delete: true },
            images: { view: true, add: true, edit: true, delete: true },
            chats: { view: true, add: true, edit: true, delete: true },
            personas: { view: true, add: true, edit: true, delete: true },
        });

        return { data: { id: newWorkspace.id } };

    } catch (error) {
        console.error("Error creating workspace:", error);
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
        return { error: errorMessage };
    }
}

const updateUserPreferencesSchema = z.object({
    userId: z.string(),
    lastSelectedModel: z.string().optional(),
    lastSelectedPersona: z.string().optional(),
    wordLimit: z.string().optional().transform(val => val ? parseInt(val, 10) : undefined),
    enhancePromptWordCount: z.string().optional().transform(val => val ? parseInt(val, 10) : undefined),
});

type UpdateUserPreferencesResponse = {
    success?: boolean;
    error?: string;
}

export async function updateUserPreferences(formData: FormData): Promise<UpdateUserPreferencesResponse> {
    const parsed = updateUserPreferencesSchema.safeParse({
        userId: formData.get('userId'),
        lastSelectedModel: formData.get('lastSelectedModel'),
        lastSelectedPersona: formData.get('lastSelectedPersona'),
        wordLimit: formData.get('wordLimit'),
        enhancePromptWordCount: formData.get('enhancePromptWordCount'),
    });

    if (!parsed.success) {
        return { error: "Invalid user preference data." };
    }

    const { userId, lastSelectedModel, lastSelectedPersona, wordLimit, enhancePromptWordCount } = parsed.data;

    try {
        const supabase = createServerClient();
        const preferences: { [key: string]: any } = {};

        if (lastSelectedModel) {
            preferences.last_selected_model = lastSelectedModel;
        }
        if (lastSelectedPersona) {
            preferences.last_selected_persona = lastSelectedPersona;
        }
        if (wordLimit !== undefined) {
            preferences.word_limit = wordLimit;
        }
        if (enhancePromptWordCount !== undefined) {
            preferences.enhance_prompt_word_count = enhancePromptWordCount;
        }

        if (Object.keys(preferences).length > 0) {
            await supabase.from('users').update(preferences).eq('id', userId);
        }

        return { success: true };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
        console.error("Error updating user preferences:", error);
        return { error: errorMessage };
    }
}


const updateWorkspaceSchema = z.object({
    workspaceId: z.string(),
    name: z.string().min(1, "Workspace name is required."),
    customContext: z.string().max(5000, "Custom context cannot exceed 5000 characters.").optional(),
    permissions: z.string(), // JSON string
    avatarUrl: z.string().optional(),
    knowledgeFileUrl: z.string().optional(),
    knowledgeFileName: z.string().optional(),
    canViewAccessRules: z.string().transform(v => v === 'true').optional(),
    canViewExceptions: z.string().transform(v => v === 'true').optional(),
});

type UpdateWorkspaceResponse = {
    success?: boolean;
    error?: string;
};

export async function updateWorkspace(formData: FormData): Promise<UpdateWorkspaceResponse> {
    try {
        const parsed = updateWorkspaceSchema.safeParse({
            workspaceId: formData.get('workspaceId'),
            name: formData.get('name'),
            customContext: formData.get('customContext') || undefined,
            permissions: formData.get('permissions'),
            avatarUrl: formData.get('avatarUrl') || undefined,
            knowledgeFileUrl: formData.get('knowledgeFileUrl') || undefined,
            knowledgeFileName: formData.get('knowledgeFileName') || undefined,
            canViewAccessRules: formData.get('canViewAccessRules'),
            canViewExceptions: formData.get('canViewExceptions'),
        });

        if (!parsed.success) {
            return { error: `Invalid workspace data: ${parsed.error.message}` };
        }

        const { workspaceId, name, customContext, permissions, knowledgeFileUrl, knowledgeFileName, canViewAccessRules, canViewExceptions } = parsed.data;
        let { avatarUrl } = parsed.data;
        const supabase = createServerClient();

        const updateData: { [key: string]: any } = {
            name,
            custom_context: customContext || '',
        };

        if (canViewAccessRules !== undefined) {
            updateData.can_view_access_rules = canViewAccessRules;
        }

        if (canViewExceptions !== undefined) {
            updateData.can_view_exceptions = canViewExceptions;
        }

        // For avatar upload, skip for now (TODO: use Supabase Storage)
        if (avatarUrl && avatarUrl !== 'UPLOAD' && avatarUrl !== '') {
            updateData.avatar_url = avatarUrl;
        } else if (avatarUrl === '') {
            updateData.avatar_url = null;
        }

        if (knowledgeFileUrl && knowledgeFileName) {
            updateData.knowledge_file_url = knowledgeFileUrl;
            updateData.knowledge_file_name = knowledgeFileName;
        } else if (formData.get('knowledgeFileUrl') === '') {
            updateData.knowledge_file_url = null;
            updateData.knowledge_file_name = null;
        }

        // Update workspace
        const { error: updateError } = await supabase
            .from('workspaces')
            .update(updateData)
            .eq('id', workspaceId);

        if (updateError) {
            return { error: `Failed to update workspace: ${updateError.message}` };
        }

        // Update permissions separately
        await supabase
            .from('workspace_permissions')
            .upsert({
                workspace_id: workspaceId,
                ...JSON.parse(permissions)
            });

        return { success: true };
    } catch (error: any) {
        return { error: `Server action failed: ${error.message}.` };
    }
}

const updateWorkspaceAccessSchema = z.object({
    workspaceId: z.string(),
    memberId: z.string(),
    canView: z.boolean(),
    canEdit: z.boolean(),
});

type UpdateWorkspaceAccessResponse = {
    success?: boolean;
    error?: string;
}

export async function updateWorkspaceAccess(formData: FormData): Promise<UpdateWorkspaceAccessResponse> {
    const parsed = updateWorkspaceAccessSchema.safeParse({
        workspaceId: formData.get('workspaceId'),
        memberId: formData.get('memberId'),
        canView: formData.get('canView') === 'true',
        canEdit: formData.get('canEdit') === 'true',
    });

    if (!parsed.success) {
        return { error: "Invalid data for updating workspace access." };
    }

    const { workspaceId, memberId, canView, canEdit } = parsed.data;

    try {
        const supabase = createServerClient();

        await supabase.from('workspace_exceptions').upsert({
            workspace_id: workspaceId,
            user_id: memberId,
            can_view_manage_workspace: canView,
            can_edit_manage_workspace: canEdit,
        });

        return { success: true };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
        console.error("Error updating workspace access:", error);
        return { error: errorMessage };
    }
}

const updateTeamMemberAccessSchema = z.object({
    userId: z.string(),
    teamId: z.string(),
    usageLimit: z.string().optional().transform(val => val ? parseInt(val, 10) : undefined),
    allowWorkspaceCreation: z.string().transform(v => v === 'true'),
    workspaceIds: z.string().transform(str => JSON.parse(str) as string[]),
});

type UpdateTeamMemberAccessResponse = {
    success?: boolean;
    error?: string;
}

export async function updateTeamMemberAccess(formData: FormData): Promise<UpdateTeamMemberAccessResponse> {
    const parsed = updateTeamMemberAccessSchema.safeParse({
        userId: formData.get('userId'),
        teamId: formData.get('teamId'),
        usageLimit: formData.get('usageLimit'),
        allowWorkspaceCreation: formData.get('allowWorkspaceCreation'),
        workspaceIds: formData.get('workspaceIds'),
    });

    if (!parsed.success) {
        return { error: "Invalid member access data." };
    }

    const { userId, teamId, usageLimit, allowWorkspaceCreation, workspaceIds } = parsed.data;

    try {
        const supabase = createServerClient();

        // Step 1: Update user profile
        const userUpdateData: { [key: string]: any } = {
            allow_workspace_creation: allowWorkspaceCreation,
        };

        if (usageLimit !== undefined) {
            userUpdateData.usage_limit = usageLimit;
        }

        await supabase.from('users').update(userUpdateData).eq('id', userId);

        // Step 2: Get all workspaces in this team
        const { data: workspaces } = await supabase
            .from('workspaces')
            .select('id, member_ids')
            .eq('team_id', teamId);

        // Step 3: Update each workspace's member_ids
        for (const workspace of workspaces || []) {
            const currentMemberIds = workspace.member_ids || [];
            const shouldBeInWorkspace = workspaceIds.includes(workspace.id);
            const isCurrentlyInWorkspace = currentMemberIds.includes(userId);

            if (shouldBeInWorkspace && !isCurrentlyInWorkspace) {
                // Add user to workspace
                await supabase
                    .from('workspaces')
                    .update({ member_ids: [...currentMemberIds, userId] })
                    .eq('id', workspace.id);
            } else if (!shouldBeInWorkspace && isCurrentlyInWorkspace) {
                // Remove user from workspace
                await supabase
                    .from('workspaces')
                    .update({ member_ids: currentMemberIds.filter((id: string) => id !== userId) })
                    .eq('id', workspace.id);
            }
        }

        return { success: true };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
        console.error("Error updating team member access:", error);
        return { error: errorMessage };
    }
}
