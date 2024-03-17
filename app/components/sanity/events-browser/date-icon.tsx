import { Language, Translated } from "@/types/language";

export default function DateIcon({
  language,
  datetimeIso,
}: {
  language: Language;
  datetimeIso: string;
}) {
  const date = new Date(datetimeIso);
  return (
    <div
      className="flex flex-col justify-center items-center border-l-2 border-fuchsia-400 mr-auto w-16 h-full"
      aria-label={`${date.getDate()}. ${months[date.getMonth()][language]}`}
    >
      <span aria-hidden="true">{date.getDate()}</span>
      <span aria-hidden="true">
        {months[date.getMonth()][language].slice(0, 3)}
      </span>
    </div>
  );
}

const months: Translated<string>[] = [
  {
    en: "January",
    se: "Ođđajagemánnu",
  },
  {
    en: "February",
    se: "Guovvamánnu",
  },
  {
    en: "March",
    se: "Njukčamánnu",
  },
  {
    en: "April",
    se: "Cuoŋománnu",
  },
  {
    en: "May",
    se: "Miessemánnu",
  },
  {
    en: "June",
    se: "Geassemánnu",
  },
  {
    en: "July",
    se: "Suoidnemánnu",
  },
  {
    en: "August",
    se: "Borgemánnu",
  },
  {
    en: "September",
    se: "Čakčamánnu",
  },
  {
    en: "October",
    se: "Golgotmánnu",
  },
  {
    en: "November",
    se: "Skabmamánnu",
  },
  {
    en: "December",
    se: "Juovlamánnu",
  },
];
