import React, { FC, useEffect, useState } from "react";
import style from "styles/pages/products/products.module.scss";
import SearchSideBar from "components/products/SearchSideBar";
import { Segment, Grid } from "semantic-ui-react";
import ExtractProducts from "../../src/components/products/ExtractProducts";
import ProductCard from "../../src/components/products/ProductCard";
import { GetServerSideProps } from "next";
import { getProducts } from "utils/products";
import { useRouter } from "next/router";
import Pagination from "./Pagenation";

type Props = {
  datas: {
    products: [
      {
        _id: string;
        name: string;
        Hot: boolean;
        New: boolean;
        price: number;
        primaryPic: string;
      }
    ];
    count: number;
  };
};

const Products: FC<Props> = ({ datas }) => {
  const router = useRouter();
  const [productsData, setProductsData] = useState(datas);

  useEffect(() => {}, [router.query]);

  return (
    <div className={style.root}>
      <Grid>
        <Grid.Row>
          <Grid.Column width={5}>
            <SearchSideBar />
          </Grid.Column>
          <Grid.Column width={11}>
            <ExtractProducts totalNumber={productsData.count} />
            <div className="module-spacer--xs" />
            <Segment>
              <div className={style.productsList}>
                {productsData.products.map((product) => (
                  <ProductCard
                    key={product._id}
                    productId={product._id}
                    name={product.name}
                    price={product.price}
                    productPic={product.primaryPic}
                  />
                ))}
              </div>
            </Segment>
            <div className={style.pagenation}>
              <Pagination totalNumber={productsData.count} />
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Products;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const datas = await getProducts();
  return { props: { datas } };
};
