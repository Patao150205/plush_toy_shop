import { GetServerSideProps } from "next";
import React, { FC, useState } from "react";
import { getProduct } from "utils/products";
import style from "styles/pages/product/[product].module.scss";
import ProductSlide from "components/product/ProductSlide";
import NoProduct from "../products/NoProduct";
import { Segment } from "semantic-ui-react";
import Head from "next/head";
import ThirdryButton from "../../src/components/UIkit/button/ThirdryButton";

type Props = {
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
  };
};

const ProductId: FC<Props> = ({ product }) => {
  // console.log(product);
  const [amount, setAmount] = useState("1");

  const title = `Yuruhuwa 【${product?.name}】` ?? "商品情報";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (parseInt(value) > product.stock) {
      return setAmount(String(product.stock));
    }
    setAmount(value);
  };

  if (!product) {
    return <NoProduct />;
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="module-spacer--md" />
      <div className={style.root}>
        <div className={style.swiperWrapper}>
          <ProductSlide productPic={product.productPic} primaryPic={product.primaryPic} />
        </div>
        <div className={style.detail}>
          <Segment>
            <h1>{product.name}</h1>
            <span></span>
            <span></span>
            <p className={style.desc}>{product.description}</p>
            <div className={`module-spacer--xs ${style.divider}`} />
            <div className={`module-spacer--sm`} />
            <label></label>
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
            {product.stock > 0 ? (
              <>
                <div className={style.amountWrapper}>
                  <p className={style.sum}>
                    合計 <span>{product.price * parseInt(amount) || 0}円(税込)</span>
                  </p>{" "}
                  <p className={style.amount}>
                    数量
                    <input
                      onChange={handleChange}
                      value={amount}
                      type="number"
                      defaultValue={1}
                      min={1}
                      max={product.stock}
                      required
                    />{" "}
                    体
                  </p>
                </div>
                <p className={style.stock}>
                  <span>{product.stock}</span>体在庫がございます。
                </p>
              </>
            ) : (
              <>
                <h1 className="u-text--center">在庫がありません🙇</h1>
              </>
            )}

            <div className={"module-spacer--sm"} />
            <ThirdryButton width="100%" onClick={() => {}} content="お気に入り登録" />
            <div className={"module-spacer--sm"} />
            <ThirdryButton width="100%" background="red" onClick={() => {}} content="カートに入れる" />
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
    if (data.errMsg === "認証情報が無効です。") {
      return {
        redirect: {
          statusCode: 302,
          destination: "/login",
        },
      };
    }
  }
  return { props: { product: data } };
};
