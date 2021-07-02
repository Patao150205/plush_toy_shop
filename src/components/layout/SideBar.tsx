import React, { FC } from "react";
import { Sidebar, Menu, Segment, Icon, Header, Image } from "semantic-ui-react";

type Props = {
  setSideVisible: React.Dispatch<React.SetStateAction<boolean>>;
  sideVisible: boolean;
};

const SideBar: FC<Props> = ({ setSideVisible, sideVisible, children }) => {
  return (
    <>
      <Sidebar.Pushable as={Segment}>
        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          onHide={() => setSideVisible(false)}
          vertical
          visible={sideVisible}
          width="thin">
          <Menu.Item as="a">
            <Icon name="home" />
            Home
          </Menu.Item>
          <Menu.Item as="a">
            <Icon name="gamepad" />
            Games
          </Menu.Item>
          <Menu.Item as="a">
            <Icon name="camera" />
            Channels
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sideVisible}>{children}</Sidebar.Pusher>
      </Sidebar.Pushable>
    </>
  );
};

export default SideBar;
