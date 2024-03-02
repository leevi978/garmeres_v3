import { ReactNode } from "react";

export default function PageTextContainer({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col w-[860px] mx-auto px-8 py-6 bg-white flex-grow">
      {children}
    </div>
  );
}
