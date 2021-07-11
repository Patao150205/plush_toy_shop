import React, { FC } from "react";
import style from "./PrimaryButton.module.scss";

type Props = {
  content: string;
  type: "submit" | "button";
};

const PrimaryButton: FC<Props> = ({ type, content }) => {
  return (
    <>
      <button type={type} className={style.btn}>
        <span className={style.btnContent}>
          {content}
          <i className="fas fa-angle-right fa-position-right"></i>
        </span>
      </button>
    </>
  );
};

export default PrimaryButton;
