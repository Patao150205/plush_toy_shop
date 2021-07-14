import React, { FC } from "react";
import style from "./SecondaryButton.module.scss";

type Props = {
  content: string;
  onClick: () => void;
};

const SecondaryButton: FC<Props> = ({ content, onClick }) => {
  return (
    <>
      <button className={style.btn} onClick={onClick}>
        {content}
      </button>
    </>
  );
};

export default SecondaryButton;
