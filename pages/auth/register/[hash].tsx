import { GetServerSideProps } from "next";
import React, { FC, useEffect, useRef } from "react";
import { confirmCurrectHash } from "utils/auth";
import cookies from "js-cookie";
import style from "styles/pages/auth/register/[hash].module.scss";
import { Segment } from "semantic-ui-react";
import { ModalOpen } from "stores/settingSlice";
import { useAppDispatch } from "stores/store";
import SecondaryButton from "components/UIkit/button/SecondaryButton";
import { useRouter } from "next/router";

const RegisterHash: FC<{ token: string }> = ({ token }) => {
  cookies.set("token", token);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isFirstRender = useRef(true);

  return (
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
                  router.push("/");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Segment>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!ctx.params)
    return {
      redirect: {
        statusCode: 302,
        destination: "/login",
      },
    };

  const hash = ctx.params.hash as string;
  const res = await confirmCurrectHash(hash);
  if (res.error) {
    return {
      redirect: {
        statusCode: 302,
        destination: "/login",
      },
    };
  } else {
    return { props: { token: res.token } };
  }
};

export default RegisterHash;
