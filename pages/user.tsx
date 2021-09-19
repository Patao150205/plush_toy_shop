import { useRouter } from "next/router";
import React, { FC } from "react";
import { Segment, Button, Icon } from "semantic-ui-react";
import style from "styles/pages/user.module.scss";
import Head from "next/head";
import { GetServerSideProps } from "next";
import nookies from "nookies";
import { authToken } from "utils/auth";
import { logOut } from "utils/auth";
import { useAppSelector } from 'stores/store';
import { userInfoSelector } from 'stores/userSlice';

const User: FC = () => {
  const router = useRouter();
  const userInfo = useAppSelector(userInfoSelector);

  return (
    <>
      <Head>
        <title>Yuruhuwa 【ユーザー】</title>
      </Head>
      <div className={style.root}>
        <Segment>
          <h1>ユーザー</h1>
          <div className="module-spacer--xs" />
          <p>こんにちは!! {userInfo.nickname} さん</p>
          <div className={`module-spacer--xs ${style.border}`} />
          <div className="module-spacer--xs" />
          <h2>購入履歴</h2>
          <Button onClick={() => router.push("/products/history")}>
            <Icon name="sign-out" />
            購入履歴
          </Button>
          <h2>住所確認・登録・変更</h2>
          <Button onClick={() => router.push("/setting/address")}>
            <Icon name="address card outline" />
            住所確認・登録・変更
          </Button>
          <h2>ログアウト</h2>
          <Button onClick={logOut}>
            <Icon name="sign-out" />
            ログアウト
          </Button>
        </Segment>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = nookies.get(ctx).token;
  if (!token) {
    return {
      redirect: {
        statusCode: 302,
        destination: "/login?attention=true",
      },
    };
  }
  const data = await authToken(token);
  if (data.errMsg === "JsonWebTokenError") {
    return {
      redirect: {
        statusCode: 302,
        destination: "/login?attention=true",
      },
    };
  }

  return {
    props: {},
  };
};

export default User;
