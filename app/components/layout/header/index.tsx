"use client";
import { Language } from "@/types/language";
import Logo from "./logo";
import Menu from "./menu";
import { useRef } from "react";
import { MenuItem } from "@/types/sanity-types";

export function HeaderMargin() {
  return <div className="w-screen h-[75px] lg:h-[83px]" />;
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
    <header className="absolute top-0 left-0 right-0 z-10 w-screen bg-zinc-800 flex flex-row justify-between shadow-lg px-2 lg:px-4 py-1 lg:py-2">
      <Logo language={language} />
      <Menu
        language={language}
        containerRef={containerRef}
        menuItems={menuItems}
      />
    </header>
  );
}
