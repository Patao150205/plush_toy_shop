import React, { FC } from "react";
import style from "styles/pages/products.module.scss";
import SearchSideBar from "components/products/SearchSideBar";
import { Segment, Grid } from "semantic-ui-react";
import ExtractProducts from "../../src/components/products/ExtractProducts";
import ProductCard from "../../src/components/products/ProductCard";

const Products: FC = () => {
  return (
    <div className={style.root}>
      <Grid>
        <Grid.Row>
          <Grid.Column width={5}>
            <SearchSideBar />
          </Grid.Column>
          <Grid.Column width={11}>
            <ExtractProducts />
            <div className="module-spacer--xs" />
            <Segment>
              <ProductCard />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Products;
