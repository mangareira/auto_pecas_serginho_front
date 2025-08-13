// src/components/RefreshTokenHandler.tsx
"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useRefreshToken } from "@/utils/hooks/useRefreshToken";

const RefreshTokenHandler = () => {
  const { mutate } = useRefreshToken();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const interval = setInterval(() => {
      mutate(undefined, {
        onSuccess: () => {
          if (pathname === "/login") {
            router.push("/");
          }
        },
        onError: (error) => {
          console.error("Falha na renovação do token:", error);
          if (pathname !== "/login") {
            router.push("/login");
          }
        }
      });
    }, 50 * 1000);

    return () => clearInterval(interval);
  }, [mutate, router, pathname]); 
  return null;
};

export default RefreshTokenHandler;