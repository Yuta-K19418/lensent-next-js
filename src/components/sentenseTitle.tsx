import Link from "next/dist/client/link";
import type { VFC } from "react";
import type { SentenseData } from "src/types/sentense.type";

interface Props {
  sentenseData: SentenseData;
  sentenseDeleted: any;
}

export const SentenseTitle: VFC<Props> = (props) => {
  const handleDeleteSentense = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_AUDIENCE}/sentenses/${props.sentenseData.sentense_id}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json", //eslint-disable-line @typescript-eslint/naming-convention
        },
      }).then((response) => {
        return response.json();
      });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="grid grid-cols-3 place-items-auto w-full bg-gray-200 h-30">
      <div className="flex flex-col justify-around p-4 m-2 w-72 h-72 bg-blue-400 rounded shadow-2xl border-box">
        <p className="my-4 text-2xl font-bold uppercase">{props.sentenseData.title}</p>
        <div className="flex flex-row">
          <Link href={`/sentenses/${props.sentenseData.sentense_id}`}>
            <a className="py-2 px-4 text-sm font-bold text-white uppercase bg-blue-700 rounded">Read More</a>
          </Link>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={handleDeleteSentense}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
