import type { ReactNode, VFC } from "react";

import { Footer } from "./footer";
import { Header } from "./header";

export const Layout: VFC<{ children: ReactNode }> = (props) => {
  return (
    <div className="grid grid-rows-[auto,1fr,auto] min-h-screen">
      <Header />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
};
