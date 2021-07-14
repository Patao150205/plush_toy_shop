/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosBase from "axios";
import BaseUrl from "utils/BaseUrl";
import cookie from "js-cookie";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";

const token = cookie.get("token");
const axios = axiosBase.create({
  headers: {
    authorization: token,
  },
});

// ユーザー
export const fetchUserInfo = createAsyncThunk("user/fetchUser", async () => {
  if (!token) throw Error("認証情報が無効です。");
  const user = await axios.get(`${BaseUrl}/api/user`);
  return user.data;
});

// お気に入り機能
export const registFavorite = createAsyncThunk("user/registFavorite", async (productId: string) => {
  if (!token) throw Error("認証情報が無効です。");
  const res = await axios.post(`${BaseUrl}/api/favorites/${productId}`);
  //登録したときの_id ↓
  const data = {
    _id: res.data as string,
    product: productId,
  };
  return data;
});

export const deleteFavorite = createAsyncThunk("user/deleteFavorite", async (productId: string) => {
  if (!token) throw Error("認証情報が無効です。");
  await axios.delete(`${BaseUrl}/api/favorites/${productId}`);
  return productId;
});

// カート機能
export const registCart = createAsyncThunk("user/registCart", async (productId, ammount) => {
  if (!token) throw Error("認証情報が無効です。");
  const res = await axios.post(`${BaseUrl}/api/cart/${productId}`, { ammount });
  //登録したときの_id ↓
  const data = {
    _id: res.data as string,
    product: productId,
  };
  return data;
});

export const deleteCart = createAsyncThunk("user/deleteCart", async (productId: string) => {
  if (!token) throw Error("認証情報が無効です。");
  await axios.delete(`${BaseUrl}/api/cart/${productId}`);
  return productId;
});

type UserState =
  | {
      userInfo: {
        nickname: string;
        email: string;
        role: string;
        isShorthandEmail: boolean;
        _id: string;
      };
      favorites: [
        {
          _id: string;
          product: string;
        }
      ];
      cart: [
        {
          _id: string;
          product: string;
        }
      ];
    }
  | { userInfo: null; favorites: []; cart: [] };

const initialState: UserState = {
  userInfo: null,
  favorites: [],
  cart: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.fulfilled, (state: UserState, { payload }) => {
      console.log(payload);
      return (state = payload);
    });
    builder.addCase(fetchUserInfo.rejected, (state: UserState) => {
      return (state = { userInfo: null, favorites: [], cart: [] });
    });
    builder.addCase(registFavorite.fulfilled, (state: any, { payload }) => {
      state.favorites = [...state.favorites, payload];
    });
    builder.addCase(registFavorite.rejected, (state: UserState) => {
      return (state = { userInfo: null, favorites: [], cart: [] });
    });
    builder.addCase(deleteFavorite.fulfilled, (state: any, { payload }) => {
      state.favorites = state.favorites.filter((ele: { _id: string; product: string }) => ele.product !== payload);
    });
    builder.addCase(deleteFavorite.rejected, (state: UserState) => {
      return (state = { userInfo: null, favorites: [], cart: [] });
    });
  },
});

export const favoritesSelector = createSelector(
  (state: RootState) => state.user,
  (user) => user.favorites
);

export const cartSelector = createSelector(
  (state: RootState) => state.user,
  (user) => user.cart
);

export const userInfoSelector = createSelector(
  (state: RootState) => state.user,
  (user) => user.userInfo
);

export const {} = userSlice.actions;
export default userSlice.reducer;
