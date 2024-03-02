import { Language, defaultLanguage, languageNames } from "@/types/language";
import { ReactNode } from "react";
import PreviewWrapper from "../preview/preview-wrapper";
import "@/app/globals.css";
import Header from "./header";
import Footer from "./footer";

export default function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params?: { language?: Language };
}) {
  const language = params?.language || defaultLanguage;
  return (
    <html lang={language}>
      <body>
        <PreviewWrapper>
          <div className="flex flex-col justify-between min-h-screen">
            <Header language={language} />
            <main className="flex flex-col flex-grow bg-zinc-900">
              {children}
            </main>
            <Footer language={language} />
          </div>
        </PreviewWrapper>
      </body>
    </html>
  );
}
