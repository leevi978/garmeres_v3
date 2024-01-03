import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { token } from "@/sanity/lib/fetch";

const PreviewProvider = dynamic(
    () => import("@/app/components/preview/preview-provider")
);

export default async function PreviewWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return draftMode().isEnabled ? (
        <PreviewProvider token={token}>{children}</PreviewProvider>
    ) : (
        <>{children}</>
    );
}
