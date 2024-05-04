"use client";
import { GoogleAnalytics } from "@next/third-parties/google";
import { useEffect, useState } from "react";
import { Language } from "@/types/language";
import CookieBanner from "./cookie-banner";
import {
  getCookies,
  setCookie,
  deleteCookie,
  getCookie,
  hasCookie,
} from "cookies-next";

const consentCookieName = "_ga_consent";

export default function Analytics({ language }: { language: Language }) {
  const [consent, setConsent] = useState<boolean>(
    getCookie(consentCookieName) === "true"
  );
  const [responded, setResponded] = useState(hasCookie(consentCookieName));
  const [loading, setLoading] = useState<boolean>(!responded);

  useEffect(() => {
    if (loading) {
      const cookieConsent = getCookie(consentCookieName);
      setResponded(cookieConsent != null);
      setConsent(cookieConsent === "true");
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    if (responded && !consent) {
      Object.keys(getCookies())
        .filter((c) => c.startsWith("_ga") && c !== consentCookieName)
        .forEach((c) => deleteCookie(c));
    }
  }, [responded, consent]);

  function respond(isAccepted: boolean) {
    setCookie(consentCookieName, isAccepted ? "true" : "false", {
      maxAge: isAccepted ? 28 * 24 * 60 * 60 : undefined, // 28 days, in seconds
    });
    setLoading(true);
  }

  return loading ? null : !responded ? (
    <CookieBanner
      language={language}
      onAccept={() => respond(true)}
      onReject={() => respond(false)}
    />
  ) : consent ? (
    <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GTAG || ""} />
  ) : null;
}
