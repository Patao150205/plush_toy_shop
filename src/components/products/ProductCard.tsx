import React, { FC } from "react";
import { Card, Icon } from "semantic-ui-react";

const ProductCard: FC = () => {
  return (
    <div>
      <Card
        image="/shopLogo.jpg"
        header="いぬまるくん"
        meta="可愛い系"
        description="めちゃくちゃかわいい柴犬くん！かわいすぎてもうぶっ倒れそう。ﾊﾞﾀｯ 😍"
        extra={<h1>1990円</h1>}
      />
    </div>
  );
};

export default ProductCard;
