import { Header } from "@/components/header/header";
import { SheetProvider } from "@/providers/sheet-provider";
import { ReactNode } from "react";

export default function DashLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Header />
      <SheetProvider />
      <main className="px-14">
        {children}
      </main>
    </>
  );
}