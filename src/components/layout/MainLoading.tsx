import React, { FC } from "react";
import style from "./MainLoading.module.scss";
import { useAppSelector } from "../../stores/store";
import { loadingSelector } from "stores/settingSlice";

const MainLoading: FC = ({ children }) => {
  const isLoading = useAppSelector(loadingSelector);

  return (
    <>
      {isLoading ? (
        <>
          <div className={style.root}>
            <div className={style.wrapper}>
              <img src="MainLoading.gif" />
              <h1>よみこむちゅう...</h1>
            </div>
          </div>
          {children}
        </>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default MainLoading;
