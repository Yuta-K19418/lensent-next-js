import Image from "next/image";
import type { VFC } from "react";

import Top from "../../public/Innovation_Isometric.svg";
import Icon from "../../public/logo.png";
import Home from "../../public/Startup_Two_Color.svg";

export const IconImage: VFC = () => {
  return (
    <>
      <Image src={Icon} alt="" width="70" height="70" />
    </>
  );
};

export const TopImage: VFC = () => {
  return (
    <>
      <Image src={Top} alt="" width="500" height="500" />
    </>
  );
};

export const HomeImage: VFC = () => {
  return (
    <>
      <Image src={Home} alt="" width="500" height="500" />
    </>
  );
};
