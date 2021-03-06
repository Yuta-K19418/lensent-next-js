import type { VFC } from "react";
import useSWR from "swr";

import type { SentenseData } from "../types/sentense.type";
import type { TranslationData } from "../types/translation.type";

export const SentenseContent: VFC<SentenseData> = (props) => {
  const fetcher = (url: string) => {
    return fetch(url, {
      method: "GET",
    }).then((response) => {
      return response.json();
    });
  };
  const apiUrlTitle = `${process.env.NEXT_PUBLIC_TRANSLATION_API_URL}?text=${props.title}&source=en&target=ja`;
  const apiUrlSentense = `${process.env.NEXT_PUBLIC_TRANSLATION_API_URL}?text=${props.sentense}&source=en&target=ja`;

  const { data: titleData } = useSWR<TranslationData>(apiUrlTitle, fetcher);
  const { data: sentenseData } = useSWR<TranslationData>(apiUrlSentense, fetcher);

  return (
    <div className="py-4 px-8 my-12 xl:w-full bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-800">{props.title.replace(/\r?<br>/g, "\n")}</h2>
      <p className="mt-2 text-gray-600">{props.sentense.replace(/\r?<br>/g, "\n")}</p>
      <details>
        <summary>日本語訳</summary>
        <h2 className="text-3xl font-semibold text-gray-800">{titleData?.text.replace(/\r?<br>/g, "\n")}</h2>
        <p className="mt-2 text-gray-600">{sentenseData?.text.replace(/\r?<br>/g, "\n")}</p>
      </details>
    </div>
  );
};
