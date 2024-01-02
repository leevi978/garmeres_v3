import { Language, defaultLanguage, languages } from "@/types/language";
import { ReactNode } from "react";
import RootLayout from "@/app/components/layout/root-layout";
import { generateStaticLanguageParams } from "../navigation/language";

export const generateStaticParams = generateStaticLanguageParams;

export const dynamicParams = true;

export default function Layout({
    children,
    params: { language },
}: {
    children: ReactNode;
    params: { language: Language };
}) {
    return (
        <RootLayout
            params={{
                language: languages.includes(language)
                    ? language
                    : defaultLanguage,
            }}
        >
            {children}
        </RootLayout>
    );
}
