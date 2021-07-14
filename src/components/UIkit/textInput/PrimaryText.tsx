import React, { FC, useState } from "react";
import style from "./PrimaryText.module.scss";
import classNames from "classnames";

type Props = {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "number";
  register: any;
  getValues: any;
  required?: boolean;
  validation?: {
    [name: string]: any;
  };
  setRender?: any;
};

const PrimaryText: FC<Props> = ({
  required = false,
  setRender,
  register,
  getValues,
  validation = null,
  name,
  label,
  type,
}) => {
  const [isActive, setIsActive] = useState(false);

  const require = required ? `${name}を入力してください。` : false;

  const value = getValues(name);
  return (
    <div className={style.wrapper} onFocus={() => setIsActive(true)} onBlur={() => setIsActive(false)}>
      <label
        className={classNames(style.label, {
          [style.labelActive]: isActive || value,
        })}
        htmlFor={name}>
        {label}
      </label>
      <input
        required={required}
        onBlur={(prev) => setRender(!prev)}
        autoComplete="off"
        {...register(name, { ...validation, required: require })}
        name={name}
        id={name}
        type={type}
        className={classNames(style.input, { [style.inputActive]: isActive })}
      />
    </div>
  );
};

export default PrimaryText;
