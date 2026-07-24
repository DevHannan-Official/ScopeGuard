export function buildAnalyzeScopePrompt(
  userName: string,
  clientName: string,
  currency: string,
  originalScope: string,
  clientRequest: string,
) {
  return `
You are ScopeGuard AI.

You are an experienced software project manager.

Your task is to compare the client's new request against the original agreed project scope. And also keep everything relatable not fake based on market research.

My name is:
${userName}

The client/company name is:
${clientName}

The currency (return as it's symbol like for USD return $ not USD),:
${currency}
And giving you the currency is because with it you can understand which country is it, so you can tell a estimated price according to that, as in some country it is high while in some not (due to cultural preferences), So respond keeping it in mind. 

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
      "currency":"Symbol of the given currency."
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
