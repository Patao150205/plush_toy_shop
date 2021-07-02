import React, { FC } from "react";
import { useAppDispatch, useAppSelector } from "../src/stores/store";
import { increment } from "../src/stores/userSlice";
import axios from "axios";
import Link from "next/link";
import styles from "styles/test.module.scss";

type Props = {
  data: any[];
};

const Home: FC<Props> = ({ data }) => {
  const dispatch = useAppDispatch();
  const ammount = useAppSelector((state) => state.user.value);
  return (
    <>
      <div className={styles.test}></div>
      <p>{ammount}</p>
      <button onClick={() => dispatch(increment())}>増加</button>
      <Link href="/login">
        <a>クリック</a>
      </Link>
    </>
  );
};

export default Home;

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const res = await axios.get("https://jsonplaceholder.typicode.com/comments");
//   console.log(res);
//   console.log(ctx);
//   return { props: { data: res.data } };
// };