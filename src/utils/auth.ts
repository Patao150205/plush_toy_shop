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

export const authToken = async (token: string) => {
  try {
    const res = await axios.post(`${BaseUrl}/api/auth/token`, {}, { headers: { authorization: token } });
    return res.data;
  } catch (error) {
    return { err: true, errMsg: error.response.data };
  }
};

export const authTokenAndRoot = async (token: string) => {
  try {
    const res = await axios.post(`${BaseUrl}/api/auth/token/root`, {}, { headers: { authorization: token } });
    return res.data;
  } catch (error) {
    return { err: true, errMsg: error.response.data };
  }
};

export const temporaryRegist = async (userInfo: SignUpState) => {
  try {
    const res = await axios.post(`${BaseUrl}/api/auth/temporary/register`, {
      ...userInfo,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return { err: true, errMsg: err.response.data };
  }
};

export const confirmCurrectHash = async (hash: string) => {
  try {
    const res = await axios.post(`${BaseUrl}/api/auth/register/${hash}`);
    return res.data;
  } catch (error) {
    return { error: true, errMsg: error.response.data };
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
  window.location.href = "/";
};
