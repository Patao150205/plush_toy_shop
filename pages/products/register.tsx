import React, { FC, useState, useRef, useEffect } from "react";
import { Form, Header, Segment, Image } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "stores/store";
import { LoadingON, LoadingOFF, ModalOpen } from "stores/settingSlice";
import { uploadImg } from "utils/uploadImg";
import { ProductData, registProduct } from "utils/products";
import DragAndDrop from "components/layout/DragAndDrop";
import style from "styles/pages/products/register.module.scss";
import Head from "next/head";
import { GetServerSideProps } from "next";
import nookies from "nookies";
import { authTokenAndRoot } from "utils/auth";

const Register: FC = () => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<any>(null);
  const dispatch = useAppDispatch();
  const [productsImg, setProductsImg] = useState<File[]>([]);
  const [previewImg, setPreviewImg] = useState<any[]>([]);

  // ドラッグ＆ドロップ
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    const url = URL.createObjectURL(files[0]);
    setProductsImg((prev) => [...prev, files[0]]);
    setPreviewImg((prev) => [...prev, url]);
  };

  // プレビュー 送信用の配列作成
  const handleImgs = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (productsImg.length === 5) {
      return;
    }
    const { files } = e.target;
    if (!files) return;
    const url = URL.createObjectURL(files[0]);
    setProductsImg((prev) => [...prev, files[0]]);
    setPreviewImg((prev) => [...prev, url]);
  };

  const deletePic = (index: number) => {
    setProductsImg((prev) => prev.filter((_, i) => i !== index));
    setPreviewImg((prev) => prev.filter((_, i) => i !== index));
  };

  const sendData = async (data: ProductData) => {
    setLoading(true);
    dispatch(LoadingON());
    // cloudinaryにアップロード
    if (productsImg.length > 0) {
      const urls = await uploadImg(productsImg);
      if (urls) {
        data.productPic = urls;
      }

      // PrimaryPicの生成
      if (!data.selectPic || !data.productPic) return;

      const primaryPicIndex = parseInt(data.selectPic);
      data.primaryPic = data.productPic[primaryPicIndex];
      delete data.selectPic;
    }

    const res = await registProduct(data);
    if (!res.err) {
      dispatch(ModalOpen({ status: "success", title: "登録成功", message: res }));
    } else {
      dispatch(ModalOpen({ status: "error", title: "エラー", message: res.errMsg }));
    }
    setLoading(false);
    dispatch(LoadingOFF());
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <Head>
        <title>Yuruhuwa 在庫登録</title>
      </Head>
      <Segment textAlign="center">
        <div className="module-spacer--xl" />
        <Header textAlign="center">商品の登録</Header>
        <div className="module-spacer--sm" />
        <Form size="large" loading={loading} onSubmit={handleSubmit(sendData)}>
          <Form.Group grouped>
            <Form.Field style={{ margin: "0 auto" }} required width="10">
              <label>商品名</label>
              <input autoFocus type="text" {...register("name")} required placeholder="商品名" />
            </Form.Field>

            <div className="module-spacer--sm" />
            <input type="file" onChange={handleImgs} accept="image/*" ref={fileInputRef} style={{ display: "none" }} />

            <DragAndDrop inputRef={fileInputRef} handleDrop={handleDrop} />

            {previewImg.length > 0 && (
              <Segment style={{ maxWidth: "700px", width: "100%", margin: "0 auto" }}>
                <Header content="画像のプレビュー" subheader="メインの画像を選択してください。" textAlign="center" />
                <div className={style.preview}>
                  {previewImg.map((url, i) => (
                    <label key={i}>
                      <div className={style.picWrapper}>
                        <Image style={{ cursor: "pointer" }} size="small" bordered centered src={url} />
                        <i onClick={() => deletePic(i)} className={`fas fa-times ${style.delete}`}></i>
                        <input {...register("selectPic")} required type="radio" value={i} name="selectPic" />
                      </div>
                    </label>
                  ))}
                </div>
              </Segment>
            )}
            <div className="module-spacer--sm" />
            <Form.Field style={{ margin: "0 auto" }} required width="3">
              <label>値段</label>
              <input autoFocus type="number" min="0" {...register("price")} required placeholder="値段" />
            </Form.Field>
            <Form.Field style={{ margin: "0 auto" }} required width="3">
              <label>在庫数</label>
              <input autoFocus type="number" min="0" {...register("stock")} required placeholder="在庫数" />
            </Form.Field>
            <div className="module-spacer--sm" />
            <Form.Field required style={{ margin: "0 auto" }} width="10">
              <label>カテゴリー</label>
              <select {...register("category")} required>
                <option style={{ color: "#CECECE", display: "none" }} value="">
                  カテゴリーを選択してください
                </option>
                <option value="可愛い系">可愛い系</option>
                <option value="かっこいい系">かっこいい系</option>
              </select>
            </Form.Field>
          </Form.Group>
          <Form.Group style={{ justifyContent: "center" }}>
            <Form.Field required>
              <label>W (Width)</label>
              <input min="1" type="number" {...register("width")} required placeholder="幅" />
            </Form.Field>
            <Form.Field required>
              <label>H (Height)</label>
              <input type="number" min="1" {...register("height")} required placeholder="幅" />
            </Form.Field>
            <Form.Field required>
              <label>D (Deepth)</label>
              <input type="number" min="1" {...register("deepth")} required placeholder="奥行き" />
            </Form.Field>
          </Form.Group>
          <Form.Group style={{ justifyContent: "center" }}>
            <Form.Field>
              <label>新着商品(New)</label>
              <input style={{ width: "30px", height: "30px" }} type="checkbox" {...register("New", { value: true })} />
            </Form.Field>
            <Form.Field>
              <label>人気商品(Hot)</label>
              <input style={{ width: "30px", height: "30px" }} type="checkbox" {...register("Hot")} />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field style={{ margin: "0 auto" }} width="10" required>
              <label>商品の説明</label>
              <textarea {...register("description")} rows={5} required placeholder="商品の説明" />
            </Form.Field>
          </Form.Group>
          <div className="module-spacer--md" />
          <Form.Button icon="send" color="blue" size="large" content="送信" />
          <div className="module-spacer--md" />
        </Form>
      </Segment>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = nookies.get(ctx).token;
  const res = await authTokenAndRoot(token);
  switch (res.errMsg) {
    case "rootUserOnly":
      return {
        redirect: {
          statusCode: 302,
          destination: "/",
        },
      };
    case "JsonWebTokenError":
      return {
        redirect: {
          statusCode: 302,
          destination: "/login",
        },
      };
  }

  return { props: {} };
};

export default Register;
