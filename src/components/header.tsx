import type { VFC } from "react";

import { Logo } from "./logo";

export const Header: VFC = () => {
  return (
    <header className="p-2 w-full bg-primary">
      <Logo />
    </header>
  );
};
