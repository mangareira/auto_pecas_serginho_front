import { z } from "zod";

export const helperValues = z.object({
  id: z.string(),
  name: z.string(),
  phone: z.string(),
  services: z.array(z.object({})).optional(),
  value: z.union([ z.string(), z.number().nonnegative() ])
});


export type HelperValues = z.infer<typeof helperValues>;