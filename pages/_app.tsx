import React, { useEffect, useState } from "react";
import "styles/utils/reset.css";
import "semantic-ui-css/semantic.min.css";
import "styles/utils/global.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../src/stores/store";
import Head from "next/head";
import Layout from "components/layout/Layout";

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    console.log("patao");
  }, []);

  return (
    <>
      <Head>
        <title>読込中...</title>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.15.2/css/all.css"
          integrity="sha384-vSIIfh2YWi9wW0r9iZe7RJPrKwp6bG+s9QZMoITbCckVJqGCCRhc+ccxNcdpHuYu"
          crossOrigin="anonymous"></link>
      </Head>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
};

export default MyApp;
