/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from "axios";
import BaseUrl from "./BaseUrl";
import cookie from "js-cookie";

export type SignInState = {
  email: string;
  password: string;
};

export type SignUpState = {
  nickname: string;
  email: string;
  password: string;
  isShorthandEmail: boolean;
  // firstname: string;
  // lastname: string;
  // postcord: number;
  // prefecture: string;
  // city: string;
  // streetAdress: string;
  // building: string;
  // phoneNumber: number;
};

export const signUp = async (userInfo: SignUpState) => {
  try {
    const res = await axios.post(`${BaseUrl}/api/auth/register`, {
      ...userInfo,
    });
    console.log(res);
    return res.data;
  } catch (err) {
    return { err: true, errMsg: err.response.data };
  }
};

export const signIn = async (userInfo: SignInState) => {
  try {
    const res = await axios.post(`${BaseUrl}/api/auth/`, {
      ...userInfo,
    });
    return res.data;
  } catch (err) {
    return { err: true, errMsg: err.response.data };
  }
};

export const logOut = () => {
  cookie.remove("token");
};
