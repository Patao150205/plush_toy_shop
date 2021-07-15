import React, { FC, useState } from "react";
import { Segment, Header, Form } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "stores/store";

type Props = {};

const Address: FC<Props> = () => {
  const { register, handleSubmit } = useForm();

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const sendData = (data) => {};

  return (
    <Segment>
      <div className="module-spacer--xl" />
      <Header textAlign="center">住所登録</Header>
      <Form size="large" loading={loading} onSubmit={handleSubmit(sendData)}>
        <Form.Field style={{ margin: "0 auto" }} required width="10">
          <label>商品名</label>
          <input autoFocus type="text" {...register("name")} required placeholder="商品名" />
        </Form.Field>
      </Form>
    </Segment>
  );
};

export default Address;
