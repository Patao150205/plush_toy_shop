import React, { FC } from "react";
import style from "./TotalPrice.module.scss";
import ThirdryButton from "../UIkit/button/ThirdryButton";

type Props = {
  subTotal: number;
};

// 3000以上のお買い上げで送料無料
const TotalPrice: FC<Props> = ({ subTotal }) => {
  const handleSettlement = () => {};
  const shipping = subTotal >= 3000 ? 0 : 780;

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
        <div className={style.title}>合計</div> <div className={style.value}>{subTotal + shipping}(税込)</div>{" "}
      </div>
      <ThirdryButton background="red" content="ご購入手続き" onClick={handleSettlement} />
    </div>
  );
};

export default TotalPrice;
