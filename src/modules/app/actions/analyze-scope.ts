"use server";

import { analyzeScope } from "@/lib/ai/analyze";

export async function analyzeScopeAction(
  userName: string,
  clientName: string,
  currency: string,
  originalScope: string,
  clientRequest: string,
) {
  return await analyzeScope(
    userName,
    clientName,
    currency,
    originalScope,
    clientRequest,
  );
}
