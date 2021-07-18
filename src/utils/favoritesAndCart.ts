/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from "axios";
import BaseUrl from "./BaseUrl";

type Product = {
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
};

// お気に入りの情報(詳細)取得
export const getFavoritesProduct = async (token?: string) => {
  try {
    const res = await axios.get(`${BaseUrl}/api/favorites?detailed=true`, {
      headers: {
        authorization: token,
      },
    });
    // もしお気に入りの商品が削除されていた場合削除
    const newData = res.data.filter((favorite: Product) => {
      if (favorite.product === null) {
        axios.delete(`${BaseUrl}/api/favorites/_id/${favorite._id}`, {
          headers: {
            authorization: token,
          },
        });
        return false;
      }
      return true;
    });

    return newData;
  } catch (error) {
    return { err: true, errMsg: error.response.data };
  }
};

export const getCartProduct = async (token?: string) => {
  try {
    const res = await axios.get(`${BaseUrl}/api/cart?detailed=true`, {
      headers: {
        authorization: token,
      },
    });

    const newData = res.data.filter((cart: Product) => {
      if (cart.product === null) {
        axios.delete(`${BaseUrl}/api/cart/_id/${cart._id}`, {
          headers: {
            authorization: token,
          },
        });
        return false;
      }
      return true;
    });
    return newData;
  } catch (error) {
    return { err: true, errMsg: error.response.data };
  }
};
