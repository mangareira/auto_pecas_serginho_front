import { z } from "zod";

export const typeServicesSchema = z.object({
  id: z.string(),
  name: z.string(),
  value: z.union([z.string(), z.number()])
})

export type TypeServicesValue = z.infer<typeof typeServicesSchema>