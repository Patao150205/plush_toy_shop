import React, { FC } from "react";
import { Card, Icon } from "semantic-ui-react";
import Link from "next/link";
import style from "./ProductCard.module.scss";
import { useRouter } from "next/router";

type Props = {
  name: string;
  productPic: string;
  price: number;
  productId: string;
};

const ProductCard: FC<Props> = ({ name, productPic, price, productId }) => {
  const router = useRouter();

  return (
    <div className={style.root}>
      <img
        onClick={() => router.push(`/product/${productId}`)}
        src={
          productPic ||
          "https://res.cloudinary.com/dqzhjmrwo/image/upload/v1625704122/blush_toy_shop/kqrzogaik3zgmlm1laio.jpg"
        }
      />
      <p className={style.link}>
        <Link href={`/product/${productId}`}>
          <a className={style.name}>{name}</a>
        </Link>
      </p>
      <p className={style.price}>{price}円(税込)</p>
      <p className={style.heart}>
        <span className={`fas fa-heart`} />
      </p>
    </div>
  );
};

export default ProductCard;
