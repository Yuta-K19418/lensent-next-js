import { useUser } from "@auth0/nextjs-auth0";
import type { NextPage } from "next";

import { LoginButton, LogoutButton } from "../components/buttons";
import { TopImage } from "../components/images";
import { HomeImage } from "../components/images";
import { Layout } from "../components/layout";
import { Sidebar } from "../components/sidebar";

const Home: NextPage = () => {
  const { user, error, isLoading } = useUser();

  const postUserId = async () => {
    let shouldPostFlg = false;

    try {
      await fetch(`${process.env.NEXT_PUBLIC_AUDIENCE}/users/${user?.sub}`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json", //eslint-disable-line @typescript-eslint/naming-convention
        },
      }).then((response) => {
        if (!response.ok) shouldPostFlg = true;
        return response.json();
      });

      if (shouldPostFlg) {
        await fetch(`${process.env.NEXT_PUBLIC_AUDIENCE}/users`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json", //eslint-disable-line @typescript-eslint/naming-convention
          },
          body: JSON.stringify({ sub: user?.sub, name: user?.name }),
        }).then((response) => {
          return response.json();
        });
      }
    } catch (err) {
      alert(err);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  else if (error) return <div>{error.message}</div>;

  if (user) {
    postUserId();
    return (
      <Layout>
        <div className="flex">
          <Sidebar />
          <div className="mt-16 ml-32">
            <h1>こんにちは、{user.name}さん</h1>
            <HomeImage />
            <LogoutButton />
          </div>
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <div className="flex">
          <div className="mt-32 ml-20">
            <h1
              className="font-bold sm:text-2xl md:text-3xl lg:text-5xl
               lg:leading-normal xl:leading-relaxed
               xl:text-5xl md:font-extrabold mb-4 sm:leading-snug"
            >
              さあ、文章で英語を覚えよう。
            </h1>
            <p className="max-h-12 text-gray-800">
              LenSentは全ての英語学習者が文章で、効率的に英語学習サポートするサービスです。
            </p>
            <LoginButton />
          </div>
          <div className="flex">
            <TopImage />
          </div>
        </div>
      </Layout>
    );
  }
};

export default Home;
