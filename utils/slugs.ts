import { Translated, languages } from "@/types/language";
import { Slug } from "@/types/sanity-types";

export const homeSlug: Translated<string> = {
  se: "ruoktot",
  en: "home",
};

export const privacyPolicySlug: Translated<string> = {
  se: "personsuodjalusnjuolggadusat",
  en: "privacy-policy",
};

export const homeFullSlug: Translated<string> = languagePrefixed(homeSlug);

export const privacyPolicyFullSlug: Translated<string> =
  languagePrefixed(privacyPolicySlug);

export const isHomeSlug = (slug: string | Slug) => isSlug(slug, homeSlug);

export const isPrivacyPolicySlug = (slug: string | Slug) =>
  isSlug(slug, privacyPolicySlug);

function isSlug(slug: string | Slug, translatedSlug: Translated<string>) {
  return (
    Object.values(translatedSlug).find(
      (s) => (typeof slug === "string" ? slug : slug.current) === s
    ) != null
  );
}

function languagePrefixed(
  translatedSlug: Translated<string>
): Translated<string> {
  return Object.fromEntries(
    languages.map((language) => [
      language,
      `/${language}/${translatedSlug[language]}`,
    ])
  ) as Translated<string>;
}
