import { useUser } from "@auth0/nextjs-auth0";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect } from "react";
import useSWR from "swr";

import { Layout } from "../components/layout";
import { SentenseTitle } from "../components/sentenseTitle";
import { Sidebar } from "../components/sidebar";
import type { SentenseData } from "../types/sentense.type";

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
  const apiUrl = `${process.env.NEXT_PUBLIC_AUDIENCE}/sentenses/by-sub/${user?.sub}`;

  const { data, mutate } = useSWR(apiUrl, fetcher);

  useEffect(() => {
    mutate();
  }, [mutate]);

  if (isLoading) return <div>Loading...</div>;
  else if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <Layout>
        <div className="flex">
          <Sidebar />
          <div className="xl:ml-32 xl:w-4/5 xl:h-1/3">
            <ul>
              {data &&
                data.map((sentense: SentenseData) => {
                  return <SentenseTitle /*eslint-disable-line*/ sentenseData={sentense} sentenseDeleted={mutate} />;
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
