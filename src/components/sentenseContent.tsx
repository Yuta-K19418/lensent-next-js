import type { VFC } from "react";
import type { SentenseData } from "src/types/sentense.type";

export const SentenseContent: VFC<SentenseData> = (props) => {
  return (
    <div>
      <h2>{props.title}</h2>
      <h4>{props.sentense}</h4>
    </div>
  );
};
