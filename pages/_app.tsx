import React, { useEffect } from "react";
import "styles/utils/reset.css";
import "styles/utils/global.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../src/stores/store";

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    console.log("patao");
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
