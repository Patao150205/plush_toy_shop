import { GetServerSideProps } from "next";
import React, { FC } from "react";
import { getCartProduct } from "utils/favoritesAndCart";
import Head from "next/head";
import nookies from "nookies";
import { Segment } from "semantic-ui-react";
import style from "styles/pages/cart.module.scss";
import { useAppSelector } from "../src/stores/store";
import { favoritesSelector } from "stores/userSlice";
import NoProduct from "./products/NoProduct";
import ThirdryButton from "components/UIkit/button/ThirdryButton";
import CartCard from "components/cart/CartCard";

type Props = {
  cart: [
    {
      _id: string;
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
      };
      amount: number;
    }
  ];
};

const Favorites: FC<Props> = ({ cart }) => {
  const FavoritesList = useAppSelector(favoritesSelector);

  const handleSettlement = () => {};

  return (
    <>
      <Head>
        <title>Yuruhuwa 【お気に入り】</title>
      </Head>
      <Segment>
        <h1 className={style.title}>カート</h1>
        <div className={style.wrapper}>
          <div className="module-spacer--md" />
          {cart.length === 0 && <NoProduct />}
          <div className={style.products}>
            {cart.map((ele) => (
              <CartCard key={ele._id} />
            ))}
          </div>
          <div className={style.totalPrice}>
            <div className="module-spacer--md" />
            <p>小計 4899円(税込)</p>
            <p>送料 +780円</p>
            <p>合計 5800円(税込)</p>
            <ThirdryButton content="" onClick={handleSettlement} />
          </div>
        </div>
      </Segment>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = nookies.get(ctx).token;
  if (!token) {
    return {
      redirect: {
        statusCode: 302,
        destination: "/login",
      },
    };
  }
  const data = await getCartProduct(token);
  if (data.errMsg === "認証情報が無効です。") {
    return {
      redirect: {
        statusCode: 302,
        destination: "/login",
      },
    };
  }
  return { props: { cart: data } };
};

export default Favorites;
