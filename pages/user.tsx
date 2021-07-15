import ThirdryButton from "components/UIkit/button/ThirdryButton";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { Segment, Button, Icon } from "semantic-ui-react";
import style from "styles/pages/user.module.scss";
import Head from "next/head";

const User: FC = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Yuruhuwa 【ユーザー】</title>
      </Head>
      <div className={style.root}>
        <Segment>
          <h1>ユーザー</h1>
          <div className={`module-spacer--xs ${style.border}`} />
          <div className="module-spacer--xs" />
          <h2>住所登録</h2>
          <Button onClick={() => router.push("/setting/address")}>
            <Icon name="address card outline" />
            住所登録
          </Button>
          <h2>ログアウト</h2>
          <Button>
            <Icon name="sign-out" />
            ログアウト
          </Button>
        </Segment>
      </div>
    </>
  );
};

export default User;
