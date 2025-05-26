import { useMutation, useQueryClient } from "@tanstack/react-query"
import { LoginFormValues } from "../schemas/login-dto"
import { toast } from "sonner"

export const useLogin = () => {
  const client = useQueryClient()

  const mutation = useMutation<void, Error, LoginFormValues>({
    mutationFn: async (json) => {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        body: JSON.stringify(json),
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include"
      })

      return
    },
    onSuccess: () => {
      client.invalidateQueries({queryKey: ["login"]})
      toast.success("Login feito com sucesso")
    },
    onError: () => {
      toast.error("Error ao fazer o login")
    }
  })

  return mutation
}