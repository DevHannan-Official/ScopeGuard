import { z } from "zod/v3";

export const promptSchema = z.object({
  originalScope: z
    .string()
    .min(1, "Please enter the original scope.")
    .max(3000, "Text can't exceed 3000 chars limit."),
  clientRequest: z
    .string()
    .min(1, "Please enter the original scope.")
    .max(3000, "Text can't exceed 3000 chars limit."),
});

export type promptSchemaType = z.infer<typeof promptSchema>;
