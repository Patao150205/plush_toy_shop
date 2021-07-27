import React, { FC } from "react";
import Link from "next/link";
import style from "./ProductCard.module.scss";
import { useRouter } from "next/router";
import classNames from "classnames";
import { useAppDispatch } from "stores/store";
import { deleteFavorite, registFavorite, userInfoSelector } from "stores/userSlice";
import { useAppSelector } from "../../stores/store";
import { deleteProduct } from "utils/products";

type Props = {
  favorites:
    | [
        {
          _id?: string;
          product: string;
        }
      ]
    | [];
  product: {
    _id: string;
    name: string;
    primaryPic: string;
    price: number;
    New: boolean;
    Hot: boolean;
    height: number;
    isRelease: boolean;
  };
  setProductsData?: React.Dispatch<React.SetStateAction<any>>;
};

const ProductCard: FC<Props> = ({ favorites, product, setProductsData }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // 商品が削除された場合
  if (!product) {
    return (
      <div className={style.root}>
        <p>この商品は削除されてしまった商品です。</p>
        <p className={classNames(style.icon, { [style.like]: true })}>
          <span onClick={() => handleLike(productId)} className={`fas fa-heart`} />
        </p>
      </div>
    );
  }

  const { name, primaryPic, price, _id: productId, New: isNew, Hot: isHot, height, isRelease } = product;

  const isFavorite = favorites.some((ele) => ele.product === productId);
  const userInfo = useAppSelector(userInfoSelector);

  const handleLike = async (productId: string) => {
    if (!isFavorite) {
      dispatch(registFavorite(productId));
    } else {
      dispatch(deleteFavorite(productId));
    }
  };

  const handleDelete = async (productId: string) => {
    const confirm = window.confirm("商品を本当に削除しますか？");
    if (confirm) {
      const res = await deleteProduct(productId);
      if (!res.err && setProductsData) {
        setProductsData((prev: any) => ({
          ...prev,
          products: prev?.products?.filter((prod: any) => prod._id !== productId),
        }));
      }
    }
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
        <img onClick={() => router.push(`/product/${productId}`)} src={primaryPic || "/noimg.jpg"} />
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
      <p className={style.icon}>
        {isRelease ? (
          <span
            onClick={() => handleLike(productId)}
            className={classNames(`fas fa-heart`, { [style.like]: isFavorite })}
          />
        ) : (
          <div className={style.noHeart} />
        )}
      </p>
      <>
        {userInfo.role === "root" && (
          <>
            <div className="module-spacer--sm" />
            <p className={style.icon}>
              <span onClick={() => handleDelete(productId)} className={`fas fa-trash-alt ${style.trash}`} />
            </p>
            <div className="module-spacer--sm" />
            {isRelease ? (
              <p className={`${style.mark} ${style.release}`}>
                <span className={`fas fa-pen`} onClick={() => router.push(`/products/modification/${productId}`)} />
              </p>
            ) : (
              <p className={`${style.mark} ${style.keep}`}>
                <span onClick={() => router.push(`/products/modification/${productId}`)} className={`fas fa-pen`} />
              </p>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default ProductCard;
