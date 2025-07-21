import React from "react";
import App from "next/app";
import Head from "next/head";
import { NRFlowContextProvider } from "../components/NRFlowContext";

class MyApp extends App {
  // Do not implement a getInitialProps method in this class

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&family=Open+Sans&family=Source+Sans+Pro&display=swap"
            rel="stylesheet"
          />
        </Head>
        <style jsx global>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: "Open Sans", sans-serif;
          }
          a {
            color: inherit;
            text-decoration: none; /* no underline */
          }
        `}</style>

        <NRFlowContextProvider>
          <Component {...pageProps} />
        </NRFlowContextProvider>
      </>
    );
  }
}

export default MyApp;
