"use client";

import { Language, languages } from "@/types/language";

function getLocalLanguage(): Language {
    const langArr = window.location.pathname.split("/").filter((e) => e !== "");
    if (langArr.length === 0 || !languages.includes(langArr[0] as Language))
        return "se";
    return langArr[0] as Language;
}

export default function NotFound({
    params,
}: {
    params?: { language?: Language };
}) {
    const { language = getLocalLanguage() } = params || {};
    return <>Not found{language ? `: ${language}` : ""}</>;
}
