import React, { FC, useEffect, useState, useRef } from "react";
import style from "styles/pages/products/products.module.scss";
import SearchSideBar from "components/products/SearchSideBar";
import { Segment } from "semantic-ui-react";
import ExtractProducts from "../../src/components/products/ExtractProducts";
import ProductCard from "../../src/components/products/ProductCard";
import { GetServerSideProps } from "next";
import { getProducts } from "utils/products";
import { useRouter } from "next/router";
import Pagination from "./Pagenation";
import NoProduct from "./NoProduct";
import { useAppSelector } from "stores/store";
import { favoritesSelector, cartSelector } from "stores/userSlice";

type Props = {
  datas: {
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
          }
        ]
      | [];
    count: number;
  };
};

const Products: FC<Props> = ({ datas }) => {
  const router = useRouter();
  const favorites = useAppSelector((state) => state.user.favorites);
  const [productsData, setProductsData] = useState(datas);
  const [sort, setSort] = useState(1);
  const query = router.query;

  const isFirstRender = useRef(false);

  // サーバサイドレンダリングするため初回のuseEffect発火を防止する。
  useEffect(() => {
    document.title = "Yuruhuwa 【商品一覧】";
    if (isFirstRender.current) {
      const fetchProducts = async () => {
        const res = await getProducts(router.asPath);
        setProductsData(res);
      };
      fetchProducts();
    }
  }, [query]);

  useEffect(() => {
    isFirstRender.current = true;
  }, []);

  return (
    <div className={style.root}>
      <div className={style.sideBar}>
        <SearchSideBar />
      </div>

      <div>
        <ExtractProducts sort={sort} setSort={setSort} totalNumber={productsData.count} />
        <div className="module-spacer--xs" />
        <Segment>
          {productsData.products.length === 0 && <NoProduct />}
          <div className={style.productsList}>
            {productsData.products.map((product) => (
              <ProductCard
                favorites={favorites}
                key={product._id}
                productId={product._id}
                name={product.name}
                price={product.price}
                productPic={product.primaryPic}
                isNew={product.New}
                isHot={product.Hot}
                height={product.height}
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
  const datas = await getProducts(ctx.resolvedUrl);
  return { props: { datas } };
};
