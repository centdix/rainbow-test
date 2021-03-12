import "../styles/globals.css";
import Head from "next/head";
import { ManagedUIContext } from "@components/context";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ManagedUIContext>
        <Component {...pageProps} />
      </ManagedUIContext>
    </>
  );
}

export default MyApp;
