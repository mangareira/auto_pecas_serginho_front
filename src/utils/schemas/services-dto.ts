import { z } from "zod";

export const servicesSchema = z.object({
  id: z.string(),
  client: z.string(),
  date: z.coerce.date(),
  vehicle: z.string(),
  plate: z.string(),
  particular: z.boolean().optional(),
  enterprise: z.boolean().optional(),
  enterprise_name: z.string().optional(),
  phone: z.string(),
  diagnoses: z.string(),
  employees: z.string().optional(),
  employeesId: z.string().optional(),
  helpers: z.string().optional().nullable(),
  helpersId: z.string().optional().nullable(),
  type_services: z.array(z.string()),
  clientType: z.enum(['particular', 'entreprise']).optional(),
})

export type ServicesValue = z.infer<typeof servicesSchema>