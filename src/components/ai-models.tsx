'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown, Cpu, Sparkles, Zap, MessageSquare, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import Image from 'next/image';

// Model Icons
export const GptIcon = ({ className }: { className?: string }) => (
    <div className={cn("relative w-5 h-5 flex items-center justify-center", className)}>
        <Image
            src="https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/ChatGPT_Image_Jan_12__2026__04_01_42_PM-removebg-preview.png"
            alt="GPT-4o"
            fill
            className="object-contain"
            sizes="20px"
        />
    </div>
);

export const ClaudeIcon = ({ className }: { className?: string }) => (
    <div className={cn("relative w-5 h-5 flex items-center justify-center", className)}>
        <Image
            src="https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/claude-color_200x200.png"
            alt="Claude"
            fill
            className="object-contain"
            sizes="20px"
        />
    </div>
);

export const GeminiIcon = ({ className }: { className?: string }) => (
    <div className={cn("relative w-5 h-5 flex items-center justify-center", className)}>
        <Image
            src="https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/vecteezy_gemini-google-icon-symbol-logo_55687065_200x200.png"
            alt="Gemini"
            fill
            className="object-contain"
            sizes="20px"
        />
    </div>
);

export const DeepseekIcon = ({ className }: { className?: string }) => (
    <div className={cn("relative w-5 h-5 flex items-center justify-center", className)}>
        <Image
            src="https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/deepseek-color_200x200.png"
            alt="DeepSeek"
            fill
            className="object-contain"
            sizes="20px"
        />
    </div>
);

export const GrokIcon = ({ className }: { className?: string }) => (
    <div className={cn("relative w-5 h-5 flex items-center justify-center", className)}>
        <Image
            src="https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/QIc_CCEg_400x400.jpg"
            alt="Grok"
            fill
            className="object-contain"
            sizes="20px"
        />
    </div>
);

export const MetaIcon = ({ className }: { className?: string }) => (
    <div className={cn("relative w-5 h-5 flex items-center justify-center", className)}>
        <Image
            src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta-Logo.png"
            alt="Meta"
            fill
            className="object-contain"
            sizes="20px"
        />
    </div>
);

export const PerplexityIcon = ({ className }: { className?: string }) => (
    <div className={cn("relative w-5 h-5 flex items-center justify-center", className)}>
        <Image
            src="https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/perplexity-e6a4e1t06hd6dhczot580o.webp"
            alt="Perplexity"
            fill
            className="object-contain"
            sizes="20px"
        />
    </div>
);

export const MistralIcon = ({ className }: { className?: string }) => (
    <div className={cn("relative w-5 h-5 flex items-center justify-center", className)}>
        <Image
            src="https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/Meta-Logo-removebg-preview.png"
            alt="Mistral"
            fill
            className="object-contain"
            sizes="20px"
        />
    </div>
);

export const MinimaxIcon = ({ className }: { className?: string }) => (
    <div className={cn("relative w-5 h-5 flex items-center justify-center", className)}>
        <Image
            src="https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/174881.png"
            alt="Minimax"
            fill
            className="object-contain"
            sizes="20px"
        />
    </div>
);

// Model Definitions
export interface AIModel {
    id: string;
    name: string;
    provider: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    type: 'text' | 'image' | 'code' | 'video';
    contextWindow: string;
    maxOutput: string;
    strengths?: string[];
}

export const textModels: AIModel[] = [
    {
        id: "gpt-4o",
        name: "GPT-4o",
        provider: "OpenAI",
        description: "Most capable model, best for complex tasks",
        icon: GptIcon,
        type: 'text',
        contextWindow: "128k",
        maxOutput: "4k",
        strengths: ["Reasoning", "Coding", "Creative Writing"]
    },
    {
        id: "claude-3-5-sonnet",
        name: "Claude 3.5 Sonnet",
        provider: "Anthropic",
        description: "Intelligent and fast, great for writing",
        icon: ClaudeIcon,
        type: 'text',
        contextWindow: "200k",
        maxOutput: "4k",
        strengths: ["Writing", "Analysis", " nuanced understanding"]
    },
    {
        id: "gemini-1-5-pro",
        name: "Gemini 1.5 Pro",
        provider: "Google",
        description: "Google's most capable AI model",
        icon: GeminiIcon,
        type: 'text',
        contextWindow: "1M+",
        maxOutput: "8k",
        strengths: ["Long Context", "Multimodal", "Reasoning"]
    },
    {
        id: "deepseek-v3",
        name: "DeepSeek V3",
        provider: "DeepSeek",
        description: "Strong performance on coding & math",
        icon: DeepseekIcon,
        type: 'text',
        contextWindow: "32k",
        maxOutput: "4k",
        strengths: ["Coding", "Math", "Logic"]
    },
    {
        id: "grok-2",
        name: "Grok 2",
        provider: "xAI",
        description: "Witty and rebellious AI assistant",
        icon: GrokIcon,
        type: 'text',
        contextWindow: "128k",
        maxOutput: "4k",
        strengths: ["Real-time knowledge", "Humor", "Unfiltered"]
    },
    {
        id: "llama-3-1-405b",
        name: "Llama 3.1 405B",
        provider: "Meta",
        description: "Open source state-of-the-art model",
        icon: MetaIcon,
        type: 'text',
        contextWindow: "128k",
        maxOutput: "4k",
        strengths: ["General purpose", "Open weights", "Reasoning"]
    },
    {
        id: "perplexity-online",
        name: "Perplexity Online",
        provider: "Perplexity",
        description: "Real-time search & answer engine",
        icon: PerplexityIcon,
        type: 'text',
        contextWindow: "32k",
        maxOutput: "4k",
        strengths: ["Search", "Citations", "Current events"]
    },
    {
        id: "mistral-large-2",
        name: "Mistral Large 2",
        provider: "Mistral AI",
        description: "Top-tier open model from Europe",
        icon: MistralIcon,
        type: 'text',
        contextWindow: "32k",
        maxOutput: "4k",
        strengths: ["Multilingual", "Coding", "Reasoning"]
    },
    {
        id: "minimax-01",
        name: "MiniMax 01",
        provider: "MiniMax",
        description: "Efficient and capable asian model",
        icon: MinimaxIcon,
        type: 'text',
        contextWindow: "32k",
        maxOutput: "4k",
        strengths: ["Chinese language", "Roleplay", "Conversation"]
    }
];

export const imageModels: AIModel[] = [
    {
        id: "dall-e-3",
        name: "DALL-E 3",
        provider: "OpenAI",
        description: "Create realistic images and art",
        icon: GptIcon,
        type: 'image',
        contextWindow: "N/A",
        maxOutput: "1024x1024",
        strengths: ["Prompt adherence", "Text rendering", "Creativity"]
    },
    // Add other image models like Midjourney (via API if avail), Stable Diffusion etc.
];

export const modelIcons = {
    gpt: GptIcon,
    claude: ClaudeIcon,
    gemini: GeminiIcon,
    deepseek: DeepseekIcon,
    grok: GrokIcon,
    meta: {
        ...MetaIcon,
        className: "bg-blue-600 rounded-full p-0.5"
    },
    perplexity: PerplexityIcon,
    bot: Bot
};

interface ModelSelectorProps {
    value: string;
    onValueChange: (value: string) => void;
    models?: AIModel[];
    className?: string;
    open?: boolean; // Prop to force open state
    defaultOpen?: boolean;
}

export function ModelSelector({
    value,
    onValueChange,
    models = textModels,
    className,
    open: controlledOpen,
    defaultOpen = false
}: ModelSelectorProps) {
    const [open, setOpen] = React.useState(defaultOpen);
    const selectedModel = models.find((model) => model.name === value) || models[0];

    // Handle controlled vs uncontrolled open state
    const isOpen = controlledOpen !== undefined ? controlledOpen : open;
    const handleOpenChange = (newOpen: boolean) => {
        if (controlledOpen === undefined) {
            setOpen(newOpen);
        }
    };

    return (
        <Popover open={isOpen} onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={isOpen}
                    className={cn("w-[200px] justify-between", className)}
                >
                    <div className="flex items-center gap-2 truncate">
                        {selectedModel?.icon && <selectedModel.icon className="h-4 w-4 shrink-0" />}
                        <span className="truncate">{selectedModel?.name}</span>
                    </div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0" align="start">
                <Command>
                    <CommandInput placeholder="Search models..." />
                    <CommandList>
                        <CommandEmpty>No model found.</CommandEmpty>
                        <CommandGroup heading="Available Models">
                            {models.map((model) => (
                                <CommandItem
                                    key={model.id}
                                    value={model.name}
                                    onSelect={(currentValue) => {
                                        onValueChange(currentValue);
                                        handleOpenChange(false);
                                    }}
                                    className="flex items-center justify-between py-3"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-md border bg-muted/50">
                                            <model.icon className="h-5 w-5" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-medium">{model.name}</span>
                                            <span className="text-xs text-muted-foreground">{model.description}</span>
                                        </div>
                                    </div>
                                    {value === model.name && (
                                        <Check className="h-4 w-4 opacity-50" />
                                    )}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
