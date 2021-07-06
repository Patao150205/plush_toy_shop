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
import { useRouter } from "next/router";

const login: FC = () => {
  const { register, handleSubmit, getValues } = useForm<FormData>();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const sendInfo = async (data: SignInState) => {
    dispatch(LoadingON());
    const res = await signIn(data);
    dispatch(LoadingOFF());
    if (!res.err) {
      router.push("/");
    } else {
      dispatch(ModalOpen({ status: "error", title: "エラー", message: res.errMsg }));
    }
  };

  return (
    <>
      <div className="module-spacer--xl" />
      <Grid stackable padding="horizontal">
        <Grid.Column width="8" style={{ textAlign: "center", padding: "2rem" }}>
          <div className="module-spacer--xl" />
          <h1 style={{ textShadow: "2px 2px 3px white", color: Color.secondary }}>ログイン</h1>
          <form onSubmit={handleSubmit(sendInfo)}>
            <PrimaryText
              getValues={getValues}
              register={register}
              validation={{ required: true }}
              name="email"
              type="text"
              label="メールアドレス"
            />
            <PrimaryText
              getValues={getValues}
              register={register}
              validation={{ required: true }}
              name="password"
              type="password"
              label="パスワード"
            />
            <div className="module-spacer--xl" />
            <PrimaryButton type="submit" content="ログイン" />
            <div className="module-spacer--xl" />
          </form>
          <Link href="/signup">
            <a>会員登録はこちら</a>
          </Link>
          <Link href="/reset">
            <a>パスワードを忘れた方はこちら</a>
          </Link>
        </Grid.Column>
        <Grid.Column textAlign="center" width="8">
          <div className="module-spacer--xl" />
          <div className="module-spacer--md" />
          <img src="shopLogo.jpg" className={style.mainImg} />
        </Grid.Column>
      </Grid>
    </>
  );
};

export default login;
