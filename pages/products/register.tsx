import React, { FC, useState, useRef } from "react";
import { Form, Header, Segment, Icon, Button, Image } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "stores/store";
import { ModalOpen } from "stores/settingSlice";

type ProductData = {};

const Register: FC = () => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<any>(null);
  const dispatch = useAppDispatch();
  const [productsImg, setProductsImg] = useState<string[]>([]);

  const handleImgs = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (productsImg.length === 5) {
      return dispatch(
        ModalOpen({ status: "error", title: "画像エラー", message: "登録可能な画像の枚数は、5枚までです。" })
      );
    }
    const { files } = e.target;
    if (!files) return;
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result) {
        setProductsImg((prev) => [...prev, reader.result]);
      }
    };
    reader.readAsDataURL(files[0] as Blob);
  };

  const sendData = (data: ProductData) => {
    setLoading(true);
    setTimeout(() => {
      console.log(data);
      setLoading(false);
    }, 3000);
  };

  return (
    <>
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

            <div style={{ maxWidth: "700px", width: "100%", margin: "0 auto" }}>
              <Segment placeholder size="huge">
                <Header icon>
                  <Icon name="file image outline" />
                  画像をドラッグ＆ドロップしてください。
                </Header>
                <div className="module-spacer--sm" />
                <Button primary type="button" onClick={() => fileInputRef.current?.click() as any}>
                  画像を追加
                </Button>
              </Segment>
            </div>

            {productsImg.length > 0 && (
              <Segment style={{ maxWidth: "700px", width: "100%", margin: "0 auto" }}>
                <Header content="画像のプレビュー" textAlign="center"></Header>
                <Image.Group>
                  {productsImg.map((url, i) => (
                    <Image size="small" bordered centered key={i} src={url} />
                  ))}
                </Image.Group>
              </Segment>
            )}

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
              <input
                type="text"
                style={{ textAlign: "right" }}
                {...register("width", { value: "cm" })}
                required
                placeholder="幅"
              />
            </Form.Field>
            <Form.Field required>
              <label>H (Height)</label>
              <input
                type="text"
                style={{ textAlign: "right" }}
                {...register("height", { value: "cm" })}
                required
                placeholder="幅"
              />
            </Form.Field>
            <Form.Field required>
              <label>D (Deepth)</label>
              <input
                type="text"
                style={{ textAlign: "right" }}
                {...register("deepth", { value: "cm" })}
                required
                placeholder="奥行き"
              />
            </Form.Field>
          </Form.Group>
          <Form.Group grouped>
            <Form.Field>
              <label>新着商品(New)</label>
              <input style={{ width: "30px", height: "30px" }} type="checkbox" {...register("isNew")} required />
            </Form.Field>
            <Form.Field>
              <label>人気商品(Hot)</label>
              <input style={{ width: "30px", height: "30px" }} type="checkbox" {...register("isHot")} required />
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

export default Register;
