import React, { FC } from "react";
import style from "./MainLoading.module.scss";
import { useAppSelector } from "../../stores/store";

const MainLoading: FC = ({ children }) => {
  const setting = useAppSelector((state) => state.setting);

  return (
    <>
      {setting.isLoading ? (
        <div className={style.root}>
          <div className={style.wrapper}>
            <img src="MainLoading.gif" />
            <h1 className={style.loadingMsg}>よみこむちゅう...</h1>
          </div>
          {children}
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default MainLoading;
