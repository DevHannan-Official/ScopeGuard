"use server";

import { analyzeScope } from "@/lib/ai/analyze";

export async function analyzeScopeAction(
  originalScope: string,
  clientRequest: string,
) {
  return await analyzeScope(originalScope, clientRequest);
}
