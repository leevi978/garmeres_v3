import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex flex-row gap-4">
      <Image
        className="rounded flex my-auto"
        src="/garmeres-logo-small.png"
        alt=""
        width={70}
        height={70}
      />
      <span className="text-white my-auto text-3xl font-extralight">
        Garmeres
      </span>
    </div>
  );
}
