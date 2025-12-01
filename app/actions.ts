'use server';

import { aiSafetyChatbot, type AiSafetyChatbotInput } from '@/ai/flows/ai-safety-chatbot';
import { z } from 'zod';
import {ai} from "@/ai/genkit";

const chatbotInputSchema = z.object({
  query: z.string().min(2, "Query must be at least 2 characters long."),
});

export async function runAiSafetyChatbot(input: { query: string }) {
  const validation = chatbotInputSchema.safeParse(input);
  if (!validation.success) {
    return { error: validation.error.flatten().fieldErrors };
  }
  
  try {
    const result = await aiSafetyChatbot(input);
    return { answer: result.answer };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while communicating with the AI. Please try again." };
  }
}
