import { z } from "zod";

export const employeeValues = z.object({
  id: z.string(),
  name: z.string(),
  phone: z.string(),
  services: z.array(z.object({})).optional(),
  value: z.union([z.string(), z.number().nonnegative()])
});


export type EmployeeValues = z.infer<typeof employeeValues>;