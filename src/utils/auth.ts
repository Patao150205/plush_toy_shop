/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from "axios";
import BaseUrl from "./BaseUrl";

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
    return res.data;
  } catch (err) {
    console.log(err.response);
    console.log(err.request);
    console.log(err.message);
    return { err };
  }
};

export const signIn = async (userInfo: SignInState) => {
  try {
    const res = await axios.post(`${BaseUrl}/api/auth/`, {
      ...userInfo,
    });
    return res.data;
  } catch (err) {
    console.error(err);
    return { err };
  }
};
