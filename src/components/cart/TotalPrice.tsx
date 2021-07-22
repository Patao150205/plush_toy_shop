import React, { FC } from "react";
import style from "./TotalPrice.module.scss";
import ThirdryButton from "../UIkit/button/ThirdryButton";
import { useRouter } from "next/router";

type Props = {
  subTotal: number;
  btnContent: string;
  route: string;
};

// 3000以上のお買い上げで送料無料
const TotalPrice: FC<Props> = ({ subTotal, btnContent, route }) => {
  const shipping = subTotal > 0 && subTotal <= 3000 ? 780 : 0;
  const router = useRouter();

  return (
    <div className={style.totalPrice}>
      <div className="module-spacer--md" />
      <div className={style.priceWrapper}>
        <div className={style.title}>小計</div> <div className={style.value}>{subTotal}円(税込)</div>
      </div>
      <div className={style.priceWrapper}>
        <div className={style.title}>送料</div> <div className={style.value}>{shipping}円</div>
      </div>
      <div className={style.priceWrapper}>
        <div className={style.title}>合計</div> <div className={style.value}>{subTotal + shipping}円(税込)</div>{" "}
      </div>
      <div className="module-spacer--sm" />
      <ThirdryButton content={btnContent} onClick={() => router.push(route)} />
    </div>
  );
};

export default TotalPrice;
