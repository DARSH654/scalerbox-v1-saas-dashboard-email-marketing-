'use server';

/**
 * @fileOverview Summarizes user-provided data while ensuring compliance.
 *
 * - summarizeData - A function that summarizes and analyzes user data for compliance.
 * - SummarizeDataInput - The input type for the summarizeData function.
 * - SummarizeDataOutput - The return type for the summarizeData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeDataInputSchema = z.object({
  data: z.string().describe('The data to summarize and analyze for compliance.'),
});
export type SummarizeDataInput = z.infer<typeof SummarizeDataInputSchema>;

const SummarizeDataOutputSchema = z.object({
  summary: z.string().describe('A summary of the data.'),
  complianceAnalysis: z
    .string()
    .describe('An analysis of the data to ensure compliance.'),
});
export type SummarizeDataOutput = z.infer<typeof SummarizeDataOutputSchema>;

export async function summarizeData(input: SummarizeDataInput): Promise<SummarizeDataOutput> {
  return summarizeDataFlow(input);
}

const summarizeDataPrompt = ai.definePrompt({
  name: 'summarizeDataPrompt',
  input: {schema: SummarizeDataInputSchema},
  output: {schema: SummarizeDataOutputSchema},
  prompt: `You are an AI assistant that summarizes user-provided data and analyzes it for compliance.

  Summarize the following data:
  {{data}}

  Provide a detailed analysis of the data to ensure it complies with all relevant regulations and guidelines.
  Indicate any potential compliance issues.
  `, // add any extra details on the prompt here
});

const summarizeDataFlow = ai.defineFlow(
  {
    name: 'summarizeDataFlow',
    inputSchema: SummarizeDataInputSchema,
    outputSchema: SummarizeDataOutputSchema,
  },
  async input => {
    const {output} = await summarizeDataPrompt(input);
    return output!;
  }
);
