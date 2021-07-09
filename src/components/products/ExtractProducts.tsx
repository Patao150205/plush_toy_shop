import React from "react";
import style from "./ExtractProducts.module.scss";
import { Segment, Select } from "semantic-ui-react";

const ExtractProducts = () => {
  return (
    <Segment>
      <div className={style.root}>
        <p>
          <span>おすすめ</span>で検索中
        </p>
        <Select
          options={[
            {
              value: "size",
              text: "サイズ",
            },
            {
              value: "price",
              text: "価格",
            },
          ]}
        />

        <p>1 ~ 20件 / 500件</p>
      </div>
    </Segment>
  );
};

export default ExtractProducts;
