import { generateStaticLanguageParams } from "@/app/navigation/language";
import { Language, forceLanguage, isLanguage } from "@/types/language";
import { notFound, permanentRedirect } from "next/navigation";
import { homeFullSlug } from "@/utils/slugs";

export const generateStaticParams = generateStaticLanguageParams;

export const dynamicParams = true;

export default function Page(props: { params?: { language?: string } }) {
  if (!isLanguage(props.params?.language)) notFound();
  const language = forceLanguage(props.params?.language);
  permanentRedirect(homeFullSlug[language as Language]);
}
