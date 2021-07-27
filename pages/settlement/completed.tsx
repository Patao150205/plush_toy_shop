import { useRouter } from "next/router";
import React, { FC } from "react";
import style from "styles/pages/settlement/completed.module.scss";
import { Segment, Step } from "semantic-ui-react";
import Head from "next/head";
import ThirdryButton from "components/UIkit/button/ThirdryButton";

const Completed: FC = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Yuruhuwa 【ご注文完了】</title>
      </Head>
      <Segment>
        <div className="module-spacer--sm" />
        <h1 className={style.title}>ご注文完了</h1>
        <div className={`module-spacer--sm ${style.border}`} />
        <div className="module-spacer--sm" />
        <Step.Group style={{ display: "flex", maxWidth: "800px", width: "100%", margin: "0 auto" }} ordered>
          <Step>
            <Step.Content>
              <Step.Title>ご注文確認・決済</Step.Title>
            </Step.Content>
          </Step>
          <Step active>
            <Step.Content>
              <Step.Title>ご注文完了</Step.Title>
              <Step.Description>ご注文が完了いたしました。</Step.Description>
            </Step.Content>
          </Step>
        </Step.Group>
        <div className="module-spacer--xl" />
        <p className={style.message}>ご注文ありがとうございます🙇‍♂️</p>
        <div>
          <ThirdryButton content="購入履歴へ" onClick={() => router.push("/products/history")} />
        </div>
        <div className="module-spacer--xl" />
      </Segment>
    </>
  );
};

export default Completed;
