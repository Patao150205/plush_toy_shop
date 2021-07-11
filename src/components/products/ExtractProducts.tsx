import React, { FC } from "react";
import style from "./ExtractProducts.module.scss";
import { Segment, Select } from "semantic-ui-react";
import { useRouter } from "next/router";
import { extractQuery } from "utils/searchCondition";
import SelectSort from "./SelectSort";

type Props = {
  totalNumber: number;
  sort: number;
  setSort: React.Dispatch<React.SetStateAction<number>>;
};

const ExtractProducts: FC<Props> = ({ totalNumber, sort, setSort }) => {
  const router = useRouter();
  const query = router.query;

  const searchTarget = extractQuery(query);

  // 検索件数の計算
  // query.p が存在しなければ初期値 1
  const currentPage = parseInt(query.p as string) || 1;
  //総商品数が0の場合0件
  const first = totalNumber === 0 ? 0 : 20 * (currentPage - 1) + 1;
  const end = totalNumber === 0 ? 0 : first + totalNumber + -20 * (currentPage - 1) - 1;

  return (
    <Segment>
      <div className={style.root}>
        <p>
          <span className={style.searchStatus}>{searchTarget} </span>で検索中
        </p>
        <SelectSort />
        <p>
          {first}件 ~ {end}件 / {totalNumber}件
        </p>
      </div>
    </Segment>
  );
};

export default ExtractProducts;
