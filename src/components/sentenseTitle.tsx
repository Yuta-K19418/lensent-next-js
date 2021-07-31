import Link from "next/dist/client/link";
import type { VFC } from "react";
import type { SentenseData } from "src/types/sentense.type";

export const SentenseTitle: VFC<SentenseData> = (props) => {
  return (
    <div className="flex flex-col justify-around p-4 m-2 w-96 h-96 rounded shadow-2xl bg-yellow-400 border-box">
      <p className="my-4 text-2xl font-bold uppercase">{props.title}</p>
      <p className="text-sm text-gray-900 uppercase">Difficulty: Medium</p>
      <div className="flex flex-row">
        <Link href={`/sentenses/${props.sentense_id}`}>
          <a className="py-2 px-4 text-sm font-bold text-gray-900 uppercase rounded bg-yellow-700">Read More</a>
        </Link>
      </div>
    </div>
  );
};
