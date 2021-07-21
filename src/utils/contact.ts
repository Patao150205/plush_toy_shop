import BaseUrl from "./BaseUrl";
import axios from "axios";
import { ContactData } from "../../pages/contact";

export const sendContactMessage = async (data: ContactData) => {
  try {
    const res = await axios.post(`${BaseUrl}/api/contact`, { data });
    return res.data;
  } catch (error) {
    return { err: true, errMsg: error.response.data };
  }
};
