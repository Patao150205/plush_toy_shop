import React, { FC, useEffect, useState } from "react";
import { Segment, Header, Form, Message, Button } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useAppDispatch } from "stores/store";
import { AddressData, getAddressData, sendAddressData } from "utils/address";
import { LoadingOFF, LoadingON, ModalOpen } from "stores/settingSlice";
import { GetServerSideProps } from "next";
import nookies from "nookies";
import Head from "next/head";
import style from "styles/pages/address.module.scss";
import { useRouter } from "next/router";
import AddressTable from "components/address/AddressTable";

type Props = {
  address: AddressData | null;
};

const Address: FC<Props> = ({ address }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const sendData = async (data: AddressData) => {
    dispatch(LoadingON);
    const res = await sendAddressData(data);
    if (!res.err) {
      router.reload();
    } else {
      dispatch(
        ModalOpen({ stauts: "error", title: "エラー", message: "エラーが発生しました。もう一度お試しください。" })
      );
    }
    dispatch(LoadingOFF);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Head>
        <title>Yuruhuwa 【住所確認・登録・変更】</title>
      </Head>
      <Segment>
        <div className="module-spacer--xl" />
        <Header textAlign="center">住所確認・登録・変更</Header>
        {address !== null ? (
          <div className={style.addressWrapper}>
            <AddressTable address={address} />
            <div className="module-spacer--sm" />
          </div>
        ) : (
          <div className={style.addressWrapper}>
            <Message>
              <Message.Header>住所がまだ登録がされていません。</Message.Header>
              <p>下のフォームから、住所登録を行ってください。</p>
            </Message>
            <div className="module-spacer--sm" />
          </div>
        )}
        <div className="u-text--center">
          <Button color="blue" onClick={() => setIsOpen((prev) => !prev)}>
            住所の入力
          </Button>
        </div>
        {isOpen && (
          <Form size="large" onSubmit={handleSubmit(sendData)}>
            <Form.Field style={{ margin: "0 auto" }} required width="10">
              <label>姓</label>
              <input autoFocus type="text" {...register("lastname")} required placeholder="姓" />
            </Form.Field>
            <div className="module-spacer--sm" />
            <Form.Field style={{ margin: "0 auto" }} required width="10">
              <label>名</label>
              <input type="text" {...register("firstname")} required placeholder="名" />
            </Form.Field>
            <div className="module-spacer--sm" />
            <Form.Field style={{ margin: "0 auto" }} required width="10">
              <label>電話番号</label>
              <input
                type="text"
                {...register("phoneNumber", {
                  pattern: {
                    value: /^0\d{9,10}$/,
                    message: "正しく電話番号を入力してください。",
                  },
                })}
                required
                placeholder="電話番号"
              />
              <ErrorMessage
                errors={errors}
                name="phoneNumber"
                render={({ message }) => <p style={{ color: "red", marginTop: "10px" }}>{message}</p>}
              />
            </Form.Field>
            <div className="module-spacer--sm" />
            <Form.Field style={{ margin: "0 auto" }} required width="10">
              <label>郵便番号</label>
              <input
                type="text"
                {...register("postcord", {
                  pattern: { value: /^\d{7}$/, message: "正しく郵便番号を入力してください" },
                })}
                required
                placeholder="郵便番号"
              />
              <ErrorMessage
                errors={errors}
                name="postcord"
                render={({ message }) => <p style={{ color: "red", marginTop: "10px" }}>{message}</p>}
              />
            </Form.Field>
            <div className="module-spacer--sm" />
            <Form.Field style={{ margin: "0 auto" }} required width="10">
              <label>都道府県</label>
              <input type="text" {...register("prefecture")} required placeholder="都道府県" />
            </Form.Field>
            <div className="module-spacer--sm" />
            <Form.Field style={{ margin: "0 auto" }} required width="10">
              <label>市区町村</label>
              <input type="text" {...register("city")} required placeholder="市区町村" />
            </Form.Field>
            <div className="module-spacer--sm" />
            <Form.Field style={{ margin: "0 auto" }} required width="10">
              <label>番地</label>
              <input type="text" {...register("streetAddress")} required placeholder="番地" />
            </Form.Field>
            <div className="module-spacer--sm" />
            <Form.Field style={{ margin: "0 auto" }} width="10">
              <label>建物名・マンション名・部屋番号</label>
              <input type="text" {...register("building")} placeholder="建物名・マンション名・部屋番号" />
            </Form.Field>
            <div className="module-spacer--sm" />
            <div className="module-spacer--xl" />
            <div className="u-text--center">
              <Form.Button color="blue" onClick={() => handleSubmit(sendData)}>
                送信
              </Form.Button>
            </div>
            <div className="module-spacer--md" />
          </Form>
        )}
      </Segment>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = nookies.get(ctx).token;
  const address = await getAddressData(token);
  return { props: { address } };
};

export default Address;
