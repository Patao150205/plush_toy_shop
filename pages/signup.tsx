import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import PrimaryText from "components/UIkit/textInput/PrimaryText";
import PrimaryButton from "components/UIkit/button/PrimaryButton";
import { Color } from "styles/style";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "stores/store";
import { LoadingOFF, LoadingON } from "stores/settingSlice";
import { ErrorMessage } from "@hookform/error-message";

type SendData = {
  email: string;
  password: string;
};

const Signup = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>();
  const dispatch = useAppDispatch();
  const [render, setRender] = useState(false);

  const sendInfo = (data: SendData) => {
    dispatch(LoadingON());
    setTimeout(() => {
      console.log("いえす", data);
      dispatch(LoadingOFF());
    }, 5000);
  };

  return (
    <>
      <Grid centered>
        <Grid.Column width="10" textAlign="center">
          <div className="module-spacer--xl" />
          <h1 style={{ textShadow: "2px 2px 3px white", color: Color.secondary }}>会員登録</h1>
          <form onSubmit={handleSubmit(sendInfo)}>
            <PrimaryText
              getValues={getValues}
              register={register}
              required={true}
              name="lastname"
              type="text"
              label="姓"
              setRender={setRender}
            />
            <PrimaryText getValues={getValues} register={register} name="firstname" type="text" label="名" />
            <PrimaryText
              getValues={getValues}
              register={register}
              required={true}
              validation={{
                pattern: {
                  value: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/,
                  message: "メールアドレスを正しく入力してください。",
                },
              }}
              name="email"
              type="email"
              label="メールアドレス"
            />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => <p style={{ color: "red", marginTop: "10px" }}>{message}</p>}
            />
            <PrimaryText
              getValues={getValues}
              register={register}
              required={true}
              validation={{
                pattern: {
                  value: /^0\d{9,10}$/,
                  message: "電話番号を正しく入力してください。",
                },
              }}
              name="phonenumber"
              type="number"
              label="電話番号"
            />
            <ErrorMessage
              errors={errors}
              name="phone"
              render={({ message }) => <p style={{ color: "red", marginTop: "10px" }}>{message}</p>}
            />
            <PrimaryText
              getValues={getValues}
              register={register}
              required={true}
              validation={{ pattern: { value: /^\d{7}$/, message: "郵便番号を正しく入力してください。" } }}
              name="postcord"
              type="number"
              label="郵便番号"
            />
            <ErrorMessage
              errors={errors}
              name="postcord"
              render={({ message }) => <p style={{ color: "red", marginTop: "10px" }}>{message}</p>}
            />

            <PrimaryText
              getValues={getValues}
              register={register}
              required={true}
              name="prefecture"
              type="text"
              label="都道府県"
            />
            <ErrorMessage
              errors={errors}
              name="prefecture"
              render={({ message }) => <p style={{ color: "red", marginTop: "10px" }}>{message}</p>}
            />
            <PrimaryText
              getValues={getValues}
              register={register}
              required={true}
              name="city"
              type="text"
              label="市区町村"
            />
            <ErrorMessage
              errors={errors}
              name="city"
              render={({ message }) => <p style={{ color: "red", marginTop: "10px" }}>{message}</p>}
            />
            <PrimaryText
              getValues={getValues}
              register={register}
              required={true}
              name="postcode"
              type="text"
              label="番地"
            />
            <ErrorMessage
              errors={errors}
              name="postcord"
              render={({ message }) => <p style={{ color: "red", marginTop: "10px" }}>{message}</p>}
            />
            <PrimaryText
              getValues={getValues}
              register={register}
              required={true}
              name="building"
              type="text"
              label="建物名・部屋番号"
            />
            <ErrorMessage
              errors={errors}
              name="building"
              render={({ message }) => <p style={{ color: "red", marginTop: "10px" }}>{message}</p>}
            />
            <PrimaryText
              getValues={getValues}
              register={register}
              required={true}
              validation={{ minLength: { value: 6, message: "パスワードを６文字以上で入力してください。" } }}
              name="password"
              type="password"
              label="パスワード"
            />
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => <p style={{ color: "red", marginTop: "10px" }}>{message}</p>}
            />
            <div className="module-spacer--xl" />
            <PrimaryButton type="submit" content="サインアップ" />
            <div className="module-spacer--xl" />
          </form>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Signup;
