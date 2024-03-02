"use client";
import { Fade, Slide } from "@mui/material";
import { useState, RefObject } from "react";
import Link from "next/link";
import { Language } from "@/types/language";
import MenuButton from "./menu-button";
import { MenuItem } from "@/types/sanity-types";

export default function Menu({
  containerRef,
  menuItems,
  language,
}: {
  containerRef: RefObject<HTMLElement>;
  menuItems: MenuItem[];
  language?: Language;
}) {
  const [isOpen, setIsOpen] = useState(false);

  function handleChange(e: any) {
    setIsOpen((isOpen) => !isOpen);
  }

  function MenuItem(props: MenuItem) {
    const { path, name } = props;
    return (
      <li>
        <Link
          href={path}
          className="flex h-full w-full"
          onClick={() => setIsOpen(false)}
        >
          <span className="mx-auto text-xl font-medium">{name}</span>
        </Link>
      </li>
    );
  }
  let i = 0;
  return (
    <div className="relative">
      <Fade in={isOpen}>
        <div
          onClick={handleChange}
          className="fixed top-0 bottom-0 left-0 right-0 min-w-screen w-screen h-screen min-h-screen bg-black/[0.4]"
        />
      </Fade>
      <MenuButton onPress={handleChange} isOpen={isOpen} />
      <Slide direction="left" in={isOpen} container={containerRef.current}>
        <nav className="fixed flex flex-col justify-between top-0 right-0 bottom-0 rounded-sm max-h-screen w-full sm:w-[380px] max-w-screen bg-zinc-300  shadow-xl items-center">
          <div className="relative flex flex-row py-3 px-4 w-full">
            <MenuButton onPress={handleChange} isOpen={isOpen} />
          </div>
          <ul className="relative flex flex-col flex-grow w-full justify-evenly sm:justify-start sm:gap-16 items-center pb-12 sm:pt-12">
            {menuItems.map((item) => (
              <MenuItem key={item.name} {...item} />
            ))}
          </ul>
        </nav>
      </Slide>
    </div>
  );
}
