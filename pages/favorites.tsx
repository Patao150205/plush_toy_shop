import { GetServerSideProps } from "next";
import React, { FC } from "react";
import { getFavoritesProduct } from "utils/favoritesAndCart";
import Head from "next/head";
import nookies from "nookies";
import { Segment } from "semantic-ui-react";
import style from "styles/pages/favorites.module.scss";
import ProductCard from "../src/components/products/ProductCard";
import { useAppSelector } from "../src/stores/store";
import { favoritesSelector } from "stores/userSlice";
import NoProduct from "./products/NoProduct";

type Props = {
  favorites: [
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
    }
  ];
};

const Favorites: FC<Props> = ({ favorites }) => {
  const FavoritesList = useAppSelector(favoritesSelector);
  return (
    <>
      <Head>
        <title>Yuruhuwa 【お気に入り】</title>
      </Head>
      <Segment>
        <h1 className={style.title}>お気に入り一覧</h1>
        <div className={`module-spacer--sm ${style.border}`} />
        <div className={`module-spacer--sm`} />
        {favorites.length === 0 && <NoProduct header="お気に入りに登録している商品がありません。" />}
        <div className={style.wrapper}>
          {favorites.map((ele) => (
            <ProductCard key={ele._id} favorites={FavoritesList} product={ele.product} />
          ))}
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
  const data = await getFavoritesProduct(token);
  console.log(data);
  if (data.errMsg === "JsonWebTokenError") {
    return {
      redirect: {
        statusCode: 302,
        destination: "/login",
      },
    };
  }
  return { props: { favorites: data } };
};

export default Favorites;
