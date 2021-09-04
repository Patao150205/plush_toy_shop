import React, { FC, useEffect } from "react";
import TopHeader from "components/layout/TopHeader";
import SideBar from "components/layout/SideBar";
import MainLoading from "components/layout/MainLoading";
import style from "styles/pages/app.module.scss";
import Modal from "components/layout/Modal";
import { useAppDispatch } from "stores/store";
import { fetchUserInfo } from "stores/userSlice";
import Footer from './Footer';

const Layout: FC = ({ children }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetch = async () => {
      dispatch(fetchUserInfo());
    };
    fetch();
  }, []);

  return (
    <>
      <TopHeader />

      <Modal>
        <MainLoading>
          <SideBar>
            <div className={style.wrapper}>{children}</div>
          </SideBar>
          <Footer />
        </MainLoading>
      </Modal>
    </>
  );
};

export default Layout;
