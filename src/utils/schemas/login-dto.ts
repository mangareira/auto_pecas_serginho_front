import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "O email é obrigatório." })
    .email({ message: "Por favor, insira um endereço de email válido." }),
  password: z
    .string()
    .min(1, { message: "A senha é obrigatória." })
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;