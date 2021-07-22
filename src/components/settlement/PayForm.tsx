import React, { FC } from "react";
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
};

const PayForm: FC<Props> = ({ subTotal, token }) => {
  const shipping = subTotal > 0 && subTotal <= 3000 ? 780 : 0;
  const sumPrice = subTotal + shipping;

  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (stripe) {
      const res = await axios.post(
        `${BaseUrl}/api/settlement`,
        { token, sumPrice },
        { headers: { authorization: cookie.get("token") } }
      );
      const secret = res.data.client_secret;
      console.log(secret);
      const card = elements?.getElement(CardElement);
      if (!elements || !card) return;
      const result = await stripe.confirmCardPayment(secret, {
        payment_method: {
          card,
        },
      });

      if (result.error) {
        dispatch(ModalOpen({ status: "error", title: "決済エラー", message: result.error.message }));
      } else {
        if (result.paymentIntent.status === "succeeded") {
          alert("Payment Success");
        }
      }
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
