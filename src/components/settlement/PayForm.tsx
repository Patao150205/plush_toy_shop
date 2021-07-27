import React, { FC, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import style from "./PayForm.module.scss";
import ThirdryButton from "components/UIkit/button/ThirdryButton";
import axios from "axios";
import BaseUrl from "utils/BaseUrl";
import cookie from "js-cookie";
import { useAppDispatch } from "stores/store";
import { ModalOpen } from "stores/settingSlice";

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

  const [disabled, toggleDisabled] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    toggleDisabled(true);
    e.preventDefault();
    try {
      if (!elements || !stripe) throw Error("決済エラー1");

      const res = await axios.post(
        `${BaseUrl}/api/settlement`,
        { token, sumPrice, eachAmount },
        { headers: { authorization: cookie.get("token") } }
      );
      const card = elements.getElement(CardElement);
      const secret = res.data.client_secret;
      if (!card) throw Error("決済エラー2");
      const result = await stripe.confirmCardPayment(secret, {
        payment_method: {
          card,
        },
      });
      if (result.error) {
        await axios.post(`${BaseUrl}/api/settlement/rollback`);
        dispatch(ModalOpen({ status: "error", title: "決済エラー3", message: result.error.message }));
        toggleDisabled(false);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          await axios.post(`${BaseUrl}/api/settlement/commit`);
          alert("お支払いが成功しました。");
          window.location.href = "/settlement/completed";
        }
      }
    } catch (error) {
      await axios.post(`${BaseUrl}/api/settlement/rollback`);
      dispatch(
        ModalOpen({
          status: "error",
          title: "エラー",
          message: error?.response?.data || error.message || "決済エラー",
        })
      );
      toggleDisabled(false);
    }
  };

  return (
    <form className={style.root} onSubmit={handleSubmit}>
      <h2 className="u-text--center">クレジットカード情報</h2>
      <div className="module-spacer--sm" />
      <CardElement options={{ hidePostalCode: true }} />
      <div className="module-spacer--xl" />
      <ThirdryButton
        disabled={disabled}
        background={disabled ? "gray" : "red"}
        content="支払う"
        onClick={(e) => handleSubmit(e)}
      />
      <div className="module-spacer--sm" />
    </form>
  );
};

export default PayForm;
