import { Language, Translated } from "@/types/language";
import BackgroundAttribution from "./background-attribution";
import { getContactInfo } from "@/services/sanity-service";
import Social from "./social";

export default async function Footer({ language }: { language: Language }) {
  const contact = await getContactInfo();
  return (
    <footer className="flex flex-col justify-center items-center gap-4 bg-zinc-800 py-8 px-8 text-white z-10">
      <Social facebook={contact.facebook} instagram={contact.instagram} />
      <BackgroundAttribution language={language} />
      {(contact
        ? Object.keys(translations)
            .filter((key) => Object.keys(contact).includes(key))
            .map((key) =>
              key === "email" ? (
                <p key={key}>
                  {`${translations[key][language]}: `}
                  <a href={`mailto:${contact[key]}`}>{contact[key]}</a>
                </p>
              ) : (
                <p
                  key={key}
                >{`${translations[key][language]}: ${contact[key]}`}</p>
              )
            )
        : []
      ).concat([
        <p key={"webmaster"}>{translations["webmaster"][language]}</p>,
        <p key={"copyright"}>
          <b>{translations["copyright"][language]}</b>
        </p>,
      ])}
    </footer>
  );
}

const translations: {
  [key: string]: Translated<string>;
} = {
  email: {
    en: "E-mail",
    se: "E-boasta",
  },
  vipps: {
    en: "Vipps",
    se: "Vipps",
  },
  bankAccount: {
    en: "Account number",
    se: "Kontonr",
  },
  orgNumber: {
    en: "Organisation number",
    se: "Org.nr",
  },
  webmaster: {
    en: "Website creator: Levi Sørum",
    se: "Neahttasiiddu vásttolaš: Levi Sørum",
  },
  copyright: {
    en: "Copyright Garmeres - Norwegian section © 2024",
    se: "Dahkkivuoigatvuohta Garmeres - Norgalaš juogus © 2024",
  },
};
