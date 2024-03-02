import { Language } from "@/types/language";
import Logo from "./logo";
import MenuButton from "./menu-button";

export function HeaderMargin() {
  return <div className="w-screen my-4 h-[70px]" />;
}

export default function Header({ language }: { language: Language }) {
  return (
    <header className="absolute top-0 left-0 right-0 z-10 w-screen bg-zinc-800 flex flex-row justify-between shadow-lg px-8 py-4">
      <Logo language={language} />
      <MenuButton />
    </header>
  );
}
