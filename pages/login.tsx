import { Grid } from "semantic-ui-react";
import React, { FC } from "react";
import PrimaryText from "components/UIkit/textInput/PrimaryText";
import PrimaryButton from "components/UIkit/button/PrimaryButton";
import { Color } from "styles/style";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "stores/store";
import { LoadingOFF, LoadingON, ModalOpen } from "stores/settingSlice";
import Link from "next/link";
import style from "styles/pages/login.module.scss";
import { signIn, SignInState } from "utils/auth";
import { ErrorMessage } from "@hookform/error-message";
import Head from "next/head";
import { useRouter } from "next/router";

const login: FC = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const sendInfo = async (data: SignInState) => {
    dispatch(LoadingON());
    const res = await signIn(data);
    dispatch(LoadingOFF());
    if (!res.err) {
      window.location.href = "/";
    } else {
      dispatch(ModalOpen({ status: "error", title: "エラー", message: res.errMsg }));
    }
  };

  return (
    <>
      <Head>
        <title>Yuruhuwa ログイン</title>
      </Head>
      <Grid stackable padding="horizontal">
        <Grid.Column width="8" style={{ textAlign: "center", padding: "2rem" }}>
          <div className="module-spacer--md" />
          <h1 style={{ textShadow: "2px 2px 3px white", color: Color.secondary }}>ログイン</h1>
          <div>
            <p>テスト用管理者アカウント</p>
            <p>メールアドレス: test@yahoo.co.jp</p>
            <p>パスワード: 111111</p>
          </div>
          <form onSubmit={handleSubmit(sendInfo)}>
            {router.query.attention === "true" && (
              <p className="u-text--emphasis">お気に入り、カート機能などを使用するには、ログインが必要です。</p>
            )}
            <PrimaryText
              getValues={getValues}
              register={register}
              validation={{
                pattern: {
                  value: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/,
                  message: "メールアドレスを正しく入力してください。",
                },
              }}
              name="email"
              type="email"
              required={true}
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
              validation={{ minLength: { value: 6, message: "パスワードを６文字以上で入力してください。" } }}
              name="password"
              type="password"
              required={true}
              label="パスワード"
            />
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => <p style={{ color: "red", marginTop: "10px" }}>{message}</p>}
            />
            <div className="module-spacer--xl" />
            <PrimaryButton type="submit" content="ログイン" />
            <div className="module-spacer--xl" />
          </form>
          <div className={style.linkWrapper}>
            <Link href="/signup">
              <a>会員登録がまだの方はこちら</a>
            </Link>
            <div className="module-spacer--sm" />
            {/* <Link href="/reset">
              <a>パスワードを忘れた方はこちら</a>
            </Link>
            <div className="module-spacer--sm" /> */}
          </div>
        </Grid.Column>
        <Grid.Column textAlign="center" width="8">
          <div className="module-spacer--xl" />
          <div className="module-spacer--xl" />
          <img src="shopLogo.jpg" className={style.mainImg} />
        </Grid.Column>
      </Grid>
    </>
  );
};

export default login;
