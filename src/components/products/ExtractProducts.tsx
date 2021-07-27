import React, { FC, useState, useEffect } from "react";
import style from "./ExtractProducts.module.scss";
import { Segment, Modal, Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import { extractQuery } from "utils/searchCondition";
import SelectSort from "./SelectSort";
import SearchSideBar from "components/products/SearchSideBar";

type Props = {
  totalNumber: number;
};

const ExtractProducts: FC<Props> = ({ totalNumber }) => {
  const router = useRouter();
  const query = router.query;

  const searchTarget = extractQuery(query);
  const [isOpen, setIsOpen] = useState(false);

  // 検索件数の計算
  // query.p が存在しなければ初期値 1
  const currentPage = parseInt(query.p as string) || 1;
  //総商品数が0の場合0件
  const first = totalNumber === 0 ? 0 : 20 * (currentPage - 1) + 1;
  const end = totalNumber === 0 ? 0 : first + totalNumber + -20 * (currentPage - 1) - 1;

  useEffect(() => {
    setIsOpen(false);
  }, [router.query]);

  return (
    <Segment textAlign="center">
      <div className={style.extract}>
        <p>
          <span className={style.searchStatus}>{searchTarget} </span>で検索中
        </p>
        <SelectSort />
        <p>
          {first}件 ~ {end}件 / {totalNumber}件
        </p>
      </div>
      <div className={style.searchBtn}>
        <div className="module-spacer--sm" />
        <Modal
          onClose={() => setIsOpen(false)}
          onOpen={() => setIsOpen(true)}
          open={isOpen}
          style={{ marginTop: "20vh" }}
          trigger={<Button>商品を検索する</Button>}>
          <Modal.Header>商品検索</Modal.Header>
          <Modal.Content>
            <SearchSideBar />
          </Modal.Content>
          <Modal.Actions>
            <Button content="閉じる" labelPosition="right" icon="checkmark" onClick={() => setIsOpen(false)} negative />
          </Modal.Actions>
        </Modal>
      </div>
    </Segment>
  );
};

export default ExtractProducts;
