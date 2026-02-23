
'use server';

/**
 * @fileOverview An AI flow to enhance a user's prompt and generate a title for it.
 *
 * - enhancePrompt - A function that takes a user's prompt and returns an enhanced version and a title.
 * - EnhancePromptInput - The input type for the enhancePrompt function.
 * - EnhancePromptOutput - The return type for the enhancePrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhancePromptInputSchema = z.object({
  prompt: z.string().describe('The user prompt to be enhanced.'),
  wordCount: z.number().describe('The approximate word count for the enhanced prompt.'),
});
export type EnhancePromptInput = z.infer<typeof EnhancePromptInputSchema>;

const EnhancePromptOutputSchema = z.object({
  title: z.string().describe('A concise 3-4 word title for the enhanced prompt.'),
  enhancedPrompt: z.string().describe('The enhanced, more detailed prompt.'),
  usage: z.object({
    inputTokens: z.number(),
    outputTokens: z.number(),
    totalTokens: z.number(),
  }),
});
export type EnhancePromptOutput = z.infer<typeof EnhancePromptOutputSchema>;

export async function enhancePrompt(
  input: EnhancePromptInput
): Promise<EnhancePromptOutput> {
  return enhancePromptFlow(input);
}

const enhancePromptGenkitPrompt = ai.definePrompt({
  name: 'enhancePromptPrompt',
  input: {schema: EnhancePromptInputSchema},
  output: {schema: z.object({ 
    title: z.string().describe('A concise 3-4 word title for the enhanced prompt.'),
    enhancedPrompt: z.string() 
  })},
  prompt: `You are an expert prompt engineer. Your task is to perform two actions:
1.  Generate a concise and descriptive title for the following user prompt, between 3 and 4 words.
2.  Enhance the user prompt to be more detailed, clear, and effective for a large language model. The enhanced prompt should be approximately {{{wordCount}}} words long.

User prompt: {{{prompt}}}

Respond with both the generated title and the enhanced prompt.`,
});

const enhancePromptFlow = ai.defineFlow(
  {
    name: 'enhancePromptFlow',
    inputSchema: EnhancePromptInputSchema,
    outputSchema: EnhancePromptOutputSchema,
  },
  async input => {
    const llmResponse = await enhancePromptGenkitPrompt(input);
    const output = llmResponse.output;

    if (!output) {
      throw new Error("Failed to get enhanced prompt from AI.");
    }

    return {
        title: output.title,
        enhancedPrompt: output.enhancedPrompt,
        usage: {
            inputTokens: llmResponse.usage?.inputTokens || 0,
            outputTokens: llmResponse.usage?.outputTokens || 0,
            totalTokens: llmResponse.usage?.totalTokens || 0,
        }
    };
  }
);
