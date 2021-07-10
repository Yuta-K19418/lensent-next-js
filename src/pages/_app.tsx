import "tailwindcss/tailwind.css";

import { UserProvider } from "@auth0/nextjs-auth0";
import type { AppProps } from "next/app";
import Head from "next/head";

const App = (props: AppProps) => {
  return (
    <UserProvider>
      <Head>
        <title>LenSent</title>
      </Head>
      <props.Component {...props.pageProps} />
    </UserProvider>
  );
};

export default App;
