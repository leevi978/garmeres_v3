import { ReactNode } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

function A({ url, children }: { url: string; children: ReactNode }) {
  return (
    <a href={url} rel="nofollow" target="_blank" className="text-white">
      {children}
    </a>
  );
}

export default function Social({
  facebook,
  instagram,
}: {
  facebook: string;
  instagram: string;
}) {
  return (
    <div className="flex flex-row gap-8 justify-center">
      <A url={facebook}>
        <FaFacebook size={28} />
      </A>
      <A url={instagram}>
        <FaInstagram size={30} />
      </A>
    </div>
  );
}
