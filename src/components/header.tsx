import Link from "next/link";
import type { VFC } from "react";
import { IconImage } from "src/components/Images";
import { Logo } from "src/components/logo";

export const Header: VFC = () => {
  return (
    <header className="bg-primary p-2 w-full">
      <Logo />
    </header>
  );
};
