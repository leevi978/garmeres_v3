import { Language } from "@/types/language";
import Logo from "./logo";
import MenuButton from "./menu-button";

export default function Header({ language }: { language: Language }) {
  return (
    <header className="w-screen bg-zinc-800 flex flex-row justify-between shadow-lg px-8 py-6">
      <Logo />
      <MenuButton />
    </header>
  );
}
