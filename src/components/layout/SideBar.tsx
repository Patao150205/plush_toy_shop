import React, { FC } from "react";
import {} from "semantic-ui-react";
import style from "./SideBar.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";
import classNames from "classnames";
import { useAppSelector } from "../../stores/store";
import { useAppDispatch } from "stores/store";
import { SideToggle } from "stores/settingSlice";

const SideBar: FC = ({ children }) => {
  const hasSide = useAppSelector((state) => state.setting.hasSide);
  const dispatch = useAppDispatch();

  const router = useRouter();
  return (
    <>
      {children}
      <div className={classNames(style.root, { [style.active]: hasSide })} onClick={() => dispatch(SideToggle())}>
        <div className={style.left}></div>
        <div className={style.right}>
          <div className={style.sidebar}>
            <ul>
              <li className={style.menuItem} onClick={() => router.push("/")}>
                <i className="fas fa-home"></i>
                <p className={style.menuText}>HOME</p>
              </li>
              <li className={style.menuItem} onClick={() => router.push("/login")}>
                <p className={style.menuText}>LOGIN</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
