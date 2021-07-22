import React, { FC } from "react";
import Head from "next/head";
import { Segment, Step } from "semantic-ui-react";
import style from "styles/pages/settlement/index.module.scss";

const Settlement: FC = () => {
  return (
    <>
      <Head>
        <title>Yuruhuwa 【ご注文確認】</title>
      </Head>
      <Segment>
        <div className="module-spacer--sm" />
        <h1 className={style.title}>決済</h1>
        <div className={`module-spacer--sm ${style.border}`} />
        <div className="module-spacer--sm" />
        <Step.Group style={{ display: "flex", maxWidth: "800px", width: "100%", margin: "0 auto" }} ordered>
          <Step completed>
            <Step.Content>
              <Step.Title></Step.Title>
            </Step.Content>
          </Step>
          <Step>
            <Step.Content>
              <Step.Title>ご注文完了</Step.Title>
            </Step.Content>
          </Step>
        </Step.Group>
        <div className="module-spacer--sm" />
      </Segment>
    </>
  );
};

export default Settlement;
