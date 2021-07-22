import React, { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import style from "./confirmationCard.module.scss";

type Props = {
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
};

const ConfirmationCard: FC<Props> = ({ product, amount }) => {
  const router = useRouter();

  return (
    <>
      <div className={style.root}>
        <img onClick={() => router.push(`/product/${product._id}`)} src={product.primaryPic} alt="商品画像" />
        <div>
          <Link href={`/product/${product._id}`}>
            <a className={style.productName}>{product.name}</a>
          </Link>
          <div className="module-spacer--sm" />
          <div>
            <p>
              単価<span className="u-text--sub-emphasis">{product.price}円</span> 小計
              <span className="u-text--sub-emphasis">{product.price * amount}</span>円
            </p>
            <p>
              個数<span className="u-text--sub-emphasis">{amount}</span>体
            </p>
            <p></p>
          </div>
        </div>
      </div>
      <div className="module-spacer--sm" />
    </>
  );
};

export default ConfirmationCard;
