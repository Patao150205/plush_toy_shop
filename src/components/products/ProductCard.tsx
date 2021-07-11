import React, { FC } from "react";
import Link from "next/link";
import style from "./ProductCard.module.scss";
import { useRouter } from "next/router";
import classNames from "classnames";

type Props = {
  name: string;
  productPic: string;
  price: number;
  productId: string;
  isNew: boolean;
  isHot: boolean;
  height: number;
};

const ProductCard: FC<Props> = ({ name, productPic, price, productId, isNew, isHot, height }) => {
  const router = useRouter();

  // スタイル
  const position = {
    new: { left: false, right: false },
    hot: { left: false, right: false },
  };
  if (isNew && isHot) {
    position.hot.left = true;
    position.new.right = true;
  } else if (isNew) {
    position.new.right = true;
  } else if (isHot) {
    position.hot.right = true;
  }

  console.log(position);

  return (
    <div className={style.root}>
      <div className={style.imgWrapper}>
        <img
          onClick={() => router.push(`/product/${productId}`)}
          src={
            productPic ||
            "https://res.cloudinary.com/dqzhjmrwo/image/upload/v1625704122/blush_toy_shop/kqrzogaik3zgmlm1laio.jpg"
          }
        />
        {isNew && (
          <span
            className={classNames(
              style.label,
              style.new,
              { [style.left]: position.new.left },
              { [style.right]: position.new.right }
            )}>
            New
          </span>
        )}
        {isHot && (
          <span
            className={classNames(
              style.label,
              style.hot,
              { [style.left]: position.hot.left },
              { [style.right]: position.hot.right }
            )}>
            Hot
          </span>
        )}
      </div>
      <p className={style.link}>
        <Link href={`/product/${productId}`}>
          <a className={style.name}>{name}</a>
        </Link>
      </p>
      <p className={style.price}>{price}円(税込)</p>
      <p className={style.price}>{height}cm (縦)</p>
      <p className={style.heart}>
        <span className={`fas fa-heart`} />
      </p>
    </div>
  );
};

export default ProductCard;
