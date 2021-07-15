import React, { FC } from "react";
import style from "./CartCard.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppDispatch } from "stores/store";
import { deleteCart } from "stores/userSlice";

type Props = {
  counts: any;
  setCounts: React.Dispatch<React.SetStateAction<any>>;
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

const CartCard: FC<Props> = ({ product, amount, counts, setCounts }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleDelete = () => {};

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(name);
    setCounts((prev: { name: number }) => ({ ...prev, [name]: parseInt(value) }));
  };

  return (
    <div className={style.root}>
      <img onClick={() => router.push(`/product/${product._id}`)} src={product.primaryPic} alt="商品画像" />
      <div>
        <Link href={`/product/${product._id}`}>
          <a className={style.productName}>{product.name}</a>
        </Link>
        <div className="module-spacer--sm" />
        <div>
          <p className={style.productPrice}>{product.price}円</p>
          {product.stock !== 0 ? (
            <p className={style.countLabel}>
              数量 :&nbsp;&nbsp;
              <select value={counts?.[product._id]} onChange={handleChange} name={product._id} required>
                {new Array(product.stock).fill(undefined).map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              体
            </p>
          ) : (
            <p>在庫がありません</p>
          )}
          <span onClick={() => dispatch(deleteCart(product._id))} className={`fas fa-trash-alt ${style.trash}`}></span>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
