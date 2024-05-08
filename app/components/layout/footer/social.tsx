import { ReactNode } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

function A({
  url,
  children,
  label,
}: {
  url: string;
  children: ReactNode;
  label: string;
}) {
  return (
    <a
      aria-label={label}
      href={url}
      rel="nofollow"
      target="_blank"
      className="text-white"
    >
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
      <A url={facebook} label="Facebook">
        <FaFacebook size={28} />
      </A>
      <A url={instagram} label="Instagram">
        <FaInstagram size={30} />
      </A>
    </div>
  );
}
