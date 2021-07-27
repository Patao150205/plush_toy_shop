import React, { FC, useState, useRef, useEffect } from "react";
import { Form, Header, Segment, Image } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "stores/store";
import { LoadingON, LoadingOFF, ModalOpen } from "stores/settingSlice";
import { uploadImg } from "utils/uploadImg";
import { getProduct, modifyProduct, ProductData } from "utils/products";
import DragAndDrop from "components/layout/DragAndDrop";
import style from "styles/pages/products/register.module.scss";
import Head from "next/head";
import { GetServerSideProps } from "next";
import nookies from "nookies";
import { authTokenAndRoot } from "utils/auth";
import { useRouter } from "next/router";

type Props = {
  product: ProductData & { _id: string };
};

const Modification: FC<Props> = ({ product }) => {
  const fileInputRef = useRef<any>(null);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const [productsImg, setProductsImg] = useState<(File | string)[]>(product.productPic ?? []);
  const [previewImg, setPreviewImg] = useState<any[]>(product.productPic ?? []);
  const router = useRouter();
  const defaultPrimaryPicIndex = product.productPic?.indexOf(product.primaryPic);

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

  const sendData = async (initialData: ProductData & { _id: string }) => {
    const data = { ...initialData };
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
    data._id = product._id;
    const res = await modifyProduct(data);
    if (!res.err) {
      router.push(`/product/${data._id}`);
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
        <title>Yuruhuwa 【在庫編集】</title>
      </Head>
      <Segment textAlign="center">
        <div className="module-spacer--xl" />
        <Header textAlign="center">商品の編集</Header>
        <div className="module-spacer--sm" />
        <Form size="large" loading={loading} onSubmit={handleSubmit(sendData)}>
          <Form.Group grouped>
            <Form.Field style={{ margin: "0 auto" }} required width="10">
              <label>商品名</label>
              <input
                autoFocus
                type="text"
                {...register("name", { value: product.name })}
                required
                placeholder="商品名"
              />
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
                        <input
                          {...register("selectPic")}
                          defaultChecked={i === defaultPrimaryPicIndex && true}
                          required
                          type="radio"
                          value={i}
                          name="selectPic"
                        />
                      </div>
                    </label>
                  ))}
                </div>
              </Segment>
            )}
            <div className="module-spacer--sm" />
            <Form.Field style={{ margin: "0 auto" }} required width="3">
              <label>値段</label>
              <input
                autoFocus
                type="number"
                min="0"
                {...register("price", { value: product.price })}
                required
                placeholder="値段"
              />
            </Form.Field>
            <div className="module-spacer--sm" />
            <Form.Field style={{ margin: "0 auto" }} required width="3">
              <label>在庫数</label>
              <input
                autoFocus
                type="number"
                min="0"
                {...register("stock", { value: product.stock })}
                required
                placeholder="在庫数"
              />
            </Form.Field>
            <div className="module-spacer--sm" />
            <Form.Field required style={{ margin: "0 auto" }} width="10">
              <label>カテゴリー</label>
              <select {...register("category", { value: product.category })} required>
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
              <input min="1" type="number" {...register("width", { value: product.width })} required placeholder="幅" />
            </Form.Field>
            <Form.Field required>
              <label>H (Height)</label>
              <input
                type="number"
                min="1"
                {...register("height", { value: product.height })}
                required
                placeholder="幅"
              />
            </Form.Field>
            <Form.Field required>
              <label>D (Deepth)</label>
              <input
                type="number"
                min="1"
                {...register("deepth", { value: product.deepth })}
                required
                placeholder="奥行き"
              />
            </Form.Field>
          </Form.Group>
          <Form.Group style={{ justifyContent: "center" }}>
            <Form.Field>
              <label>新着商品(New)</label>
              <input
                style={{ width: "30px", height: "30px" }}
                type="checkbox"
                {...register("New", { value: product.New })}
              />
            </Form.Field>
            <Form.Field>
              <label>人気商品(Hot)</label>
              <input
                style={{ width: "30px", height: "30px" }}
                type="checkbox"
                {...register("Hot", { value: product.Hot })}
              />
            </Form.Field>
            <Form.Field>
              <label>商品陳列</label>
              <input
                style={{ width: "30px", height: "30px" }}
                type="checkbox"
                {...register("isRelease", { value: product.isRelease })}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field style={{ margin: "0 auto" }} width="10" required>
              <label>商品の説明</label>
              <textarea
                {...register("description", { value: product.description })}
                rows={5}
                required
                placeholder="商品の説明"
              />
            </Form.Field>
          </Form.Group>
          <p style={{ fontSize: "0.8rem" }}>
            <span className="u-text--emphasis">注:</span>{" "}
            在庫数を減らすまたは、商品陳列を解除する操作を行う場合、顧客のカートから該当の商品が削除されてしまいます。
          </p>
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
  const authentication = await authTokenAndRoot(token);
  switch (authentication.errMsg) {
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
  const productId = (ctx.params?.productId as string) ?? "";
  const res = await getProduct(productId);
  return { props: { product: res.product } };
};

export default Modification;
