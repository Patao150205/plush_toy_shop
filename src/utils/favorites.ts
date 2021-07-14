/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from "axios";
import BaseUrl from "./BaseUrl";

// お気に入りの情報(詳細)取得
export const getFavoritesProduct = async (token?: string) => {
  try {
    const res = await axios.get(`${BaseUrl}/api/favorites?detailed=true`, {
      headers: {
        authorization: token,
      },
    });
    return res.data;
  } catch (error) {
    return { err: true, errMsg: error.response.data };
  }
};
