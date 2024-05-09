import { generateStaticLanguageParams } from "@/app/navigation/language";
import { Language, forceLanguage } from "@/types/language";
import { permanentRedirect } from "next/navigation";
import { homeFullSlug } from "@/utils/slugs";

export const generateStaticParams = generateStaticLanguageParams;

export const dynamicParams = false;

export default function Page(props: { params?: { language?: string } }) {
  const language = forceLanguage(props.params?.language);
  permanentRedirect(homeFullSlug[language as Language]);
}
