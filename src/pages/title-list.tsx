import { useUser } from "@auth0/nextjs-auth0";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect } from "react";
import { Layout } from "src/components/layout";
import { SentenseTitle } from "src/components/sentenseTitle";
import { Sidebar } from "src/components/sidebar";
import type { SentenseData } from "src/types/sentense.type";
import useSWR from "swr";

const TitleList: NextPage = () => {
  const { user, error, isLoading } = useUser();

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
  const apiUrl = `${process.env.NEXT_PUBLIC_AUDIENCE}/sentenses/?user=${user?.sub}`;

  const { data, mutate } = useSWR(apiUrl, fetcher);

  useEffect(() => {
    mutate();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  else if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <Layout>
        <div className="flex">
          <Sidebar />
          <div className="xl:ml-32 xl:w-1/2 xl:h-1/3">
            <ul>
              {data &&
                data.map((sentense: SentenseData) => {
                  return (
                    <SentenseTitle /*eslint-disable-line*/
                      sentense_id={sentense.sentense_id}
                      title={sentense.title}
                      sentense={sentense.sentense}
                      user={sentense.user}
                    />
                  );
                })}
            </ul>
          </div>
        </div>
      </Layout>
    );
  } else {
    return <Link href="/api/auth/login" />;
  }
};

export default TitleList;
