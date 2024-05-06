import {
  assertValidLanguageParam,
  generateStaticLanguageParams,
} from "@/app/navigation/language";
import { Language } from "@/types/language";
import { permanentRedirect } from "next/navigation";
import { homeFullSlug } from "@/utils/slugs";

export const generateStaticParams = generateStaticLanguageParams;

export default function Page(props: { params: { language: string } }) {
  const { language } = props.params;
  assertValidLanguageParam(language);
  permanentRedirect(homeFullSlug[language as Language]);
}
