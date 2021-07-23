import React, { FC } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import style from "./PayForm.module.scss";
import ThirdryButton from "components/UIkit/button/ThirdryButton";
import axios from "axios";
import BaseUrl from "utils/BaseUrl";
import cookie from "js-cookie";
import { useAppDispatch } from "stores/store";
import { LoadingOFF, LoadingON, ModalOpen } from "stores/settingSlice";

type Props = {
  subTotal: number;
  token: string;
  eachAmount: { _id: string; amount: number }[];
};

const PayForm: FC<Props> = ({ subTotal, token, eachAmount }) => {
  const shipping = subTotal > 0 && subTotal <= 3000 ? 780 : 0;
  const sumPrice = subTotal + shipping;

  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!elements || !stripe) throw Error("決済エラー1");
      dispatch(LoadingON());

      console.log("before", elements);

      const res = await axios.post(
        `${BaseUrl}/api/settlement`,
        { token, sumPrice, eachAmount },
        { headers: { authorization: cookie.get("token") } }
      );
      const card = elements.getElement(CardElement);
      console.log("After", elements);
      const secret = res.data.client_secret;
      console.log(card);
      if (!card) throw Error("決済エラー2");
      const result = await stripe.confirmCardPayment(secret, {
        payment_method: {
          card,
        },
      });
      if (result.error) {
        await axios.post(`${BaseUrl}/api/settlement/rollback`);
        dispatch(LoadingOFF());
        dispatch(ModalOpen({ status: "error", title: "決済エラー3", message: result.error.message }));
      } else {
        if (result.paymentIntent.status === "succeeded") {
          await axios.post(`${BaseUrl}/api/settlement/commit`);
          dispatch(LoadingOFF());
          alert("お支払いが成功しました。");
          window.location.href = "/settlement/completed";
        }
      }
    } catch (error) {
      console.log(error?.response?.data || error.message || "決済エラー");
      await axios.post(`${BaseUrl}/api/settlement/rollback`);
      dispatch(LoadingOFF());
      dispatch(
        ModalOpen({
          status: "error",
          title: "エラー",
          message: error?.response?.data || error.message || "決済エラー",
        })
      );
    }
  };

  return (
    <form className={style.root} onSubmit={handleSubmit}>
      <h2 className="u-text--center">クレジットカード情報</h2>
      <div className="module-spacer--sm" />
      <CardElement options={{ hidePostalCode: true }} />
      <div className="module-spacer--xl" />
      <ThirdryButton background="red" content="支払う" onClick={(e) => handleSubmit(e)} />
      <div className="module-spacer--sm" />
    </form>
  );
};

export default PayForm;
