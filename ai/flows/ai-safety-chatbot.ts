'use server';

/**
 * @fileOverview An AI chatbot for travel safety queries in Tamil Nadu.
 *
 * - aiSafetyChatbot - A function that answers travel safety questions.
 * - AiSafetyChatbotInput - The input type for the aiSafetyChatbot function.
 * - AiSafetyChatbotOutput - The return type for the aiSafetyChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiSafetyChatbotInputSchema = z.object({
  query: z.string().describe('The travel safety question from the user.'),
});
export type AiSafetyChatbotInput = z.infer<typeof AiSafetyChatbotInputSchema>;

const AiSafetyChatbotOutputSchema = z.object({
  answer: z.string().describe('The AI chatbot answer to the user query.'),
});
export type AiSafetyChatbotOutput = z.infer<typeof AiSafetyChatbotOutputSchema>;

export async function aiSafetyChatbot(input: AiSafetyChatbotInput): Promise<AiSafetyChatbotOutput> {
  return aiSafetyChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiSafetyChatbotPrompt',
  input: {schema: AiSafetyChatbotInputSchema},
  output: {schema: AiSafetyChatbotOutputSchema},
  prompt: `You are a helpful AI chatbot specializing in travel safety for tourists in Tamil Nadu. Answer the following question:

Question: {{{query}}}

Answer:`,
});

const aiSafetyChatbotFlow = ai.defineFlow(
  {
    name: 'aiSafetyChatbotFlow',
    inputSchema: AiSafetyChatbotInputSchema,
    outputSchema: AiSafetyChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
