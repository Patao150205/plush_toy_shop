import { GetServerSideProps } from "next";
import React, { FC } from "react";

const ProductId: FC = () => {
  console.log("こんにちは");
  return <div>こんにちは</div>;
};

export default ProductId;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  console.log(ctx.query);
  return { props: {} };
};
