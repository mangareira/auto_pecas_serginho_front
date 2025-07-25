import { z } from "zod";

export const itemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  value: z.union([z.string(), z.number()])
})

export type ItemValue = z.infer<typeof itemSchema>