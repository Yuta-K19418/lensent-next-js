import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/dist/client/router";
import type { VFC } from "react";
import { useEffect } from "react";
import { useState } from "react";
import type { SentenseData } from "src/types/sentense.type";
import type { WordData } from "src/types/word.type";
import useSWR from "swr";

import { AddWordsButton } from "./buttons";

export const WordList: VFC<SentenseData> = (props) => {
  const { user } = useUser();
  const router = useRouter();
  const [words, setWords] = useState("");

  const fetcher = (url: string) => {
    return fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json", //eslint-disable-line @typescript-eslint/naming-convention
      },
    }).then((response) => {
      return response.json();
    });
  };
  const apiUrl = `${process.env.NEXT_PUBLIC_AUDIENCE}/words/by-sentense-id/${props.sentense_id}`;

  const { data, mutate } = useSWR(apiUrl, fetcher);

  useEffect(() => {
    mutate();
  }, [mutate]);

  const getSentenseId = () => {
    const { sentenseId } = router.query;
    return sentenseId as string;
  };

  const sentenseId = getSentenseId();

  const handleAddWords = async () => {
    const japaneseWords = await fetch(
      `${process.env.NEXT_PUBLIC_TRANSLATION_API_URL}?text=${words}&source=en&target=ja`,
      {
        method: "GET",
      }
    ).then((response) => {
      if (!response.ok) alert("Posting words failed.");
      return response.json();
    });

    await fetch(`${process.env.NEXT_PUBLIC_AUDIENCE}/words`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json", //eslint-disable-line @typescript-eslint/naming-convention
      },
      body: `{
      "en": "${words}",
      "ja": "${japaneseWords?.text}",
      "sentense_id": "${sentenseId}",
      "sub": "${user?.sub}"
      }`,
    }).then((response) => {
      if (!response.ok) alert("Posting words failed.");
      return response.json();
    });
  };

  return (
    <div className="py-10">
      <div className="container mx-auto bg-white dark:bg-gray-800 rounded shadow">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-stretch p-4 lg:p-8 w-full">
          <div className="flex flex-col lg:flex-row items-start lg:items-center">
            <div className="flex items-center">
              <a className="p-2 text-gray-600 dark:text-gray-400 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded border border-transparent focus:border-gray-800 cursor-pointer focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="cursor-pointer"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                  <line x1={16} y1={5} x2={19} y2={8} />
                </svg>
              </a>
              <a className="p-2 text-red-500 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded border border-transparent focus:border-gray-800 cursor-pointer focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="cursor-pointer"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <line x1={4} y1={7} x2={20} y2={7} />
                  <line x1={10} y1={11} x2={10} y2={17} />
                  <line x1={14} y1={11} x2={14} y2={17} />
                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </svg>
              </a>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-end items-start lg:items-center">
            <label className="block text-gray-600" htmlFor="word-label">
              覚えたい語句
            </label>
            <input
              className="inline-block shadow
                border rounded py-1 ml-3 text-gray-700
                focus:outline-none align-top break-words"
              type="text"
              placeholder="apple"
              onChange={(e) => /* eslint-disable-line */ {
                setWords(e.target.value);
              }}
            />
            <div className="ml-2" onClick={handleAddWords} /*eslint-disable-line*/>
              <AddWordsButton />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-end items-start lg:items-center">
            <div className="flex items-center py-3 lg:py-0 lg:px-6 lg:border-r lg:border-l border-gray-300 dark:border-gray-200">
              <ul>{data && <p className="text-base text-gray-600 dark:text-gray-400">{data.length} items</p>}</ul>
            </div>
          </div>
        </div>
        <div className="overflow-x-scroll xl:overflow-x-hidden w-full">
          <table className="min-w-full bg-white dark:bg-gray-800">
            <thead>
              <tr className="py-8 w-full h-16 border-b border-gray-300 dark:border-gray-200">
                <th className="pr-6 pl-8 text-sm font-normal tracking-normal leading-4 text-left text-gray-600 dark:text-gray-400">
                  <input
                    type="checkbox"
                    className="relative w-5 h-5 bg-white dark:bg-gray-800 rounded border border-gray-400 dark:border-gray-200 cursor-pointer outline-none" /*onclick="checkAll(this)"*/
                  />
                </th>
                <th className="pr-6 text-sm font-normal tracking-normal leading-4 text-left text-gray-600 dark:text-gray-400">
                  語句
                </th>
                <th className="pr-6 text-sm font-normal tracking-normal leading-4 text-left text-gray-600 dark:text-gray-400">
                  日本語訳
                </th>
              </tr>
            </thead>
            <tbody>
              <ul>
                {data &&
                  data.map((word: WordData) => {
                    return (
                      <tr className="h-24 border-b border-gray-300 dark:border-gray-200" key={word.word_id}>
                        <td className="pr-6 pl-8 text-sm tracking-normal leading-4 text-left text-gray-800 dark:text-gray-100">
                          <input
                            type="checkbox"
                            className="relative w-5 h-5 bg-white dark:bg-gray-800 rounded border border-gray-400 dark:border-gray-200 cursor-pointer outline-none" /*onclick="tableInteract(this)"*/
                          />
                        </td>
                        <td className="pr-6 text-sm tracking-normal leading-4 text-gray-800 dark:text-gray-100">
                          {word.en}
                        </td>
                        <details>
                          <summary>見る</summary>
                          <td className="pr-6 text-sm tracking-normal leading-4 text-gray-800 dark:text-gray-100">
                            {word.ja}
                          </td>
                        </details>
                      </tr>
                    );
                  })}
              </ul>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
