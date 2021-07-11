import React, { FC } from "react";
import { Menu, Image, Header, Icon, Container, Search } from "semantic-ui-react";
import style from "./TopHeader.module.scss";
import { Color } from "styles/style";
import { useAppDispatch } from "stores/store";
import { SideToggle } from "stores/settingSlice";
import { useRouter } from "next/router";

const TopHeader: FC = () => {
  const dispatch = useAppDispatch();
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
            <Search className={style.search} />
          </Menu.Item>
          <Menu.Item fitted="horizontally">
            <i className={`fas fa-user ${style.icon} ${style.userIcon}`}></i>
          </Menu.Item>
          <Menu.Item fitted="horizontally">
            <i className={`fas fa-heart ${style.icon}`}></i>
            <span className={style.numberBatch}>1</span>
          </Menu.Item>
          <Menu.Item fitted="horizontally">
            <i className={`fas fa-shopping-cart ${style.icon}`}></i>
            <span className={style.numberBatch}>5</span>
          </Menu.Item>
          <Menu.Item fitted="horizontally">
            <i className={`fas fa-bars ${style.icon} ${style.barsIcon}`}></i>
          </Menu.Item>
        </Container>
      </Menu>
      <Menu className={`${style.ui} ${style.menu}`} compact pointing size="huge" widths="4" inverted>
        <Container>
          <Menu.Item name="TOP" link active={router.pathname === "/"} onClick={() => router.push("/")} />
          <Menu.Item
            name="PRODUCTS"
            link
            active={router.pathname === "/products"}
            onClick={() => router.push("/products")}
          />
          <Menu.Item name="INFO" link active={router.pathname === "/info"} onClick={() => router.push("/info")} />
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
