import React, { FC } from "react";
import Head from "next/head";
import { Form, Segment } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { LoadingOFF, LoadingON, ModalOpen } from "stores/settingSlice";
import { useAppDispatch } from "stores/store";
import { sendContactMessage } from "utils/contact";
import style from "styles/pages/contact.module.scss";
import { useSelector } from "react-redux";
import { userInfoSelector } from "stores/userSlice";
import { ErrorMessage } from "@hookform/error-message";

export type ContactData = {
  email: string;
  message: string;
  name: string;
  userId?: string;
};

const Contact: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useAppDispatch();
  const userInfo = useSelector(userInfoSelector);

  const sendData = async (data: ContactData) => {
    const newData = { ...data, userId: userInfo._id ?? "" };
    dispatch(LoadingON());
    const res = await sendContactMessage(newData);
    if (!res.err) {
      dispatch(ModalOpen({ status: "success", title: "送信成功", message: "お問い合わせ内容を送信しました。" }));
    } else {
      dispatch(ModalOpen({ status: "error", title: "送信失敗", message: "お問い合わせ内容の送信に失敗しました。" }));
    }
    dispatch(LoadingOFF());
  };

  return (
    <>
      <Head>
        <title>Yuruhuwa【CONTACT】</title>
      </Head>
      <Segment textAlign="center" inverted>
        <Form inverted onSubmit={handleSubmit(sendData)}>
          <h1 className={style.title}>
            <span>Yuruhuwa</span> 【CONTACT】
          </h1>
          <div className="module-spacer--md" />
          <p>
            <span className="u-text--sub-emphasis">商品に関するお問い合わせの場合</span>
            は、ログインしている状態で送信する必要があります。
          </p>
          <div className="module-spacer--md" />
          <Form.Field style={{ margin: "0 auto" }} required width="10">
            <label>お名前</label>
            <input {...register("name")} placeholder="お名前" />
          </Form.Field>
          <div className="module-spacer--md" />
          <Form.Field style={{ margin: "0 auto" }} required width="10">
            <label>ご返信用メールアドレス</label>
            <input
              autoFocus
              type="email"
              {...register("email", {
                pattern: {
                  value: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/,
                  message: "メールアドレスを正しく入力してください。",
                },
              })}
              required
              placeholder="メールアドレス"
            />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => <p style={{ color: "red", marginTop: "10px" }}>{message}</p>}
            />
          </Form.Field>
          <div className="module-spacer--md" />
          <Form.Field style={{ margin: "0 auto" }} required width="10">
            <label>お問い合わせ内容</label>
            <textarea {...register("message")} cols={10} rows={10} placeholder="お問い合わせ内容"></textarea>
          </Form.Field>
          <div className="module-spacer--xl" />
          <Form.Button type="submit" icon="send" color="blue" size="large" content="送信" />
          <div className="module-spacer--xl" />
        </Form>
      </Segment>
    </>
  );
};

export default Contact;
