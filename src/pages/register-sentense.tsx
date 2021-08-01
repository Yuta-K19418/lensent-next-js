import { useUser } from "@auth0/nextjs-auth0";
import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { RegisterSentenseButton } from "src/components/buttons";
import { Layout } from "src/components/layout";
import { Sidebar } from "src/components/sidebar";

const RegisterSentense: NextPage = () => {
  const { user, error, isLoading } = useUser();
  const [title, setTitle] = useState("");
  const [sentense, setSentense] = useState("");

  const handlePostSentenseData = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_AUDIENCE}/sentenses/`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json", //eslint-disable-line @typescript-eslint/naming-convention
        },
        body: `{
				"user": "${user?.sub}",
				"title": "${title}",
				"sentense": "${sentense}"
				}`,
      }).then((response) => {
        if (!response.ok) alert("Posting sentense data failed.");
        return response.json();
      });
    } catch (err) {
      alert(err);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  else if (error) return <div>{error.message}</div>;

  if (user)
    return (
      <Layout>
        <div className="flex">
          <Sidebar />
          <div className="xl:ml-32 xl:w-1/2 xl:h-1/3">
            <label className="block mt-7 text-sm font-bold text-gray-700" htmlFor="title-label">
              タイトルを入力してください。
            </label>
            <input
              className="focus:outline-none block mt-7 shadow appearance-none border
                rounded py-2 text-gray-700 leading-tight w-full"
              type="text"
              placeholder="Apple"
              onChange={(e) => /* eslint-disable-line */ {
                setTitle(e.target.value);
              }}
            />
            <label className="block mt-7 text-sm font-bold text-gray-700" htmlFor="sentense-label">
              英文を入力してください。
            </label>
            <input
              className="inline-block mt-7 shadow
                border rounded py-32 text-gray-700
                w-full h-90	focus:outline-none align-top break-words"
              type="text"
              placeholder="This is an apple."
              onChange={(e) => /* eslint-disable-line */ {
                setSentense(e.target.value);
              }}
            />
            <div className="mt-7 xl:w-full text-right" onClick={handlePostSentenseData} /*eslint-disable-line*/>
              <RegisterSentenseButton />
            </div>
          </div>
        </div>
      </Layout>
    );
  else return <Link href="/api/auth/login" />;
};

export default RegisterSentense;
