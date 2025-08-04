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
    employees: z.object({
      id: z.string(),
      name: z.string(),
      phone: z.string(),
      value: z.number()
    }).optional(),
    employeesId: z.string().optional(),
    helpers: z.object({
      id: z.string(),
      name: z.string(),
      phone: z.string(),
      value: z.number()
    }).optional().nullable(),
    helpersId: z.string().optional().nullable(),
    items: z.array(z.string()).optional(),
    type_services: z.array(z.string()),
    clientType: z.enum(['particular', 'entreprise']).optional(),
    value: z.union([ z.string(), z.number().nonnegative() ])
  })

  export const servicesResponse = z.object({
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
    employees: z.object({
      id: z.string(),
      name: z.string(),
      phone: z.string(),
      value: z.number()
    }).optional(),
    employeesId: z.string().optional(),
    helpers: z.object({
      id: z.string(),
      name: z.string(),
      phone: z.string(),
      value: z.number()
    }).optional().nullable(),
    helpersId: z.string().optional().nullable(),
    items: z.array(z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      value: z.number()
    })),
    type_services: z.array(z.object({
      id: z.string(),
      name: z.string(),
      value: z.number()
    })),
    value: z.union([ z.string(), z.number().nonnegative() ])
  })

  export type ServicesResponse = z.infer<typeof servicesResponse>

  export type ServicesValue = z.infer<typeof servicesSchema>