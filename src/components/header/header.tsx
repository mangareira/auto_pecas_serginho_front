"use client"

import { HeaderLogo } from "./headerLogo";
import { Navigation } from "./mainNav";

export function Header() {

  return (
    <header className="bg-gradient-to-b from-blue-800 to-blue-600 px-4 py-8 lg:px-14">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center lg:gap-x-96">
            <HeaderLogo />
            <Navigation />
          </div>
        </div>
      </div>
    </header>
  );
}