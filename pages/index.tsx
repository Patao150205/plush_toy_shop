import React, { FC } from "react";
import { useAppDispatch, useAppSelector } from "../src/stores/store";
import Link from "next/link";
import Head from "next/head";

type Props = {
  data: any;
};

const Top: FC<Props> = ({ data }) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <Head>
        <title>Yuruhuwa 【TOP】</title>
      </Head>
    </>
  );
};

export default Top;
