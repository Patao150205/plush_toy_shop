import React, { FC } from "react";
import style from "./ExtractProducts.module.scss";
import { Segment, Select } from "semantic-ui-react";
import { useRouter } from "next/router";

type Props = {
  totalNumber: number;
};

const ExtractProducts: FC<Props> = ({ totalNumber }) => {
  const router = useRouter();
  const query = router.query;

  // 検索件数の計算
  // query.p が存在しなければ初期値 1
  const currentPage = parseInt(query.p as string) || 1;
  const first = 20 * (currentPage - 1) + 1;
  // const isLast = totalNumber - 20 * (parseInt(query.p as string) - 1) <= 20;
  const end = first + totalNumber + -20 * (currentPage - 1) - 1;

  let searchTarget: string | null = null;

  console.log(query.kind);

  // 検索条件の絞り込み
  switch (query.kind) {
    case undefined:
      searchTarget = "すべて";
      break;
    case "hot":
      searchTarget = "おすすめ";
      break;
    case "new":
      searchTarget = "新商品";
      break;
    case "genre":
      switch (query.genre) {
        case "可愛い系":
          searchTarget = "可愛い系";
          break;
        case "かっこいい系":
          searchTarget = "かっこいい系";
          break;
      }
      break;
    case "price":
      switch (query.price) {
        case "0-2999":
          searchTarget = "0円 ~ 2999円";
          break;
        case "3000-5999":
          searchTarget = "3000円 ~ 5999円";
          break;
        case "7000-9999":
          searchTarget = "6000円 ~ 9999円";
          break;
        case "10000-":
          searchTarget = "10000円 ~ ";
          break;
      }
      break;
    case "size":
      switch (query.size) {
        case "1-29":
          searchTarget = "1cm ~ 29cm";
          break;
        case "30-59":
          searchTarget = "30cm ~ 59cm";
          break;
        case "60-89":
          searchTarget = "60cm ~ 89cm";
          break;
        case "90-129":
          searchTarget = "90cm ~ 129cm";
          break;
        case "130-":
          searchTarget = "130cm 以上";
          break;
      }
      break;
  }

  return (
    <Segment>
      <div className={style.root}>
        <p>
          <span className={style.searchStatus}>{searchTarget} </span>で検索中
        </p>
        <Select
          defaultValue={"createdAt"}
          options={[
            {
              value: "createdAt",
              text: "新着順",
            },
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

        <p>
          {first}件 ~ {end}件 / {totalNumber}件
        </p>
      </div>
    </Segment>
  );
};

export default ExtractProducts;
