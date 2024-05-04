import { Language, defaultLanguage } from "@/types/language";
import { ReactNode } from "react";
import PreviewWrapper from "../preview/preview-wrapper";
import "@/app/globals.css";
import Header from "./header";
import Footer from "./footer";
import { MenuItem } from "@/types/sanity-types";
import { Lexend as CustomFont } from "next/font/google";
import Analytics from "../analytics";

const customFont = CustomFont({
  weight: ["100", "200", "300", "400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
  menuItems,
  params,
}: {
  children: ReactNode;
  menuItems: MenuItem[];
  params?: { language?: Language };
}) {
  const language = params?.language || defaultLanguage;
  return (
    <html lang={language} className={customFont.className}>
      <body>
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-zinc-900 -z-20" />
        <PreviewWrapper>
          <Header language={language} menuItems={menuItems} />
          <Analytics language={language} />
          <main className="flex flex-col min-h-screen max-w-screen">
            {children}
          </main>
          <Footer language={language} />
        </PreviewWrapper>
      </body>
    </html>
  );
}
