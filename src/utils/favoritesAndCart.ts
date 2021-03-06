/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axiosBase from "axios";
import BaseUrl from "./BaseUrl";
import cookies from "js-cookie";

const axios = axiosBase.create({ headers: { authorization: cookies.get("token") } });

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
    isRelease: boolean;
  };
};

// お気に入りの情報(詳細)取得
export const getFavoritesProduct = async (token?: string) => {
  try {
    const res = await axiosBase.get(`${BaseUrl}/api/favorites?detailed=true`, {
      headers: {
        authorization: token,
      },
    });
    // もしお気に入りの商品が削除されていた場合削除
    const newData = res.data.filter((favorite: Product) => {
      if (favorite.product === null || favorite.product.isRelease === false) {
        axiosBase.delete(`${BaseUrl}/api/favorites/_id/${favorite._id}`, {
          headers: {
            authorization: token,
          },
        });
        return false;
      }
      return true;
    });

    return newData;
  } catch (error: any) {
    return { err: true, errMsg: error.response.data };
  }
};

export const getCartProduct = async (token: string) => {
  try {
    const res = await axiosBase.get(`${BaseUrl}/api/cart?detailed=true`, {
      headers: {
        authorization: token,
      },
    });
    const newData = res.data.cart.filter((cart: Product) => {
      if (cart.product === null || cart.product.isRelease === false) {
        axiosBase.delete(`${BaseUrl}/api/cart/_id/${cart._id}`, {
          headers: { authorization: token },
        });
        return false;
      }
      return true;
    });

    return { cart: newData, updatedAt: res.data.updatedAt };
  } catch (error: any) {
    return { err: true, errMsg: error.response.data };
  }
};

export const changeCartStock = async (productId: string, newAmmount: number) => {
  try {
    const res = await axios.post(`/api/cart/count/${productId}`, { newAmmount });
    return res.data;
  } catch (error: any) {
    return { err: true, errMsg: error.response.data };
  }
};
