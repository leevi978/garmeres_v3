import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export function GET(request: NextRequest): void {
    const path: string | null = new URL(request.url).searchParams.get("path");
    draftMode().enable();
    redirect(`/${path ? path : ""}`);
}
