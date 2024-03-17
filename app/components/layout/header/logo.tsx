import { Language } from "@/types/language";
import Image from "next/image";
import Link from "next/link";

export default function Logo({ language }: { language: Language }) {
  return (
    <Link href={`/${language}`} className="flex flex-row gap-3 sm:gap-4">
      <Image
        className="rounded flex my-auto sm:w-[55px] w-[50px]"
        src="/garmeres-logo-small.png"
        alt=""
        width={70}
        height={70}
      />
      <span className="text-white my-auto text-2xl sm:text-3xl font-extralight">
        Garmeres
      </span>
    </Link>
  );
}
