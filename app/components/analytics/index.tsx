import { Language } from "@/types/language";
import { cookies } from "next/headers";
import AnalyticsInteractive from "./analytics-interactive";

const consentCookieName = "_ga_consent";

export default async function Analytics({ language }: { language: Language }) {
  const cookieStore = cookies();
  const cookieValue = cookieStore.get(consentCookieName)?.value;
  const consent = cookieValue ? cookieValue === "true" : undefined;

  if (consent !== true) {
    // Delete all GA cookies
    cookieStore
      .getAll()
      .map((c) => c.name)
      .filter((c) => c.startsWith("_ga") && c !== consentCookieName)
      .forEach((c) => cookieStore.delete(c));
  }

  return (
    <AnalyticsInteractive
      consentCookieName={consentCookieName}
      language={language}
      initialConsent={consent}
    />
  );
}
