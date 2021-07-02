import React, { useEffect, useState } from "react";
import "styles/utils/reset.css";
import "semantic-ui-css/semantic.min.css";
import "styles/utils/global.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../src/stores/store";
import TopHeader from "../src/components/layout/TopHeader";
import SideBar from "components/layout/SideBar";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [sideVisible, setSideVisible] = useState(false);

  useEffect(() => {
    console.log("patao");
  }, []);

  return (
    <Provider store={store}>
      <TopHeader setSideVisible={setSideVisible} />
      <SideBar setSideVisible={setSideVisible} sideVisible={sideVisible}></SideBar>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
