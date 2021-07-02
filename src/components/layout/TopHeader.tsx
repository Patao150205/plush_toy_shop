import React, { FC } from "react";
import { Menu, Image, Header, Icon } from "semantic-ui-react";
import style from "./TopHeader.module.scss";
console.log(style);

type Props = {
  setSideVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const TopHeader: FC<Props> = ({ setSideVisible }) => {
  return (
    <>
      <Menu borderless fixed="top" className={`${style.menu} ${style.ui}`}>
        <Menu.Item>
          <Image size="mini" src="shopLogo.jpg" spaced="left" avatar inline />
        </Menu.Item>
        <Menu.Item fitted="horizontally">
          <Header className={`${style.ui} ${style.header}`} size="large">
            Yuruhuwa
          </Header>
        </Menu.Item>
        <Menu.Item position="right">
          <Icon name="bars" size="large" link={true} onClick={() => setSideVisible(true)} />
        </Menu.Item>
      </Menu>
    </>
  );
};

export default TopHeader;
