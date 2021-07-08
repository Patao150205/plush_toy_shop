/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from "axios";
import BaseUrl from "./BaseUrl";

export type ProductData = {
  name: string;
  category: string;
  width: string | number;
  height: string | number;
  deepth: string | number;
  Hot: boolean;
  New: boolean;
  price: string | number;
  productsPic?: string[];
  stock: string | number;
};

export const registProduct = async (data: ProductData) => {
  data.price = parseInt(data.price as string);
  data.width = parseInt(data.width as string);
  data.height = parseInt(data.height as string);
  data.deepth = parseInt(data.deepth as string);
  data.stock = parseInt(data.stock as string);

  try {
    const res = await axios.post(`${BaseUrl}/api/products`, { ...data });
    return res.data;
  } catch (error) {
    return { err: true, errMsg: error.response.data };
  }
};

// export const deleteProduct = async (data: ProductData) => {
//   try {
//     const res = await axios.post(`${BaseUrl}/api/products`, { ...data });
//     return res.data;
//   } catch (error) {
//     return { err: true, message: error.response.data };
//   }
// };

// export const editProduct = async (data: ProductData) => {
//   try {
//     const res = await axios.post(`${BaseUrl}/api/products`, { ...data });
//     return res.data;
//   } catch (error) {
//     return { err: true, message: error.response.data };
//   }
// };
