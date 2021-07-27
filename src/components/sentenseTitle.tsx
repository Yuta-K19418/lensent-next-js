import Link from "next/dist/client/link";
import type { VFC } from "react";
import type { SentenseData } from "src/pages/api/getAllSentensesData";

export const SentenseTitle: VFC<SentenseData> = (props) => {
  return (
    <div>
      <span>{props.sentense_id}</span>
      {"："}
      <Link href={`/sentenses/${props.sentense_id}`}>
        <span
          className="border-blue-500 cursor-pointer
          text-blue-500 border-b"
        >
          {props.title}
        </span>
      </Link>
    </div>
  );
};
