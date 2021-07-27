import { useRouter } from "next/router";
import React, { FC, useState, useEffect } from "react";

const SelectSort: FC = () => {
  const router = useRouter();
  const query = router.query;
  const [selectValue, setSelectValue] = useState(1);
  const root = query.root as string | undefined;
  const rootQuery = root === "root" ? "&root=root" : "";

  useEffect(() => {
    //  現在のsort番号の取得
    const sort = query.sort ? parseInt(query.sort as string) : 1;
    setSelectValue(sort);
  }, [router.query.sort]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSelectValue(parseInt(value));
    let url = `/products/?sort=${value}${rootQuery}`;
    if (query.p) url = url + `&p=${query.p}${rootQuery}`;
    if (query.kind) url = url + `&kind=${query.kind}${rootQuery}`;
    if (query.price) url = url + `&price=${query.price}${rootQuery}`;
    if (query.size) url = url + `&size=${query.size}${rootQuery}`;
    if (query.genre) url = url + `&genre=${query.genre}${rootQuery}`;
    if (query.keyword) url = url + `&keyword=${query.keyword}${rootQuery}`;

    router.push(url);
  };

  return (
    <select value={selectValue} style={{ width: "165px", height: "40px", outline: "none" }} onChange={handleChange}>
      <option value={1}>新着順</option>
      <option value={2}>サイズが小さい順</option>
      <option value={3}>サイズが大きい順</option>
      <option value={4}>価格が安い順</option>
      <option value={5}>価格が高い順</option>
    </select>
  );
};

export default SelectSort;
