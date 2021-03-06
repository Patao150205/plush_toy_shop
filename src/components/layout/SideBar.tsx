import React, { FC } from "react";
import style from "./SideBar.module.scss";
import { useRouter } from "next/router";
import classNames from "classnames";
import { useAppSelector } from "../../stores/store";
import { useAppDispatch } from "stores/store";
import { sideSelector, SideToggle } from "stores/settingSlice";
import { logOut } from "utils/auth";
import { userInfoSelector, favoritesSelector, cartSelector } from "stores/userSlice";

const SideBar: FC = ({ children }) => {
  const hasSide = useAppSelector(sideSelector);
  const favoritesLen = useAppSelector(favoritesSelector).length;
  const cartLen = useAppSelector(cartSelector).length;
  const userInfo = useAppSelector(userInfoSelector);
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
                <p className={style.menuText}>TOP</p>
              </li>
              <li className={style.menuItem} onClick={() => router.push("/user")}>
                <p className={style.menuText}>USER</p>
              </li>
              <li className={style.menuItem} onClick={() => router.push("/favorites")}>
                <p className={style.menuText}>
                  FAVORITES<span className={favoritesLen ? style.icon : style.noIcon}>{favoritesLen}</span>
                </p>
              </li>
              <li className={style.menuItem} onClick={() => router.push("/cart")}>
                <p className={style.menuText}>
                  CART<span className={cartLen ? style.icon : style.noIcon}>{cartLen}</span>
                </p>
              </li>
              {userInfo.role === "root" && (
                <>
                  <li className={style.menuItem} onClick={() => router.push("/products?root=root")}>
                    <p className={style.menuText}>PRODUCTS(????????????)</p>
                  </li>
                  <li className={style.menuItem} onClick={() => router.push("/products/register")}>
                    <p className={style.menuText}>???????????????</p>
                  </li>
                  <li className={style.menuItem} onClick={() => router.push("/products/order")}>
                    <p className={style.menuText}>???????????????</p>
                  </li>
                </>
              )}
              <li className={style.menuItem} onClick={() => router.push("/login")}>
                <p className={style.menuText}>LOGIN</p>
              </li>
              <li className={style.menuItem} onClick={logOut}>
                <p className={style.menuText}>LOGOUT</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
