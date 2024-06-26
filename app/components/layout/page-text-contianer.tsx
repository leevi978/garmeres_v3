import { ReactNode } from "react";

export default function PageTextContainer({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      className={`prose max-w-[1024px] flex flex-col w-full mx-auto px-6 md:px-12 xl:px-16 pt-16 pb-32 bg-white flex-grow h-full`}
    >
      {children}
    </div>
  );
}
