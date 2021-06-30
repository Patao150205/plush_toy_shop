import React, { useEffect } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../src/stores/store";
import { GetServerSideProps } from "next";
import axios from "axios";

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {}, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

MyApp.getServerSideProps = async (ctx: any) => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/comments");
  console.log(res);
  console.log(ctx);
};

export default MyApp;
