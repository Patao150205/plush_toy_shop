import BaseUrl from "./BaseUrl";
import axios from "axios";

export const sendContactMessage = async (data) => {
  try {
    const res = await axios.post(`${BaseUrl}/api/contact`, { data });
    return res.data;
  } catch (error) {
    return { err: true, errMsg: error.response.data };
  }
};
