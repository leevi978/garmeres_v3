import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const secret = req.headers.get("webhook-secret");
    if (!secret || secret !== process.env.SANITY_HOOK_SECRET) {
      return new Response("Unauthorized", { status: 401 });
    }
    revalidateTag("*");
    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
    });
  } catch (e: any) {
    console.error(e);
    return new Response(e.message, { status: 500 });
  }
}
