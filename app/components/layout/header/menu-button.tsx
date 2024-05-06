"use client";
import { Button, ButtonProps } from "react-aria-components";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineClose } from "react-icons/md";

export default function MenuButton(
  props: ButtonProps &
    React.RefAttributes<HTMLButtonElement> & { isOpen?: boolean }
) {
  return (
    <Button
      {...props}
      className={`${
        props.isOpen ? "text-black" : "text-white"
      } my-4 focus:outline-none`}
    >
      {props.isOpen ? (
        <MdOutlineClose size={35} />
      ) : (
        <RxHamburgerMenu size={35} />
      )}
    </Button>
  );
}
