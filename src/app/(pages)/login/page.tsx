// app/login/page.tsx (Server Component por padrão)
import LoginForm from "@/components/login";
import { cookies } from "next/headers";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  return (
    <div>
      <LoginForm accessToken={accessToken} refreshToken={refreshToken} />
    </div>
  );
}
