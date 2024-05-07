"use client";
import { GoogleAnalytics } from "@next/third-parties/google";
import { useState } from "react";
import { Language } from "@/types/language";
import CookieBanner from "./cookie-banner";
import { setCookie } from "cookies-next";

type AnalyticsProps = {
  language: Language;
  initialConsent?: boolean;
  consentCookieName: string;
};

export default function AnalyticsInteractive(props: AnalyticsProps) {
  const [consent, setConsent] = useState<boolean | undefined>(
    props.initialConsent
  );

  function onResponse(response: boolean) {
    setCookie(props.consentCookieName, response ? "true" : "false", {
      maxAge: response ? 28 * 24 * 60 * 60 : undefined, // 28 days, in seconds
    });
    setConsent(response);
  }

  return consent === true ? (
    <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GTAG || ""} />
  ) : consent === false ? null : (
    <CookieBanner language={props.language} onResponse={onResponse} />
  );
}
