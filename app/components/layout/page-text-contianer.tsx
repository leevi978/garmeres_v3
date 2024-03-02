import { ReactNode } from "react";

export default function PageTextContainer({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col max-w-[1024px] w-full mx-auto px-8 py-16 bg-white flex-grow h-full">
      {children}
    </div>
  );
}
