import React, { FC } from "react";
import { Color } from "styles/style";
import style from "./ThirdryButton.module.scss";

type Props = {
  borderColor?: string;
  background?: string;
  color?: string;
  content: string;
  width?: string;
  onClick: (arg?: any) => void;
  disabled?: boolean;
};

const ThirdryButton: FC<Props> = ({
  borderColor = Color.primary,
  background = "orange",
  onClick,
  width = "200px",
  color = "white",
  content,
  disabled = false,
}) => {
  return (
    <div className={style.btnWrapper}>
      <button
        disabled={disabled}
        style={{ background, borderColor, color, width }}
        onClick={onClick}
        className={style.root}>
        {content}
      </button>
    </div>
  );
};

export default ThirdryButton;
