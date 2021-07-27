import React, { FC } from "react";
import style from "./PrimaryButton.module.scss";

type Props = {
  content: string;
  type?: "submit" | "button";
  onClick?: (e?: any) => void;
};

const PrimaryButton: FC<Props> = ({ type = "button", content, onClick }) => {
  return (
      <button onClick={onClick} type={type} className={style.btn}>
        <span className={style.btnContent}>
          {content}
          <i className="fas fa-angle-right fa-position-right"></i>
        </span>
      </button>
  );
};

export default PrimaryButton;
