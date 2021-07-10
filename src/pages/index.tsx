import { useUser } from "@auth0/nextjs-auth0";
import type { NextPage } from "next";
import { LoginButton } from "src/components/buttons";
import { TopImage } from "src/components/Images";
import { Layout } from "src/components/layout";

const Home: NextPage = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  else if (error) return <div>{error.message}</div>;

  if (user) return <Layout></Layout>;
  else
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
};

export default Home;
