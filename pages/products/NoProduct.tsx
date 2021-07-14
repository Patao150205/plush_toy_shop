import React, { FC } from "react";
import { Message } from "semantic-ui-react";

type Props = {
  icon?: string;
  header?: string;
};

const NoProduct: FC<Props> = ({ icon = "search", header = "商品情報が見つかりませんでした。" }) => {
  return (
    <div>
      <Message icon={icon} header={header} />
    </div>
  );
};

export default NoProduct;
