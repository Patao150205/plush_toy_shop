import React, { FC, useState } from "react";
import Link from "next/link";
import style from "./ProductCard.module.scss";
import { useRouter } from "next/router";
import classNames from "classnames";
import { useAppDispatch } from "stores/store";
import { deleteFavorite, registFavorite } from "stores/userSlice";
import { Loader } from "semantic-ui-react";

type Props = {
  favorites:
    | [
        {
          _id?: string;
          product: string;
        }
      ]
    | [];
  name: string;
  productPic: string;
  price: number;
  productId: string;
  isNew: boolean;
  isHot: boolean;
  height: number;
};

const ProductCard: FC<Props> = ({ favorites, name, productPic, price, productId, isNew, isHot, height }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isFavorite = favorites.find((ele) => ele.product === productId);

  const [loading, setLoading] = useState(false);

  const handleLike = async (productId: string) => {
    setLoading(true);
    if (!isFavorite) {
      dispatch(registFavorite(productId));
    } else {
      dispatch(deleteFavorite(productId));
    }
    setLoading(false);
  };

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

  return (
    <div className={style.root}>
      <div className={style.imgWrapper}>
        <img onClick={() => router.push(`/product/${productId}`)} src={productPic || "/noimg.jpg"} />
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
      <p className={style.height}>{height}cm (高さ)</p>
      <p className={classNames(style.heart, { [style.like]: isFavorite })}>
        {loading ? <Loader active inline /> : <span onClick={() => handleLike(productId)} className={`fas fa-heart`} />}
      </p>
    </div>
  );
};

export default ProductCard;
