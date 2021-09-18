/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from "axios";
import BaseUrl from "./BaseUrl";
import cookie from "js-cookie";

export type AddressData = {
  building?: string;
  city: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  postcord: string;
  prefecture: string;
  streetAddress: string;
};

// サーバサイドレンダリング用
export const getAddressData = async (token: string | undefined) => {
  if (!token) throw Error("認証情報が無効です。");
  try {
    const res = await axios.get(`${BaseUrl}/api/address`, { headers: { authorization: token } });
    return res.data;
  } catch (error: any) {
    console.error(error);
    return { err: true, errMsg: error.response.data };
  }
};

export const sendAddressData = async (data: AddressData) => {
  try {
    const res = await axios.post(
      `${BaseUrl}/api/address`,
      { data },
      { headers: { authorization: cookie.get("token") } }
    );
    return res.data;
  } catch (error: any) {
    return { err: true, errMsg: error.response.data };
  }
};
