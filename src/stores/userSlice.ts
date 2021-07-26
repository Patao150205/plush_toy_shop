/* eslint-disable @typescript-eslint/no-unused-vars */
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
export const registCart = createAsyncThunk(
  "user/registCart",
  async (product: { productId: string; amount: number }) => {
    if (!token) throw Error("認証情報が無効です。");
    const res = await axios.post(`${BaseUrl}/api/cart/${product.productId}`, { amount: product.amount });
    //登録したときの_id ↓
    const data = {
      _id: res.data as string,
      product: product.productId,
      amount: product.amount,
    };
    return data;
  }
);

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
        role: "user" | "root";
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
          amount: number;
        }
      ];
    }
  | {
      userInfo: { nickname: string; email: string; role: "user" | "root"; isShorthandEmail: boolean; _id: string };
      favorites: [];
      cart: [];
    };

const initialState: UserState = {
  userInfo: {
    nickname: "",
    email: "",
    role: "user",
    isShorthandEmail: false,
    _id: "",
  },
  favorites: [],
  cart: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    updateCart: (state, action) => {
      state.cart = action.payload;
    },
  },
  extraReducers: (builder) => {
    // ユーザー
    builder.addCase(fetchUserInfo.fulfilled, (state: UserState, { payload }) => {
      console.log(payload);
      return (state = payload);
    });
    builder.addCase(fetchUserInfo.rejected, (state: UserState) => {
      return (state = initialState);
    });
    // お気に入り機能
    builder.addCase(registFavorite.fulfilled, (state: any, { payload }) => {
      state.favorites = [...state.favorites, payload];
    });
    builder.addCase(registFavorite.rejected, (state: UserState) => {
      return (state = initialState);
    });
    builder.addCase(deleteFavorite.fulfilled, (state: any, { payload }) => {
      state.favorites = state.favorites.filter((ele: { _id: string; product: string }) => ele.product !== payload);
    });
    builder.addCase(deleteFavorite.rejected, (state: UserState) => {
      return (state = initialState);
    });
    // カート機能
    builder.addCase(registCart.fulfilled, (state: any, { payload }) => {
      state.cart = [...state.cart, payload];
    });
    builder.addCase(registCart.rejected, (state: UserState, action) => {
      return (state = initialState);
    });
    builder.addCase(deleteCart.fulfilled, (state: any, { payload }) => {
      state.cart = state.cart.filter(
        (ele: { _id: string; product: string; amount: number }) => ele.product !== payload
      );
    });
    builder.addCase(deleteCart.rejected, (state: UserState) => {
      return (state = initialState);
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

export const { updateFavorites, updateCart } = userSlice.actions;
export default userSlice.reducer;
