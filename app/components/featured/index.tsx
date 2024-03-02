import { Featured } from "@/types/sanity-types";
import Link from "next/link";

export default function Featured(props: Featured) {
  const { title, text } = props;
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col justify-between items-center bg-white bg-opacity-90 gap-8 my-auto w-screen py-12">
        <h1>{title}</h1>
        <p>{text}</p>
        <Link href={""}>Call to action</Link>
      </div>
    </div>
  );
}
