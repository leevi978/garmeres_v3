import { Language, defaultLanguage } from "@/types/language";
import { ReactNode } from "react";
import PreviewWrapper from "../preview/preview-wrapper";
import "@/app/globals.css";

export default function RootLayout({
    children,
    params,
}: {
    children: ReactNode;
    params?: { language?: Language };
}) {
    return (
        <html lang={params?.language || defaultLanguage}>
            <body>
                <PreviewWrapper>{children}</PreviewWrapper>
            </body>
        </html>
    );
}
