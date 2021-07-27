import React, { FC } from "react";
import style from "styles/pages/auth/register/[hash].module.scss";
import { Segment } from "semantic-ui-react";
import SecondaryButton from "../src/components/UIkit/button/SecondaryButton";
import { useRouter } from "next/router";

const Test: FC = () => {
  const router = useRouter();
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

export default Test;
