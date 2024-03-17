import { Featured, ResolvableLink } from "@/types/sanity-types";
import Link from "next/link";
import { resolveLink } from "@/services/sanity-service";
import { HeaderMargin } from "../layout/header";

export default function FeaturedComponent(props: Featured) {
  const { title, text, callToAction } = props;
  return (
    <div className="flex flex-col justify-between min-h-screen h-auto w-screen box-content">
      <HeaderMargin />
      <div className=" bg-slate-100 border-2 bg-opacity-95 my-auto w-screen py-16 px-4 shadow-lg">
        <div className="flex flex-col justify-between items-center gap-12 w-full max-w-[1024px] mx-auto text-center">
          <h1 className="text-4xl font-extralight">{title}</h1>
          <p className="text-base font-light">{text}</p>
          <CallToAction {...callToAction} />
        </div>
      </div>
    </div>
  );
}

function CallToAction({
  title,
  link,
}: {
  title: string;
  link: ResolvableLink;
}) {
  return (
    <Link
      className="text-base px-8 lg:px-12 py-3 lg:py-4 font-light rounded-full bg-slate-700 text-white hover:bg-slate-600"
      href={resolveLink(link)}
    >
      {title}
    </Link>
  );
}
