import {
  assertValidLanguageParam,
  generateStaticLanguageParams,
} from "@/app/navigation/language";
import { Language } from "@/types/language";
import { permanentRedirect } from "next/navigation";

export const generateStaticParams = generateStaticLanguageParams;

function homeSlug(language: Language) {
  return `/${language === "se" ? "ruoktot" : language === "en" ? "home" : ""}`;
}

export default function Page(props: { params: { language: string } }) {
  const { language } = props.params;
  assertValidLanguageParam(language);
  permanentRedirect(`/${language}${homeSlug(language as Language)}`);
}
