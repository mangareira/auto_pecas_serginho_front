import api from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useRefreshToken = () => {
  const client = useQueryClient()

  const mutation = useMutation<void, Error>({
    mutationFn: async () => {
      await api.post('/login/refresh-token');
      return
    },
    onSuccess: () => {
      client.invalidateQueries({queryKey: ["refresh-token"]})
    },

  })

  return mutation
}