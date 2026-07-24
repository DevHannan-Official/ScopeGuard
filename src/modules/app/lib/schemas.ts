import { z } from "zod/v3";

export const promptSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name."),
  client: z.string().trim().min(1, "Please enter the client name."),
  currency: z.string().trim().min(1, "Please select the currency."),
  originalScope: z
    .string()
    .trim()
    .min(1, "Please enter the original scope.")
    .max(3000, "Text can't exceed 3000 chars limit."),
  clientRequest: z
    .string()
    .trim()
    .min(1, "Please enter the original scope.")
    .max(3000, "Text can't exceed 3000 chars limit."),
});

export type promptSchemaType = z.infer<typeof promptSchema>;
