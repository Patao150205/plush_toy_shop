import React, { FC } from "react";
import { GetServerSideProps } from "next";
import nookies from "nookies";
import { getCartProduct } from "utils/favoritesAndCart";
import NoProduct from "../products/NoProduct";
import { Segment, Step } from "semantic-ui-react";
import ConfirmationCard from "components/settlement/ConfirmationCard";
import { loadStripe } from "@stripe/stripe-js";
import style from "styles/pages/settlement/confirmation.module.scss";
import { Elements } from "@stripe/react-stripe-js";
import PayForm from "components/settlement/PayForm";
import Head from "next/head";
import TotalPrice from "components/cart/TotalPrice";

type Props = {
  error: boolean;
  cart: [
    {
      product: {
        _id: string;
        name: string;
        productPic: string;
        primaryPic: string;
        price: number;
        productId: string;
        New: boolean;
        Hot: boolean;
        height: number;
        stock: number;
      };
      amount: number;
    }
  ];
  token: string;
};

const Confirmation: FC<Props> = ({ error, cart, token }) => {
  if (error) {
    return (
      <Segment>
        <NoProduct header="カート情報を取得できませんでした。" />;
      </Segment>
    );
  }

  const stripePromise = loadStripe(process.env.STRIPE_API_KEY as string);
  const eachPrice = cart.map((ele) => ele.product.price * ele.amount);
  const subTotal = eachPrice.reduce((prevSumPrice, currentPrice) => prevSumPrice + currentPrice, 0);

  return (
    <>
      <Head>
        <title>Yuruhuwa 【ご注文確認】</title>
      </Head>
      <Segment>
        <div className="module-spacer--sm" />
        <h1 className={style.title}>ご注文確認</h1>
        <div className={`module-spacer--sm ${style.border}`} />
        <div className="module-spacer--sm" />
        <Step.Group style={{ display: "flex", maxWidth: "800px", width: "100%", margin: "0 auto" }} ordered>
          <Step active>
            <Step.Content>
              <Step.Title>ご注文確認・決済</Step.Title>
              <Step.Description>ご注文内容をよくご確認ください。</Step.Description>
            </Step.Content>
          </Step>
          <Step>
            <Step.Content>
              <Step.Title>ご注文完了</Step.Title>
            </Step.Content>
          </Step>
        </Step.Group>
        <div className="module-spacer--xl" />
        <div className={style.root}>
          {cart.map((ele) => (
            <ConfirmationCard key={ele.product._id} product={ele.product} amount={ele.amount} />
          ))}
        </div>
        <div className="module-spacer--xl" />
        <div className={style.totalWrapper}>
          <TotalPrice subTotal={subTotal} btnContent="商品一覧に戻る" route="/" />
        </div>
        <div className="module-spacer--xl" />
        <Elements stripe={stripePromise}>
          <PayForm token={token} subTotal={subTotal} />
        </Elements>
        <div className="module-spacer--xl" />
      </Segment>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = nookies.get(ctx).token;

  const res = await getCartProduct(token);
  if (res.errMsg === "JsonWebTokenError") {
    return {
      redirect: {
        statusCode: 302,
        destination: "/login",
      },
    };
  }

  const error = res.err ? true : false;
  if (error) {
    return { props: { error, cart: [], token: "" } };
  } else {
    return { props: { error, cart: res.cart, token: res.updatedAt } };
  }
};

export default Confirmation;
