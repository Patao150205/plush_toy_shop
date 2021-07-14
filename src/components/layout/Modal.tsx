import style from "./Modal.module.scss";
import classNames from "classnames";
import React, { FC } from "react";
import SecondaryButton from "../UIkit/button/SecondaryButton";
import { useAppSelector } from "../../stores/store";
import { ModalClose, modalSelector } from "stores/settingSlice";
import { useAppDispatch } from "stores/store";

const Modal: FC = ({ children }) => {
  const dispatch = useAppDispatch();
  const { isOpen, status, title, message } = useAppSelector(modalSelector);
  const statuses = {
    isError: status === "error",
    isSuccess: status === "success",
  };

  return (
    <>
      {isOpen ? (
        <div className={style.container}>
          <div className={style.blind}>
            <div
              className={classNames(
                style.root,
                { [style.success]: statuses.isSuccess },
                { [style.error]: statuses.isError }
              )}>
              <div className={style.wrapper}>
                <h1>{title}</h1>
                <div className="module-spacer--sm" />
                <p>{message}</p>
                <div className="module-spacer--sm" />
                <SecondaryButton content="OK" onClick={() => dispatch(ModalClose())} />
              </div>
            </div>
          </div>
          {children}
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default Modal;
