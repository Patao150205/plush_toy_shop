import React, { FC, useEffect, useState, useRef } from "react";
import style from "styles/pages/products/products.module.scss";
import SearchSideBar from "components/products/SearchSideBar";
import { Segment } from "semantic-ui-react";
import ExtractProducts from "../../src/components/products/ExtractProducts";
import ProductCard from "../../src/components/products/ProductCard";
import { GetServerSideProps } from "next";
import { getProducts, getProductsRoot } from "utils/products";
import { useRouter } from "next/router";
import Pagination from "./Pagenation";
import NoProduct from "./NoProduct";
import { useAppSelector } from "stores/store";
import nookies from "nookies";
import cookies from "js-cookie";

type Props = {
  datas:
    | {
        products:
          | [
              {
                _id: string;
                name: string;
                Hot: boolean;
                New: boolean;
                price: number;
                primaryPic: string;
                height: number;
                isRelease: boolean;
              }
            ]
          | [];
        count: number;
      }
    | undefined;
};

const strIns = (str: string, idx: number, val: string) => {
  const res = str.slice(0, idx) + val + str.slice(idx);
  return res;
};

const Products: FC<Props> = ({ datas }) => {
  const router = useRouter();
  const favorites = useAppSelector((state) => state.user.favorites);
  const [productsData, setProductsData] = useState(datas);
  const query = router.query;

  const isFirstRender = useRef(false);

  // サーバサイドレンダリングするため初回のuseEffect発火を防止する。
  useEffect(() => {
    document.title = "Yuruhuwa 【商品一覧】";
    if (isFirstRender.current) {
      const fetchProducts = async () => {
        let res;
        if (!query.root || query.root !== "root") {
          res = await getProducts(router.asPath);
        } else {
          const token = cookies.get("token");
          if (!token) return;
          // 完成形 /products/root?root=root
          const relativePath = strIns(router.asPath, 9, "/root");
          res = await getProductsRoot(relativePath, token);
        }

        setProductsData(res);
      };
      fetchProducts();
    }
  }, [query]);

  useEffect(() => {
    isFirstRender.current = true;
  }, []);

  if (!productsData) {
    return <NoProduct />;
  }

  return (
    <div className={style.root}>
      <div className={style.sideBar}>
        <SearchSideBar />
      </div>

      <div>
        <ExtractProducts totalNumber={productsData.count} />
        <div className="module-spacer--xs" />
        <Segment>
          {productsData.products.length === 0 && <NoProduct />}
          <div className={style.productsList}>
            {productsData.products.map((product) => (
              <ProductCard
                favorites={favorites}
                key={product._id}
                product={product}
                setProductsData={setProductsData}
              />
            ))}
          </div>
        </Segment>
        {productsData.products.length > 0 && (
          <div className={style.pagenation}>
            <Pagination totalNumber={productsData.count} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let datas;

  if (!ctx.query.root || ctx.query.root !== "root") {
    datas = await getProducts(ctx.resolvedUrl);
  } else {
    const token = nookies.get(ctx).token;
    // 完成形 /products/root?root=root
    const relativePath = strIns(ctx.resolvedUrl, 9, "/root");
    datas = await getProductsRoot(relativePath, token);
  }
  console.log(datas);
  return { props: { datas } };
};
