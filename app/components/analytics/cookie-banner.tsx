"use client";

import { Language, Translated } from "@/types/language";
import { privacyPolicyFullSlug } from "@/utils/slugs";
import Link from "next/link";
import { Button, ButtonProps } from "react-aria-components";

const linkClass =
  "text-sm text-blue-300 font-light no-underline hover:underline";

export default function CookieBanner({
  onAccept,
  onReject,
  language,
}: {
  onAccept: () => void;
  onReject: () => void;
  language: Language;
}) {
  return (
    <section
      className="px-4 sm:px-8 py-8 sm:py-12 gap-8 fixed flex flex-col w-screen bottom-0 left-0 right-0 bg-zinc-800 text-white z-50"
      aria-labelledby="cookie_heading"
    >
      <h2
        className="text-center sm:text-left font-light text-xl leading-8"
        id="cookie_heading"
      >
        {heading[language]}
      </h2>
      <div>
        <p className="text-sm leading-8 text-center sm:text-left">
          {description[language]}
          <GaLink />
          {privacyText[language]}
          <Link className={linkClass} href={privacyPolicyFullSlug[language]}>
            {privacyLinkText[language]}.
          </Link>
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-8">
        <CookieButton
          aria-label={acceptText[language]}
          isAccept={true}
          onPress={onAccept}
        >
          {acceptText[language]}
        </CookieButton>
        <CookieButton
          aria-label={rejectText[language]}
          isAccept={false}
          onPress={onReject}
        >
          {rejectText[language]}
        </CookieButton>
      </div>
    </section>
  );
}

function CookieButton(props: ButtonProps & { isAccept: boolean }) {
  const { isAccept, ...buttonProps } = props;
  return (
    <Button
      {...buttonProps}
      className={`${buttonProps.className} ${isAccept ? "bg-blue-300 hover:bg-blue-200 text-black font-normal rounded py-4 px-8" : ""} text-sm border-none outline-none`}
    />
  );
}

const GaLink = () => (
  <a
    href="https://developers.google.com/analytics/devguides/collection/ga4"
    rel="nofollow"
    target="_blank"
    className={linkClass}
  >
    Google Analytics 4
  </a>
);

const heading: Translated<string> = {
  se: "Diehtočoahkku mieđáhus",
  en: "Cookie consent",
};

const description: Translated<string> = {
  se: "Mii čohkket namahis dáhtat gehččiidlogut birra ",
  en: "We use cookies to collect anonymous analytics data using ",
};

const privacyText: Translated<string> = {
  se: " diehtočoahkuiguin. Eambbo informašuvnna oainnát ",
  en: ". For more information, see our ",
};

const privacyLinkText: Translated<string> = {
  se: "personsuodjalusnjuolggadusain",
  en: "privacy policy",
};

const acceptText: Translated<string> = {
  se: "Mun dohkkehan visot",
  en: "Accept all",
};

const rejectText: Translated<string> = {
  se: "Dušše dárbbašlaččat",
  en: "Required only",
};
