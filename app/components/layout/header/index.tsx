"use client";
import { Language } from "@/types/language";
import Logo from "./logo";
import Menu from "./menu";
import { useRef } from "react";
import { MenuItem } from "@/types/sanity-types";

export function HeaderMargin() {
  return <div className="w-screen my-4 h-[70px]" />;
}

export default function Header({
  language,
  menuItems,
}: {
  language: Language;
  menuItems: MenuItem[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <header className="absolute top-0 left-0 right-0 z-10 w-screen bg-zinc-800 flex flex-row justify-between shadow-lg px-4 py-2 sm:px-8 sm:py-4">
      <Logo language={language} />
      <Menu
        language={language}
        containerRef={containerRef}
        menuItems={menuItems}
      />
    </header>
  );
}
