"use client";
import { Fade, Slide } from "@mui/material";
import { useState, RefObject, useEffect } from "react";
import Link from "next/link";
import { Language, languages } from "@/types/language";
import MenuButton from "./menu-button";
import { MenuItem } from "@/types/sanity-types";
import { usePathname } from "next/navigation";
import { getTranslatedPathname } from "@/app/actions/get-translated-pathname";
import { languageNames } from "@/types/language";
import { MdLanguage } from "react-icons/md";

export default function Menu({
  containerRef,
  menuItems,
  language,
}: {
  containerRef: RefObject<HTMLElement>;
  menuItems: MenuItem[];
  language: Language;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [translationPath, setTranslationPath] = useState("en");
  const [translationLabel, setTranslationLabel] = useState("English");
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      getTranslatedPathname(pathname, language).then((path: string) => {
        const label =
          languageNames[languages.find((lang) => lang !== language) || "en"];
        setTranslationLabel(label);
        setTranslationPath(path);
      });
    }
  }, [pathname, language]);

  function handleChange(e: any) {
    setIsOpen((isOpen) => !isOpen);
  }

  function MenuItem(props: MenuItem) {
    const { path, name } = props;
    return (
      <li>
        <Link
          href={path}
          className="flex h-full w-full flex-row gap-2 items-center no-underline"
          onClick={() => setIsOpen(false)}
        >
          {props.languageIcon ? <MdLanguage size={25} /> : null}
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
        <nav className="fixed flex flex-col justify-between top-0 right-0 bottom-0 rounded-sm max-h-screen w-full sm:w-[380px] max-w-screen bg-zinc-200  shadow-xl items-center">
          <div className="relative flex flex-row py-3 px-4 w-full">
            <MenuButton onPress={handleChange} isOpen={isOpen} />
          </div>
          <ul className="relative flex flex-col flex-grow w-full justify-evenly sm:justify-start sm:gap-16 items-center pb-12 sm:pt-12">
            {menuItems.map((item) => (
              <MenuItem key={item.name} {...item} />
            ))}
            <MenuItem
              name={translationLabel}
              path={translationPath}
              languageIcon
            />
          </ul>
        </nav>
      </Slide>
    </div>
  );
}
