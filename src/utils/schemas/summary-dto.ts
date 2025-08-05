import { z } from "zod";

export const summarySchema = z.object({
  remainingAmount: z.number(),
  remainingChange: z.number(),
  incomeAmount: z.number(),
  incomeChange: z.number(),
  expensesAmount: z.number(),
  expensesChange: z.number(),
  days: z.array(z.object({
    date: z.string(),
    income: z.number(),
  })),
  employees: z.array(z.object({
    name: z.string(),
    value: z.number()
  }))
})

export type Summary = z.infer<typeof summarySchema>