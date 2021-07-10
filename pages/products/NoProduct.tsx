import React, { FC } from "react";
import { Message } from "semantic-ui-react";

const NoProduct: FC = () => {
  return (
    <div>
      <Message icon="search" header="商品情報が見つかりませんでした。" />
    </div>
  );
};

export default NoProduct;
