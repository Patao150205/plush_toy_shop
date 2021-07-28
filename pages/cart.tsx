import { GetServerSideProps } from "next";
import React, { FC, useState, useEffect, useRef } from "react";
import { getCartProduct } from "utils/favoritesAndCart";
import Head from "next/head";
import nookies from "nookies";
import { Segment } from "semantic-ui-react";
import style from "styles/pages/cart.module.scss";
import { useAppDispatch, useAppSelector } from "../src/stores/store";
import { cartSelector, updateCart } from "stores/userSlice";
import NoProduct from "./products/NoProduct";
import CartCard from "components/cart/CartCard";
import TotalPrice from "components/cart/TotalPrice";

type Props = {
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
      _id: string;
    }
  ];
};

const Cart: FC<Props> = ({ cart }) => {
  // cartはサーバサイドレンダリング FavoritesListはReduxから
  const CartList = useAppSelector(cartSelector);
  const dispatch = useAppDispatch();
  const [subTotal, setSubTotal] = useState(0);
  let initialValue: { [_id: string]: number } = {};

  for (const ele of cart) {
    initialValue = { ...initialValue, [ele.product._id]: ele.amount };
  }

  const [counts, setCounts] = useState<{ [_id: string]: number }>(initialValue);
  const renderedFirst = useRef(false);

  // 削除されていない存在する商品たち
  const ExistProducts = cart.filter((ele) =>
    CartList.some((prod: { _id: string; product: string }) => prod.product === ele.product._id)
  );

  useEffect(() => {
    // 数量指定用(初回)
    let initialValue = {};
    ExistProducts.forEach((ele) => {
      const v = { [ele.product._id]: ele.amount };
      initialValue = { ...initialValue, ...v };
    });
    setCounts(initialValue);
  }, [CartList]);

  useEffect(() => {
    // それぞれの商品合計
    if (renderedFirst.current) {
      if (ExistProducts.length > 0) {
        const eachPrice = ExistProducts.map((prod) => {
          return prod.product.price * counts?.[prod.product._id];
        });
        // // 小計
        const sum = eachPrice.reduce((accummulator, currentValue) => accummulator + currentValue, 0);
        setSubTotal(sum);
      }
    }
  }, [counts]);

  useEffect(() => {
    const Cart = cart.map((ele) => {
      return { _id: ele._id, amount: ele.amount, product: ele.product._id };
    });
    dispatch(updateCart(Cart));
    renderedFirst.current = true;
  }, []);

  return (
    <>
      <Head>
        <title>Yuruhuwa 【お気に入り】</title>
      </Head>
      <Segment>
        <h1 className={style.title}>カート</h1>
        <div className={`module-spacer--sm ${style.border}`} />
        <div className={`module-spacer--sm`} />
        <p className={style.info}>
          3000円以上お買い上げで<span>送料無料！</span>
        </p>
        <p className={style.info}>
          ショッピングカートの有効期限お客様が商品を入れてから<span>60分</span>となります。
        </p>
        {CartList.length === 0 ? (
          <NoProduct header="カートの中に商品がありません。" />
        ) : (
          <div className={style.wrapper}>
            <div className={style.products}>
              {cart.map((ele) => {
                // 削除した場合にReduxと差異がなくなるように判定を挟む、
                const isExist = CartList.some(
                  (prod: { _id: string; product: string }) => prod.product === ele.product._id
                );
                if (isExist)
                  return (
                    <CartCard
                      key={ele.product._id}
                      counts={counts}
                      setCounts={setCounts}
                      product={ele.product}
                      amount={ele.amount}
                    />
                  );
              })}
            </div>
            <div className={style.totalPriceWrapper}>
              <TotalPrice subTotal={subTotal} btnContent="ご購入手続きをする" route="/settlement/confirmation" />
            </div>
          </div>
        )}
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
        destination: "/login?attention=true",
      },
    };
  }
  const data = await getCartProduct(token);
  if (data.errMsg === "JsonWebTokenError") {
    return {
      redirect: {
        statusCode: 302,
        destination: "/login?attention=true",
      },
    };
  }

  return { props: { cart: data.cart } };
};

export default Cart;
