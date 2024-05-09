import { Language, forceLanguage } from "@/types/language";
import { ReactNode } from "react";
import RootLayout from "@/app/components/layout/root-layout";
import { generateStaticLanguageParams } from "../navigation/language";
import { getMenuItems } from "@/services/sanity-service";

export const generateStaticParams = generateStaticLanguageParams;

export const dynamicParams = true;

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params?: { language?: Language };
}) {
  const language = forceLanguage(params?.language);
  const menuItems = await getMenuItems({
    language: language,
  });
  return (
    <RootLayout
      menuItems={menuItems}
      params={{
        language,
      }}
    >
      {children}
    </RootLayout>
  );
}
