import { z } from "zod";

export const employeeValues = z.object({
  id: z.string(),
  name: z.string(),
  phone: z.string(),
  services: z.array(z.object({})).optional()
});


export type EmployeeValues = z.infer<typeof employeeValues>;