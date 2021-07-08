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
    <>
      <Menu size="large" borderless fixed="top" className={`${style.ui} ${style.menu}`}>
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
            <Icon
              style={{ marginLeft: "30px" }}
              name="bars"
              size="large"
              link={true}
              onClick={() => dispatch(SideToggle())}
            />
          </Menu.Item>
        </Container>
      </Menu>
    </>
  );
};

export default TopHeader;
