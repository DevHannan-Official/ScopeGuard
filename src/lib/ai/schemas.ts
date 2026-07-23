import { z } from "zod/v3";

export const AnalyzeScopeResponseSchema = z.object({
  verdict: z.enum(["INSIDE_SCOPE", "OUTSIDE_SCOPE", "NEEDS_DISCUSSION"]),

  reason: z.string(),

  riskLevel: z.enum(["LOW", "MEDIUM", "HIGH"]),

  confidence: z.number(),

  estimatedPrice: z.object({
    min: z.number(),
    max: z.number(),
    currency: z.string(),
  }),

  timelineExtension: z.string(),

  email: z.string(),

  items: z.array(
    z.object({
      title: z.string(),
      reason: z.string(),
      priceMin: z.number(),
      priceMax: z.number(),
    }),
  ),
});

export type AnalyzeScopeResponse = z.infer<typeof AnalyzeScopeResponseSchema>;
