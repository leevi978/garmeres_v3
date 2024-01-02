import { generateStaticSlugParams } from "@/app/navigation/slug";
import { Language } from "@/types/language";

export const generateStaticParams = () => generateStaticSlugParams("page");

export const dynamicParams = false;

export default function Page({
    params,
}: {
    params: {
        language: Language;
        slug: string;
        path: string;
    };
}) {
    return <>{params.slug}</>;
}
