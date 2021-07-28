import { GetServerSideProps } from "next";
import React, { FC, useState } from "react";
import { getProduct, getStockList } from "utils/products";
import style from "styles/pages/product/[product].module.scss";
import ProductSlide from "components/product/ProductSlide";
import NoProduct from "../products/NoProduct";
import { Segment } from "semantic-ui-react";
import Head from "next/head";
import ThirdryButton from "../../src/components/UIkit/button/ThirdryButton";
import { useAppDispatch, useAppSelector } from "stores/store";
import {
  favoritesSelector,
  cartSelector,
  registFavorite,
  deleteFavorite,
  registCart,
  deleteCart,
  userInfoSelector,
} from "stores/userSlice";
import Link from "next/link";

type Props = {
  data: {
    product: {
      _id: string;
      category: string;
      description: string;
      width: number;
      height: number;
      deepth: number;
      name: string;
      Hot: boolean;
      New: boolean;
      price: number;
      primaryPic: string;
      productPic: string[];
      stock: number;
      updatedAt: string;
      createdAt: string;
      isRelease: boolean;
    };
    totalStock: number;
  };
};

const ProductId: FC<Props> = ({ data }) => {
  const { product } = data;
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(favoritesSelector);
  const cart = useAppSelector(cartSelector);
  const userInfo = useAppSelector(userInfoSelector);
  const { role } = userInfo;

  const isFavorite = favorites.find((ele: { _id: string; product: string }) => ele.product === data.product._id);
  const hasCart = cart.find(
    (ele: { _id: string; product: string; amount: number }) => ele.product === data.product._id
  );

  // セレクトボックスの値
  const [amount, setAmount] = useState("1");

  // 現在の在庫数
  const [totalStock, setTotalStock] = useState<number>(data.totalStock);
  const title = `Yuruhuwa 【${product.name}】` ?? "商品情報";

  // 個数指定
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setAmount(value);
  };
  // お気に入り機能
  const handleLike = async (productId: string) => {
    if (!isFavorite) {
      dispatch(registFavorite(productId));
    } else {
      dispatch(deleteFavorite(productId));
    }
  };

  //カート機能
  const handleCart = async (productId: string) => {
    if (!hasCart) {
      await dispatch(registCart({ productId, amount: parseInt(amount) || 0 }));
      const stockList = await getStockList(productId);
      setTotalStock(stockList.totalStock);
    } else {
      await dispatch(deleteCart(productId));
      const stockList = await getStockList(productId);
      setTotalStock(stockList.totalStock);
    }
  };

  if (!data.product) {
    return <NoProduct />;
  }

  console.log(hasCart);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={style.root}>
        <div className={style.swiperWrapper}>
          <ProductSlide productPic={product.productPic} primaryPic={product.primaryPic} />
        </div>
        <div className={style.detail}>
          <Segment>
            <h1>
              {role === "root" &&
                (product.isRelease ? (
                  <span className={`${style.release} ${style.mark}`}></span>
                ) : (
                  <span className={`${style.keep} ${style.mark}`}></span>
                ))}
              {product.name}
            </h1>
            <p className={style.desc}>{product.description}</p>
            <div className={`module-spacer--xs ${style.divider}`} />
            <div className={`module-spacer--sm`} />
            <div className={style.statusWrapper}>
              <h3>商品詳細</h3>
              <div className={style.status}>
                <p>カテゴリー: {product.category}</p>
                <p>高さ &nbsp; : {product.height}cm</p>
                <p>横幅 &nbsp; : {product.height}cm</p>
                <p>奥行き: {product.height}cm</p>
              </div>
            </div>
            <div className={"module-spacer--sm"} />
            <p className={style.price}>{product.price}円(税込)</p>
            {totalStock > 0 ? (
              <>
                <div className={style.amountWrapper}>
                  <p className={style.sum}>
                    合計 <span>{product.price * parseInt(amount) || 0}円(税込)</span>
                  </p>{" "}
                  <p className={style.countLabel}>
                    数量 :&nbsp;&nbsp;
                    <select value={amount} onChange={handleChange} required>
                      {new Array(totalStock).fill(undefined).map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                    体
                  </p>
                </div>
                <p className={style.stock}>
                  <span>{totalStock}</span>体在庫がございます。
                </p>
              </>
            ) : (
              <>
                <h1 className="u-text--center">在庫がありません🙇</h1>
              </>
            )}

            <div className={"module-spacer--sm"} />

            {!userInfo._id && (
              <div>
                <p className="u-text--emphasis">お気に入り、カート機能を使用するには、ログインが必要です。</p>
                <Link href="/login">
                  <a>ログインページへ</a>
                </Link>
              </div>
            )}
            {userInfo._id &&
              product.isRelease &&
              (!isFavorite ? (
                <ThirdryButton
                  width="100%"
                  onClick={() => {
                    handleLike(product._id);
                  }}
                  content="お気に入り登録"
                />
              ) : (
                <ThirdryButton
                  width="100%"
                  background="gray"
                  onClick={() => {
                    handleLike(product._id);
                  }}
                  content="お気に入り解除"
                />
              ))}
            <div className={"module-spacer--sm"} />
            {userInfo._id &&
              product.isRelease &&
              (!hasCart ? (
                totalStock !== 0 ? (
                  <ThirdryButton
                    width="100%"
                    background="red"
                    onClick={() => {
                      handleCart(product._id);
                    }}
                    content="カートに入れる"
                  />
                ) : (
                  <></>
                )
              ) : (
                <ThirdryButton
                  width="100%"
                  background="gray"
                  onClick={() => {
                    handleCart(product._id);
                  }}
                  content="カートから出す"
                />
              ))}
          </Segment>
        </div>
      </div>
    </>
  );
};

export default ProductId;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const productId = ctx.params?.productId as string;
  let data;
  if (productId) {
    data = await getProduct(productId);
    if (data.errMsg === "JsonWebTokenError") {
      return {
        redirect: {
          statusCode: 302,
          destination: "/login?attention=true",
        },
      };
    }
  }
  return { props: { data } };
};
