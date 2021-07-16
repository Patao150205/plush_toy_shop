import React, { FC, useState } from "react";
import style from "./SearchSideBar.module.scss";
import { Segment, Divider } from "semantic-ui-react";
import classNames from "classnames";
import { useRouter } from "next/router";
import SearchProductInput from "./SearchProductInput";

const SearchSideBar: FC = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isTabOpen, setIsTabOpen] = useState({
    open1: false,
    open2: false,
    open3: false,
  });

  const toggleTabs = (name: "open1" | "open2" | "open3") => {
    setIsTabOpen((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <>
      <Segment textAlign="center" className={style.root}>
        <div className="module-spacer--sm" />
        <label className="u-text--left">商品検索</label>
        <SearchProductInput />
        <div className="module-spacer--md" />
        <ul className={style.parentUL}>
          <li className={style.parentLI} onClick={() => router.push("/products")}>
            商品一覧<span className={`${style.all} ${style.roundIcon}`}>All</span>
          </li>
          <Divider />
          <li className={style.parentLI} onClick={() => router.push("/products/?kind=hot")}>
            おすすめから探す<span className={`${style.hot} ${style.roundIcon}`}>Hot</span>
          </li>
          <li className={style.parentLI} onClick={() => router.push("/products/?kind=new")}>
            新商品から探す<span className={`${style.new} ${style.roundIcon}`}>New</span>
          </li>
          <li
            onClick={() => toggleTabs("open1")}
            className={classNames(style.parentLI, { [style.open1]: isTabOpen.open1 })}>
            ジャンルで探す
            {isTabOpen.open1 ? (
              <span className={`fas fa-angle-down ${style.allow}`} />
            ) : (
              <span className={`fas fa-angle-up ${style.allow}`} />
            )}
            <ul className={style.childUL}>
              <li className={style.childLI} onClick={() => router.push("/products/?kind=genre&genre=可愛い系")}>
                可愛い系
              </li>
              <li className={style.childLI} onClick={() => router.push("/products/?kind=genre&genre=かっこいい系")}>
                かっこいい系
              </li>
            </ul>
          </li>
          <li
            onClick={() => toggleTabs("open2")}
            className={classNames(style.parentLI, { [style.open2]: isTabOpen.open2 })}>
            値段で探す
            {isTabOpen.open2 ? (
              <span className={`fas fa-angle-down ${style.allow}`} />
            ) : (
              <span className={`fas fa-angle-up ${style.allow}`} />
            )}
            <ul className={style.childUL}>
              <li className={style.childLI} onClick={() => router.push("/products/?kind=price&price=0-2999")}>
                0円 ~ 2999円
              </li>
              <li className={style.childLI} onClick={() => router.push("/products/?kind=price&price=3000-5999")}>
                3000円 ~ 5999円
              </li>
              <li className={style.childLI} onClick={() => router.push("/products/?kind=price&price=7000-9999")}>
                6000円 ~ 9999円
              </li>
              <li className={style.childLI} onClick={() => router.push("/products/?kind=price&price=10000-")}>
                10000円 以上
              </li>
            </ul>
          </li>
          <li
            onClick={() => toggleTabs("open3")}
            className={classNames(style.parentLI, { [style.open3]: isTabOpen.open3 })}>
            サイズで探す(縦)
            {isTabOpen.open3 ? (
              <span className={`fas fa-angle-down ${style.allow}`} />
            ) : (
              <span className={`fas fa-angle-up ${style.allow}`} />
            )}
            <ul className={style.childUL}>
              <li className={style.childLI} onClick={() => router.push("/products/?kind=size&size=1-29")}>
                1cm ~ 29cm
              </li>
              <li className={style.childLI} onClick={() => router.push("/products/?kind=size&size=30-59")}>
                30cm ~ 59cm
              </li>
              <li className={style.childLI} onClick={() => router.push("/products/?kind=size&size=60-89")}>
                60cm ~ 89cm
              </li>
              <li className={style.childLI} onClick={() => router.push("/products/?kind=size&size=90-129")}>
                90cm ~ 129cm
              </li>
              <li className={style.childLI} onClick={() => router.push("/products/?kind=size&size=130-")}>
                130cm 以上
              </li>
            </ul>
          </li>
        </ul>
      </Segment>
    </>
  );
};

export default SearchSideBar;
