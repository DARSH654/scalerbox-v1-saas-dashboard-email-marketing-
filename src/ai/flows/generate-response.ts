
'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating AI-powered responses to user messages.
 *
 * The flow takes a user message as input and returns an AI-generated response.
 *
 * @exports generateResponse - The main function to generate an AI response.
 * @exports GenerateResponseInput - The input type for the generateResponse function.
 * @exports GenerateResponseOutput - The output type for the generateResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HistoryMessageSchema = z.object({
  role: z.enum(['user', 'bot']),
  content: z.string(),
});

const GenerateResponseInputSchema = z.object({
  message: z.string().describe('The user message to respond to.'),
  image: z.string().optional().describe("An optional image, as a data URI, that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
  persona: z.string().describe('The persona the AI should adopt.'),
  model: z.string().describe('The name of the AI model being used.'),
  history: z.array(HistoryMessageSchema).optional().describe('The last 10 messages in the chat history.'),
  customContext: z.string().optional().describe('Custom instructions or context for the AI from the workspace.'),
  wordLimit: z.number().optional().describe('The desired approximate word count for the response.'),
  aiModelCapabilities: z.string().optional().describe('A description of the AI model\'s capabilities.'),
});
export type GenerateResponseInput = z.infer<typeof GenerateResponseInputSchema>;

const GenerateResponseOutputSchema = z.object({
  response: z.string().describe('The AI-generated response to the user message.'),
  usage: z.object({
    inputTokens: z.number(),
    outputTokens: z.number(),
    totalTokens: z.number(),
  }),
});
export type GenerateResponseOutput = z.infer<typeof GenerateResponseOutputSchema>;

export async function generateResponse(input: GenerateResponseInput): Promise<GenerateResponseOutput> {
  return generateResponseFlow(input);
}

const generateResponsePrompt = ai.definePrompt({
  name: 'generateResponsePrompt',
  input: {schema: GenerateResponseInputSchema},
  // We only ask the AI for the response string, not the usage data
  output: {schema: z.object({response: z.string()})},
  prompt: `You are the "{{model}}" model, a helpful AI assistant. Your persona is "{{persona}}". When a user asks who you are, you must respond that you are "{{model}}". When you provide code, always wrap it in Markdown code blocks with the language name (e.g., \`\`\`python ... \`\`\`).

{{#if aiModelCapabilities}}
AI Model Capabilities: {{{aiModelCapabilities}}}
{{/if}}

If the user asks you to do something you are not capable of, you MUST politely decline.

Always use Markdown to format your response for clarity and readability. For example, use bold for headings, bullet points for lists, and code blocks for code snippets.

Act as if you are {{{persona}}}.

{{#if customContext}}
IMPORTANT: You must always follow these custom instructions: {{{customContext}}}
{{/if}}

{{#if wordLimit}}
Please keep your response to around {{{wordLimit}}} words.
{{/if}}

{{#if history}}
This is the recent chat history:
{{#each history}}
- {{role}}: {{content}}
{{/each}}
{{/if}}

{{#if image}}Analyze the following image and respond to the user's message. Image: {{media url=image}}{{/if}}

Respond to the following user message:

{{{message}}}`,
});

const generateResponseFlow = ai.defineFlow(
  {
    name: 'generateResponseFlow',
    inputSchema: GenerateResponseInputSchema,
    outputSchema: GenerateResponseOutputSchema,
  },
  async input => {
    const llmResponse = await generateResponsePrompt(input);
    const output = llmResponse.output;

    if (!output) {
      throw new Error("Failed to get response from AI.");
    }
    
    return {
        response: output.response,
        usage: {
            inputTokens: llmResponse.usage?.inputTokens || 0,
            outputTokens: llmResponse.usage?.outputTokens || 0,
            totalTokens: llmResponse.usage?.totalTokens || 0,
        }
    };
  }
);
