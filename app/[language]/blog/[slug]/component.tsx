import PortableText from "@/app/components/sanity/portable-text";
import { SanityDocument } from "next-sanity";
import PageTextContainer from "@/app/components/layout/page-text-contianer";

export default function Component({ document }: { document: SanityDocument }) {
  return (
    <PageTextContainer>
      <h1>{document?.title}</h1>
      <PortableText value={document?.body} />
    </PageTextContainer>
  );
}
