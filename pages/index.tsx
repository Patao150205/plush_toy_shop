import React, { FC } from "react";
import { useAppDispatch, useAppSelector } from "../src/stores/store";
import Link from "next/link";

type Props = {
  data: any;
};

const Home: FC<Props> = ({ data }) => {
  const dispatch = useAppDispatch();
  return <></>;
};

export default Home;

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const res = await axios.get("https://jsonplaceholder.typicode.com/comments");
//   console.log(res);
//   console.log(ctx);
//   return { props: { data: res.data } };
// };
