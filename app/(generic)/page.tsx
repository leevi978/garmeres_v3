import { permanentRedirect } from "next/navigation";
import { homeFullSlug } from "@/utils/slugs";
import { defaultLanguage } from "@/types/language";

export const dynamic = "force-dynamic";

export default function () {
  permanentRedirect(homeFullSlug[defaultLanguage]);
}
