import React, { FC } from "react";
import { Grid } from "semantic-ui-react";
import PrimaryText from "components/UIkit/textInput/PrimaryText";
import PrimaryButton from "components/UIkit/button/PrimaryButton";
import { Color } from "styles/style";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "stores/store";
import { LoadingOFF, LoadingON, ModalOpen } from "stores/settingSlice";
import { ErrorMessage } from "@hookform/error-message";
import { SignUpState, temporaryRegist } from "utils/auth";
import { useRouter } from "next/router";

const Signup: FC = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>();
  const dispatch = useAppDispatch();

  const sendInfo = async (data: SignUpState) => {
    dispatch(LoadingON());
    const res = await temporaryRegist(data);
    dispatch(LoadingOFF());
    if (!res.err) {
      dispatch(
        ModalOpen({
          status: "success",
          title: "メール送信成功",
          message:
            "入力したメールアドレス宛に、登録ご案内メールを送信しました。。３０分以内にご確認いただけない場合は、送信されたメールは無効となりますのでご注意ください。",
        })
      );
    } else {
      dispatch(ModalOpen({ status: "error", title: "エラー", message: res.errMsg }));
    }
  };

  return (
    <>
      <Grid centered>
        <Grid.Column width="10" textAlign="center">
          <div className="module-spacer--xl" />
          <h1 style={{ textShadow: "2px 2px 3px white", color: Color.secondary }}>会員登録</h1>
          <form autoComplete="new-password" onSubmit={handleSubmit(sendInfo)}>
            <PrimaryText
              getValues={getValues}
              register={register}
              required={true}
              name="nickname"
              type="text"
              label="ニックネーム"
            />
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
