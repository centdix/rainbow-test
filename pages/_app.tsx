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
        <title>Directions - Next.js</title>
        <link rel="icon" href="/favicon.ico" />
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyABF6S20JPVTeR78NHd7htMhBJ6EBqP2PE&libraries=places"></script>
      </Head>
      <ManagedUIContext>
        <Component {...pageProps} />
      </ManagedUIContext>
    </>
  );
}

export default MyApp;
