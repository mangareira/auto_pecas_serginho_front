'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightFromLine, Mail, LockKeyholeOpen, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginFormSchema, LoginFormValues } from "@/utils/schemas/login-dto";
import { useLogin } from "@/utils/hooks/useLogin";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/axios";

interface LoginFormProps {
  accessToken?: string;
  refreshToken?: string;
}

export default function LoginForm({ accessToken, refreshToken }: LoginFormProps) {
  const { mutate, isPending} = useLogin()
  const [isRefreshing, setIsRefreshing] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter()

  function onSubmit(values: LoginFormValues) {
    mutate(values, {
      onSuccess: () => {
        router.push("/")
      },
    })
  }

  function handleReset() {
    form.reset(); 
    form.clearErrors();
  }

  async function refresh_handle() {
    try {
      setIsRefreshing(true);
      const res = await api.post("/login/refresh-token");
      return res.status === 201;
    } catch (err) {
      console.error("Erro ao tentar refresh token:", err);
      return false;
    } finally {
      setIsRefreshing(false);
    }
  }

  useEffect(() => {
    if (!accessToken && refreshToken) {
      
      (async () => {
        const ok = await refresh_handle();
        if (ok) {
          router.push("/");
        } else {
          console.warn("Refresh token falhou, permanecendo na tela de login.");
        }
      })();
    }
  }, [accessToken, refreshToken, router]);

  if(isRefreshing) {
    return (
      <div className="flex justify-center items-center">
        <Loader2  size={50} className="animate-spin"/>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onReset={handleReset}
        className="flex items-center justify-center min-h-screen bg-gray-100 p-4"
      >
        <div className="flex flex-col border border-gray-300 bg-white rounded-2xl p-8 sm:p-10 gap-6 w-full max-w-md shadow-xl">
          <div className="text-center mb-4">
            <h1 className="text-2xl font-semibold text-gray-800">Login</h1>
            <p className="text-sm text-gray-500">Acesse o dashboard, somente Autorizados</p>
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="seuemail@exemplo.com"
                      type="email"
                      autoComplete="email"
                      className="pl-10"
                      {...field}
                    />
                    <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Mail className="size-4" strokeWidth={2} />
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="••••••••"
                      type="password"
                      autoComplete="current-password"
                      className="pl-10"
                      {...field}
                    />
                    <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <LockKeyholeOpen className="size-4" strokeWidth={2} />
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.formState.errors.root && (
            <p className="text-sm font-medium text-destructive">
              {form.formState.errors.root.message}
            </p>
          )}
          <Button
            type="submit"
            className="w-full mt-4"
            disabled={isPending || isRefreshing}
          >
            {isPending ? (
              <Loader2 className="animate-spin" size={20} />
            ):(
              <>
                Entrar
                <ArrowRightFromLine className="size-4 ml-2" strokeWidth="2.25" />
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}