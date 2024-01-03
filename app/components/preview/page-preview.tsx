import { draftMode } from "next/headers";
import { LiveQuery } from "next-sanity/preview/live-query";
import { sanityFetch } from "@/sanity/lib/fetch";
import { ReactNode } from "react";
import { SanityDocument } from "next-sanity";

export default async function PagePreview({
    Component,
    Preview,
    query,
}: {
    Component: (props: any) => ReactNode;
    Preview: any;
    query: string;
}) {
    const data = await sanityFetch<SanityDocument>({ query });

    return (
        <LiveQuery
            enabled={draftMode().isEnabled}
            query={query}
            initialData={data}
            as={Preview}
        >
            <Component document={data} />
        </LiveQuery>
    );
}
