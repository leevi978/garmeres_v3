import { Language, languages } from "@/types/language";
import { notFound } from "next/navigation";

export function generateStaticLanguageParams() {
    return languages.map((language) => ({
        language,
    }));
}

export function assertValidLanguageParam(language: string) {
    if (!languages.includes(language as Language)) {
        notFound();
    }
}
