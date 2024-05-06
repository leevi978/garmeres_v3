import { Language } from "@/types/language";
import Image from "next/image";
import Link from "next/link";

export default function Logo({ language }: { language: Language }) {
  return (
    <Link
      prefetch={false}
      href={`/${language}`}
      className="flex text-white flex-row gap-4 xl:gap-6 no-underline"
    >
      <Image
        className="rounded flex my-auto xl:w-[65px] w-[55px]"
        src="/garmeres-logo-small.png"
        alt=""
        width={70}
        height={70}
      />
      <span className="my-auto text-2xl xl:text-3xl font-extralight">
        Garmeres
      </span>
    </Link>
  );
}
