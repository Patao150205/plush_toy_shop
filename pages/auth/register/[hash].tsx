import { GetServerSideProps } from "next";
import React, { FC } from "react";
import { confirmCurrectHash } from "utils/auth";
import cookies from "js-cookie";
import style from "styles/pages/auth/register/[hash].module.scss";
import { Segment } from "semantic-ui-react";
import SecondaryButton from "components/UIkit/button/SecondaryButton";
import Head from "next/head";

const RegisterHash: FC<{ token: string }> = ({ token }) => {
  
    cookies.set("token", token);

  return (
    <>
      <Head>
        <title>Yuruhuwa ようこそ！</title>
      </Head>
      <Segment>
        <div className={style.root}>
          <img className={style.shopLogo} src="/shopLogo.jpg" />
          <div className={style.card}>
            <div className={style.content}>
              <h2>
                ようこそ！ ぬいぐるみショップ <span>Yuruhuwa</span>へ
              </h2>
              <div className="module-spacer--sm" />
              <p>店主のいぬまるです。</p>
              <p>かわいいぬいぐるみたちが、いっぱいいるよお！</p>
              <p>かわいいぬいぐるみたちを見て気分もハッピー😊</p>
              <p>楽しんでいってねえ！ ZZZZzzzzzzzzz.....</p>
              <div className="module-spacer--sm" />
              <div className={style.btnWrapper}>
                <SecondaryButton
                  content="OK"
                  onClick={() => {
                    window.location.href = '/';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Segment>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!ctx.params)
    return {
      redirect: {
        statusCode: 302,
        destination: "/login?attention=true",
      },
    };

  const hash = ctx.params.hash as string;
  const data = await confirmCurrectHash(hash);
  if (data.errMsg === "JsonWebTokenError") {
    return {
      redirect: {
        statusCode: 302,
        destination: "/login?attention=true",
      },
    };
  } else {
    return { props: { token: data.token } };
  }
};

export default RegisterHash;
