import { Header } from "@/components/header/header";
import { ReactNode } from "react";

export default function DashLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="px-4 lg:px-14">
        {children}
      </main>
    </>
  );
}