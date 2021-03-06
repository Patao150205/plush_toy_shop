/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axiosBase from "axios";
import BaseUrl from "./BaseUrl";
import cookies from "js-cookie";

export type ProductData = {
  name: string;
  category: string;
  width: string | number;
  height: string | number;
  deepth: string | number;
  description: string;
  Hot: boolean;
  New: boolean;
  price: string | number;
  productPic?: string[];
  stock: string | number;
  selectPic?: string;
  primaryPic: string;
  isRelease: boolean;
};

const axios = axiosBase.create({ headers: { authorization: cookies.get("token") } });

// 個別の商品情報取得
export const getProduct = async (productId: string) => {
  try {
    const res = await axiosBase.get(`${BaseUrl}/api/product/${productId}`);
    return res.data;
  } catch (error: any) {
    return { err: true, errMsg: error.response.data };
  }
};

// 商品の在庫数確認
export const getStockList = async (productId: string) => {
  try {
    const res = await axiosBase.get(`${BaseUrl}/api/product/stock/${productId}`);
    return res.data;
  } catch (error: any) {
    return { err: true, errMsg: error.response.data };
  }
};

// 商品一覧の取得
export const getProducts = async (path: string) => {
  try {
    const res = await axiosBase.get(`${BaseUrl}/api${path}`);
    return res.data;
  } catch (error: any) {
    return { err: true, errMsg: error.response.data };
  }
};

// 商品一覧の取得(管理者用)
export const getProductsRoot = async (path: string, token: string) => {
  try {
    const res = await axiosBase.get(`${BaseUrl}/api${path}`, { headers: { authorization: token } });
    return res.data;
  } catch (error: any) {
    return { err: true, errMsg: error.response.data };
  }
};

// 商品検索
export const SearchProducts = async (keyword: string) => {
  try {
    const res = await axiosBase.get(`${BaseUrl}/api/search?keyword=${keyword}`);
    return res.data;
  } catch (error: any) {
    return { err: true, errMsg: error.response.data };
  }
};

// 商品登録
export const registProduct = async (data: ProductData) => {
  data.price = parseInt(data.price as string);
  data.width = parseInt(data.width as string);
  data.height = parseInt(data.height as string);
  data.deepth = parseInt(data.deepth as string);
  data.stock = parseInt(data.stock as string);

  try {
    const res = await axios.post(`${BaseUrl}/api/products`, { ...data });
    return res.data;
  } catch (error: any) {
    return { err: true, errMsg: error.response.data };
  }
};

// 商品編集
export const modifyProduct = async (data: ProductData) => {
  data.price = parseInt(data.price as string);
  data.width = parseInt(data.width as string);
  data.height = parseInt(data.height as string);
  data.deepth = parseInt(data.deepth as string);
  data.stock = parseInt(data.stock as string);

  try {
    const res = await axios.post(`${BaseUrl}/api/products/modification`, { ...data });
    return res.data;
  } catch (error: any) {
    return { err: true, errMsg: error.response.data };
  }
};

// 商品の削除
export const deleteProduct = async (productId: string) => {
  try {
    const res = await axios.delete(`${BaseUrl}/api/products/${productId}`);
    return res.data;
  } catch (error: any) {
    return { err: true, message: error.response.data };
  }
};

// 商品履歴の取得
export const getPurchaseHistory = async (token: string, page: string | number) => {
  try {
    const res = await axiosBase.get(`${BaseUrl}/api/products/history?p=${page}`, { headers: { authorization: token } });
    return res.data;
  } catch (error: any) {
    return { err: true, message: error.response.data };
  }
};

// 商品発注一覧取得
export const getOrderList = async (token: string, page: string | number) => {
  try {
    const res = await axiosBase.get(`${BaseUrl}/api/products/order?p=${page}`, { headers: { authorization: token } });
    return res.data;
  } catch (error: any) {
    return { err: true, message: error.response.data };
  }
};

// 商品の注文の状態を変更
export const changeOrderStatus = async (orderId: string, status: string) => {
  try {
    const res = await axiosBase.post(
      `${BaseUrl}/api/product/order/status`,
      { orderId, status },
      {
        headers: { authorization: cookies.get("token") },
      }
    );
    return res.data;
  } catch (error: any) {
    return { err: true, message: error.response.data };
  }
};
