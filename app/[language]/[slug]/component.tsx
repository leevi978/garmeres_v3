import PortableText from "@/app/components/sanity/portable-text";
import { SanityDocument } from "next-sanity";

export default function Component({ document }: { document: SanityDocument }) {
    return (
        <div>
            <h1>{document?.title}</h1>
            <PortableText value={document?.body} />
        </div>
    );
}
