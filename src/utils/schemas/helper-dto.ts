import { z } from "zod";

export const helperValues = z.object({
  id: z.string().optional(),
  name: z.string(),
  phone: z.string(),
  services: z.array(z.object({})).optional()
});


export type HelperValues = z.infer<typeof helperValues>;