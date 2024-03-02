"use client";
import { Button, ButtonProps } from "react-aria-components";
import { RxHamburgerMenu } from "react-icons/rx";

export default function MenuButton(
  props: ButtonProps & React.RefAttributes<HTMLButtonElement>
) {
  return (
    <Button
      {...props}
      className="text-white my-auto focus:outline-white focus:outline-double"
    >
      <RxHamburgerMenu size={35} />
    </Button>
  );
}
