import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import useSWR from "swr";

import { BackButton } from "../../components/buttons";
import { Layout } from "../../components/layout";
import { SentenseContent } from "../../components/sentenseContent";
import { Sidebar } from "../../components/sidebar";
import { WordList } from "../../components/wordList";
import type { SentenseData } from "../../types/sentense.type";

const Sentense: NextPage = () => {
  const router = useRouter();

  const getSentenseId = () => {
    const { sentenseId } = router.query;
    return sentenseId as string;
  };

  const sentenseId = getSentenseId();
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
  const apiUrl = `${process.env.NEXT_PUBLIC_AUDIENCE}/sentenses/by-sentense-id/${sentenseId}`;

  const { data, mutate } = useSWR<SentenseData>(apiUrl, fetcher);

  useEffect(() => {
    mutate();
  }, []);

  if (!data) {
    return (
      <Layout>
        <div className="flex">
          <Sidebar />
          <span>...Loading</span>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex">
        <Sidebar />
        <div className="xl:ml-32 xl:w-2/3 xl:h-1/3">
          <SentenseContent /*eslint-disable-line*/
            sentense_id={data.sentense_id}
            title={data.title}
            sentense={data.sentense}
            user={data.user}
          />
          <WordList />
          <BackButton />
        </div>
      </div>
    </Layout>
  );
};

export default Sentense;
