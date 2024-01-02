import { generateStaticSlugParams } from "@/app/navigation/slug";
import { Language } from "@/types/language";
import { getDocument } from "@/services/sanity-service";
import PortableText from "@/app/components/sanity/portable-text";

const schemaType = "blog-post";

export const generateStaticParams = () => generateStaticSlugParams(schemaType);

export const dynamicParams = false;

export default async function Page({
    params,
}: {
    params: {
        language: Language;
        slug: string;
    };
}) {
    const document = await getDocument({ schemaType, ...params });
    return (
        <div>
            <h1>{document.title}</h1>
            <PortableText value={document.body} />
        </div>
    );
}
