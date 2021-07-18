import React, { FC } from "react";
import { Menu, Image, Header, Container } from "semantic-ui-react";
import style from "./TopHeader.module.scss";
import { Color } from "styles/style";
import { useAppDispatch, useAppSelector } from "stores/store";
import { SideToggle } from "stores/settingSlice";
import { useRouter } from "next/router";
import { cartSelector, favoritesSelector } from "stores/userSlice";
import SearchProductInput from "../products/SearchProductInput";

const TopHeader: FC = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(favoritesSelector);
  const cart = useAppSelector(cartSelector);
  const router = useRouter();

  return (
    <div className={style.root}>
      <Menu size="large" borderless className={`${style.ui} ${style.menu} ${style.rainbow}`}>
        <Container>
          <Menu.Item onClick={() => router.push("/")}>
            <Image size="mini" src="/shopLogo.jpg" spaced="left" avatar inline />
          </Menu.Item>
          <Menu.Item onClick={() => router.push("/")} fitted="horizontally">
            <Header style={{ color: Color.secondary }} size="large">
              Yuruhuwa
            </Header>
          </Menu.Item>
          <Menu.Item position="right">
            <div className={style.search}>
              <SearchProductInput />
            </div>
          </Menu.Item>
          <Menu.Item fitted="horizontally">
            <i onClick={() => router.push("/user")} className={`fas fa-user ${style.icon} ${style.userIcon}`}></i>
          </Menu.Item>
          <Menu.Item fitted="horizontally">
            <i onClick={() => router.push("/favorites")} className={`fas fa-heart ${style.icon}`}></i>
            {favorites.length > 0 && (
              <span onClick={() => router.push("/favorites")} className={style.numberBatch}>
                {favorites.length}
              </span>
            )}
          </Menu.Item>
          <Menu.Item fitted="horizontally">
            <i onClick={() => router.push("/cart")} className={`fas fa-shopping-cart ${style.icon}`}></i>
            {cart.length > 0 && (
              <span onClick={() => router.push("/cart")} className={style.numberBatch}>
                {cart.length}
              </span>
            )}
          </Menu.Item>
          <Menu.Item fitted="horizontally">
            <i onClick={() => dispatch(SideToggle())} className={`fas fa-bars ${style.icon} ${style.barsIcon}`}></i>
          </Menu.Item>
        </Container>
      </Menu>
      <Menu className={`${style.ui} ${style.menu}`} compact pointing size="huge" widths="3" inverted>
        <Container>
          <Menu.Item name="TOP" link active={router.pathname === "/"} onClick={() => router.push("/")} />
          <Menu.Item
            name="PRODUCTS"
            link
            active={router.pathname === "/products"}
            onClick={() => router.push("/products")}
          />
          <Menu.Item
            name="CONTACT"
            link
            active={router.pathname === "/contact"}
            onClick={() => router.push("/contact")}
          />
        </Container>
      </Menu>
    </div>
  );
};

export default TopHeader;
