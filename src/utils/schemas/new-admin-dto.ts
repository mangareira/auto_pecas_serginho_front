import { z } from "zod";

export const adminFormSchema = z.object({
  name: z.string(),
  email: z
    .string()
    .min(1, { message: "O email é obrigatório." })
    .email({ message: "Por favor, insira um endereço de email válido." }),
  password: z
    .string()
    .min(1, { message: "A senha é obrigatória." })
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres." })
    .optional(),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const valueAdmin = adminFormSchema.omit({
  password: true
})

export type AdminFormValues = z.infer<typeof adminFormSchema>;
export type AdminValues = z.infer<typeof valueAdmin>