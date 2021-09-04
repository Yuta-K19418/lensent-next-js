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
  const [word, setWord] = useState("");

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
      `${process.env.NEXT_PUBLIC_TRANSLATION_API_URL}?text=${word}&source=en&target=ja`,
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
      "en": "${word}",
      "ja": "${japaneseWords?.text}",
      "sentense_id": "${sentenseId}",
      "sub": "${user?.sub}"
      }`,
    }).then((response) => {
      if (!response.ok) alert("Posting words failed.");
      return response.json();
    });
  };

  const handleDeleteWord = async (word: WordData) => {
    await fetch(`${process.env.NEXT_PUBLIC_AUDIENCE}/words/${word.word_id}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json", //eslint-disable-line @typescript-eslint/naming-convention
      },
    }).then((response) => {
      return response.json();
    });
  };

  return (
    <div className="py-10">
      <div className="container mx-auto bg-white dark:bg-gray-800 rounded shadow">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-stretch p-4 lg:p-8 w-full">
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
                setWord(e.target.value);
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
          <table className="min-w-full bg-white dark:bg-gray-800 table-auto">
            <thead>
              <tr className="flex py-8 w-full h-16 border-b border-gray-300 dark:border-gray-200">
                <th className="flex justify-center w-1/3 text-sm text-gray-600 dark:text-gray-400">語句</th>
                <th className="flex justify-center w-1/3 text-sm text-gray-600 dark:text-gray-400">日本語訳</th>
                <th className="flex justify-center w-1/3 text-sm text-gray-600 dark:text-gray-400">覚えたらCHEKCK♪</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((word: WordData) => {
                  return (
                    <tr className="py-8 w-full h-16 border-b border-gray-300 dark:border-gray-200" key={word.word_id}>
                      <div className="flex w-full">
                        <td className="flex justify-center items-center w-1/3 text-sm text-center text-gray-800 dark:text-gray-100 align-middle">
                          {word.en}
                        </td>
                        <div className="justify-center mt-5 w-1/3 text-center ">
                          <details>
                            <summary>訳を確認する</summary>
                            <td className="justify-center pl-32 text-sm text-center text-gray-800 dark:text-gray-100">
                              {word.ja}
                            </td>
                          </details>
                        </div>
                        <td className="w-1/3">
                          <a className="text-blue-500 rounded border border-transparent focus:border-gray-800 cursor-pointer focus:outline-none">
                            <div className="pl-16">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 hover:bg-gray-200 rounded focus:border-gray-800 cursor-pointer"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                onClick={handleDeleteWord.bind(this, word)}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </div>
                          </a>
                        </td>
                      </div>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
