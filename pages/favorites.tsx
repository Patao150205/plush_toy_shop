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
        {favorites.length === 0 && <NoProduct />}
        <div className={style.wrapper}>
          {favorites.map((ele) => (
            <ProductCard
              favorites={FavoritesList}
              key={ele.product._id}
              name={ele.product.name}
              price={ele.product.price}
              productId={ele.product._id}
              productPic={ele.product.primaryPic}
              isNew={ele.product.New}
              isHot={ele.product.Hot}
              height={ele.product.height}
            />
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
  if (data.errMsg) {
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
