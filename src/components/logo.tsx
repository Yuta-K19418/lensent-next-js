import type { VFC } from "react";
import { IconImage } from "src/components/Images";

export const Logo: VFC = () => {
  return (
    <div className="flex flex-1 px-7 ml-5">
      <IconImage />
      <div
        className="flex flex-1 text-xl font-bold text-white
    			self-auto pt-5"
      >
        LenSent
      </div>
    </div>
  );
};
