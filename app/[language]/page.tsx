import {
  assertValidLanguageParam,
  generateStaticLanguageParams,
} from "@/app/navigation/language";

export const generateStaticParams = generateStaticLanguageParams;

export default function Page(props: { params: { language: string } }) {
  const { language } = props.params;
  assertValidLanguageParam(language);
  return <>{language}</>;
}
