import React, { FC } from "react";
import style from "./SecondaryButton.module.scss";
console.log(style);

type Props = {
  content: string;
  handleSubmit: () => void;
};

const SecondaryButton: FC<Props> = ({ content, handleSubmit }) => {
  return (
    <>
      <div className={style.test}></div>
    </>
  );
};

export default SecondaryButton;
