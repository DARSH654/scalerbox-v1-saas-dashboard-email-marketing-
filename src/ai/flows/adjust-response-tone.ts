'use server';

/**
 * @fileOverview AI flow to adjust the tone of the AI's response.
 *
 * - adjustResponseTone - Adjusts the tone of the AI's response based on user preference.
 * - AdjustResponseToneInput - The input type for the adjustResponseTone function.
 * - AdjustResponseToneOutput - The return type for the adjustResponseTone function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdjustResponseToneInputSchema = z.object({
  message: z.string().describe('The user message to respond to.'),
  tone: z
    .string()
    .describe(
      'The desired tone of the response (e.g., formal, informal, professional).'
    ),
});
export type AdjustResponseToneInput = z.infer<typeof AdjustResponseToneInputSchema>;

const AdjustResponseToneOutputSchema = z.object({
  response: z.string().describe('The AI-generated response with the adjusted tone.'),
});
export type AdjustResponseToneOutput = z.infer<typeof AdjustResponseToneOutputSchema>;

export async function adjustResponseTone(
  input: AdjustResponseToneInput
): Promise<AdjustResponseToneOutput> {
  return adjustResponseToneFlow(input);
}

const adjustResponseTonePrompt = ai.definePrompt({
  name: 'adjustResponseTonePrompt',
  input: {schema: AdjustResponseToneInputSchema},
  output: {schema: AdjustResponseToneOutputSchema},
  prompt: `You are an AI assistant that adjusts its response tone based on user preference.

  User message: {{{message}}}
  Desired tone: {{{tone}}}

  Please generate a response that reflects the desired tone.`,
});

const adjustResponseToneFlow = ai.defineFlow(
  {
    name: 'adjustResponseToneFlow',
    inputSchema: AdjustResponseToneInputSchema,
    outputSchema: AdjustResponseToneOutputSchema,
  },
  async input => {
    const {output} = await adjustResponseTonePrompt(input);
    return output!;
  }
);
