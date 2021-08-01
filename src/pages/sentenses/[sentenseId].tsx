import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { BackButton } from "src/components/buttons";
import { Layout } from "src/components/layout";
import { SentenseContent } from "src/components/sentenseContent";
import { Sidebar } from "src/components/sidebar";
import { WordList } from "src/components/wordList";
import type { SentenseData } from "src/types/sentense.type";
import useSWR from "swr";

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
  const apiUrl = `${process.env.NEXT_PUBLIC_AUDIENCE}/sentenses/${sentenseId}/`;

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
