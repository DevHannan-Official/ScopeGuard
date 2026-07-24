import { gemini } from "./gemini";
import { buildAnalyzeScopePrompt } from "./prompts";
import { AnalyzeScopeResponseSchema } from "./schemas";

export async function analyzeScope(
  userName: string,
  clientName: string,
  currency: string,
  originalScope: string,
  clientRequest: string,
) {
  const prompt = buildAnalyzeScopePrompt(
    userName,
    clientName,
    currency,
    originalScope,
    clientRequest,
  );

  const response = await gemini.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  const text = response.text ?? "";

  const json = JSON.parse(text);

  return AnalyzeScopeResponseSchema.parse(json);
}
