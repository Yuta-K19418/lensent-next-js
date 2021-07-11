import { useUser } from "@auth0/nextjs-auth0";
import type { NextPage } from "next";
import Link from "next/link";
import { EnrollSentenseButton } from "src/components/buttons";
import { Layout } from "src/components/layout";
import { Sidebar } from "src/components/sidebar";

import HttpPost from "./api/HttpPost";

const EnrollSentense: NextPage = () => {
  const { user, error, isLoading } = useUser();

  const handleSubmitData = (event: any) => {
    event.preventDefault();
    const postData = {
      title: event.target.title,
      sentense: event.target.sentense,
    };

    HttpPost(postData, "/sentense/");
  };

  if (isLoading) return <div>Loading...</div>;
  else if (error) return <div>{error.message}</div>;

  if (user)
    return (
      <Layout>
        <div className="flex">
          <Sidebar />
          <div className="xl:ml-32 xl:w-1/2 xl:h-1/3">
            <form onSubmit={handleSubmitData}>
              <label className="block mt-7 text-sm font-bold text-gray-700" htmlFor="title-label">
                タイトルを入力してください。
              </label>
              <input
                className="							focus:outline-none
  block mt-7 shadow appearance-none border
                rounded py-2 text-gray-700 leading-tight w-full"
                id="title"
                type="text"
                placeholder="Apple"
              />
              <label className="block mt-7 text-sm font-bold text-gray-700" htmlFor="sentense-label">
                英文を入力してください。
              </label>
              <input
                className="inline-block mt-7 shadow appearance-none
                border rounded py-32 text-gray-700 leading-tight
                w-full h-90	focus:outline-none align-text-top"
                id="sentense"
                type="text"
                placeholder="This is an apple."
              />
              <div className="mt-7 xl:w-full text-right">
                <EnrollSentenseButton />
              </div>
            </form>
          </div>
        </div>
      </Layout>
    );
  else return <Link href="/api/auth/login" />;
};

export default EnrollSentense;
