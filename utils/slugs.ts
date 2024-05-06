import { Translated } from "@/types/language";
import { Slug } from "@/types/sanity-types";

export const homeFullSlug: Translated<string> = {
  se: "/se/ruoktot",
  en: "/en/home",
};

export const homeSlug: Translated<string> = {
  se: "ruoktot",
  en: "home",
};

export function isHomeSlug(slug: string | Slug) {
  return (
    Object.values(homeSlug).find(
      (s) => (typeof slug === "string" ? slug : slug.current) === s
    ) != null
  );
}
