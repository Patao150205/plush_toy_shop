import { useRouter } from "next/router";
import React, { FC } from "react";
import { Segment, Button, Icon } from "semantic-ui-react";
import style from "styles/pages/user.module.scss";
import Head from "next/head";
import { GetServerSideProps } from "next";
import nookies from "nookies";
import { authToken } from "utils/auth";

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
          <h2>住所確認・登録・変更</h2>
          <Button onClick={() => router.push("/setting/address")}>
            <Icon name="address card outline" />
            住所確認・登録・変更
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = nookies.get(ctx).token;
  const data = await authToken(token);
  if (data.errMsg === "JsonWebTokenError") {
    return {
      redirect: {
        statusCode: 302,
        destination: "/login",
      },
    };
  }

  return {
    props: {},
  };
};

export default User;
