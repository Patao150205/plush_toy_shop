import React, { FC } from "react";
import TopHeader from "components/layout/TopHeader";
import SideBar from "components/layout/SideBar";
import MainLoading from "components/layout/MainLoading";
import style from "styles/pages/app.module.scss";
import Modal from "components/layout/Modal";

const Layout: FC = ({ children }) => {
  return (
    <>
      <TopHeader />

      <Modal
        status={"success"}
        title="エラー"
        message={
          "JavaScriptの基本的な概念としてオブジェクトがあります。オブジェクトは任意の数のプロパティがそれぞれ値を保持している構造です。もちろん、TypeScriptにはオブジェクトを表現するための型があります。これは、{ }の中にプロパティ名とその型を列挙するものです。"
        }>
        <MainLoading>
          <SideBar>
            <div className={style.wrapper}>{children}</div>
          </SideBar>
        </MainLoading>
      </Modal>
    </>
  );
};

export default Layout;
