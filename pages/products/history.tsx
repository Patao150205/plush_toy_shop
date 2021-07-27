import { GetServerSideProps } from "next";
import React, { FC, useState } from "react";
import nookies from "nookies";
import { getPurchaseHistory } from "utils/products";
import { Segment, Pagination } from "semantic-ui-react";
import HistoryCard from "components/products/HistoryCard";
import Head from "next/head";
import style from "styles/pages/products/history.module.scss";
import cookies from "js-cookie";
import { useRouter } from "next/router";
import { useAppDispatch } from "stores/store";
import { ModalOpen } from "stores/settingSlice";
import NoProduct from "./NoProduct";

type Props = {
  historyProp: [
    {
      user: string;
      createdAt: any;
      products: [
        {
          _id: string;
          productId: string;
          name: string;
          primaryPic: string;
          price: number;
          amount: number;
        }
      ];
      _id: string;
    }
  ];
  page: string;
  orderCount: number;
};

const History: FC<Props> = ({ historyProp, page, orderCount }) => {
  console.log(page, orderCount);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const totalPages = Math.ceil(orderCount / 2);

  const handlePageChange = async (page: number) => {
    const token = cookies.get("token");
    if (!token) return;
    const res = await getPurchaseHistory(token, page);
    if (res.message === "JsonWebTokenError") {
      return router.push("/login");
    }
    if (res.err) {
      return dispatch(ModalOpen({ status: "error", title: "エラー", message: res.message }));
    }
    setHistories(res.histories);
  };

  const [histories, setHistories] = useState(historyProp);

  return (
    <>
      <Head>
        <title>Yuruhuwa 【購入履歴】</title>
      </Head>
      <Segment>
        <div className={style.root}>
          <h1 className={style.title}>購入履歴</h1>
          <div className={`module-spacer--sm ${style.border}`} />
          <div className={`module-spacer--sm`} />
          {histories.length > 0 ? (
            histories.map((order) => <HistoryCard key={order._id} order={order} />)
          ) : (
            <div className={style.noProductWrapper}>
              <NoProduct header="注文履歴が存在しません。" />
            </div>
          )}
          <div className={`module-spacer--sm`} />
          <div className={style.pagenation}>
            <Pagination
              defaultActivePage={page}
              ellipsisItem={null}
              firstItem={null}
              lastItem={null}
              totalPages={totalPages}
              onPageChange={(_, data) => handlePageChange(data.activePage as number)}
            />
          </div>
        </div>
      </Segment>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = nookies.get(ctx).token;
  const page = ctx.query.p ? (ctx.query.p as string) : "1";
  if (!token) {
    return {
      redirect: {
        statusCode: 302,
        destination: "/login",
      },
    };
  }

  const res = await getPurchaseHistory(token, page);
  if (res.message === "JsonWebTokenError") {
    return {
      redirect: {
        statusCode: 302,
        destination: "/login",
      },
    };
  }

  return { props: { historyProp: res.histories, page, orderCount: res.orderCount } };
};

export default History;
