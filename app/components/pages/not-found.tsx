"use client";

import { Language, Translated, languages } from "@/types/language";
import { HeaderMargin } from "../layout/header";
import PageTextContainer from "../layout/page-text-contianer";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import { homeFullSlug } from "@/utils/slugs";

export default function NotFound({
  params,
}: {
  params?: { language?: Language };
}) {
  const { language = getLocalLanguage() } = params || {};
  return (
    <div className="flex flex-col h-full flex-grow">
      <HeaderMargin />
      <PageTextContainer>
        <div className="flex-grow flex flex-col justify-center text-center h-full gap-8">
          <h1>{title[language]}</h1>
          <div className="flex justify-center mx-auto rounded-full p-2 border-2 border-zinc-800 h-28 w-28">
            <LiveHelpIcon className="min-h-16 min-w-16 my-auto mx-auto text-zinc-800" />
          </div>
          <p className="text-lg">{description[language]}</p>
          <Link
            href={homeFullSlug[language]}
            className="flex flex-row justify-center text-black no-underline hover:underline gap-1 mx-auto"
          >
            <ArrowBackIcon className="my-auto" />
            <span className="text-lg font-normal">
              {homeButtonText[language]}
            </span>
          </Link>
        </div>
      </PageTextContainer>
    </div>
  );
}

function getLocalLanguage(): Language {
  const langArr = window.location.pathname.split("/").filter((e) => e !== "");
  if (langArr.length === 0 || !languages.includes(langArr[0] as Language))
    return "se";
  return langArr[0] as Language;
}

const title: Translated<string> = {
  se: "Siidu ii gávdno",
  en: "This page doesn't exist",
};

const description: Translated<string> = {
  se: "Várra lea siidu sirdán, dahje URL leat boastut čállán.",
  en: "It might have been moved, or the URL could be wrong.",
};

const homeButtonText: Translated<string> = {
  se: "Mana ruoktot",
  en: "Return home",
};
