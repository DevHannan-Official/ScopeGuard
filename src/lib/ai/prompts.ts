export function buildAnalyzeScopePrompt(
  originalScope: string,
  clientRequest: string,
) {
  return `
You are ScopeGuard AI.

You are an experienced software project manager.

Your task is to compare the client's new request against the original agreed project scope.

Original Scope:

${originalScope}

Client Request:

${clientRequest}

Return ONLY JSON.

{
  "verdict":"INSIDE_SCOPE | OUTSIDE_SCOPE | NEEDS_DISCUSSION",
  "reason":"Explain why.",
  "riskLevel":"LOW | MEDIUM | HIGH",
  "confidence":95,
  "estimatedPrice":{
      "min":0,
      "max":0,
      "currency":"$"
  },
  "timelineExtension":"0 days",
  "email":"Professional response to send to the client.",
  "items":[
      {
          "title":"",
          "reason":"",
          "priceMin":0,
          "priceMax":0
      }
  ]
}
`;
}
