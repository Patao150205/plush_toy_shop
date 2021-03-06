import { GetServerSideProps } from "next";
import React, { FC, useState } from "react";
import nookies from "nookies";
import { getOrderList } from "utils/products";
import Head from "next/head";
import { Segment, Pagination } from "semantic-ui-react";
import style from "styles/pages/products/order.module.scss";
import NoProduct from "./NoProduct";
import { useRouter } from "next/router";
import { useAppDispatch } from "stores/store";
import cookies from "js-cookie";
import { ModalOpen } from "stores/settingSlice";
import OrderCard from "components/products/OrderCard";
import { AddressData } from "utils/address";

export type Address = AddressData & { user: string };
type Props = {
  orderProps: [
    {
      address: Address;
      order: {
        user: {
          _id: string;
          nickname: string;
          email: string;
          role: "root" | "user";
          password: string;
          isShorthandEmail: boolean;
        };
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
        status: "noSent" | "sent";
      };
    }
  ];
  page: string;
  orderCount: number;
};
type Order = {
  user: {
    _id: string;
    nickname: string;
    email: string;
    role: "root" | "user";
    password: string;
    isShorthandEmail: boolean;
  };
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
  status: "noSent" | "sent";
  _id: string;
};

const Order: FC<Props> = ({ orderProps, page, orderCount }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const totalPages = Math.ceil(orderCount / 2);

  const [orders, setOrders] = useState(orderProps);

  const handlePageChange = async (page: number) => {
    router.push(`/products/order?p=${page}`);
    const token = cookies.get("token");
    if (!token) return router.push("/login?attention=true");
    const res = await getOrderList(token, page);
    if (res.message === "JsonWebTokenError") {
      return router.push("/login?attention=true");
    }
    if (res.err) {
      return dispatch(ModalOpen({ status: "error", title: "?????????", message: res.message }));
    }

    setOrders(res.orders);
  };

  return (
    <>
      <Head>
        <title>Yuruhuwa ?????????????????????</title>
      </Head>
      <Segment>
        <div className={style.root}>
          <h1 className={style.title}>???????????????</h1>
          <div className={`module-spacer--sm ${style.border}`} />
          <div className={`module-spacer--sm`} />
          {orders.length > 0 ? (
            orders.map((order) => <OrderCard key={order.order._id} orderProps={order} />)
          ) : (
            <div className={style.noProductWrapper}>
              <NoProduct header="????????????????????????????????????" />
            </div>
          )}
          <div className={`module-spacer--sm`} />
          {orders.length > 0 ? (
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
          ) : (
            <></>
          )}
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
        destination: "/login?attention=true",
      },
    };
  }
  const res = await getOrderList(token, page);
  switch (res.message) {
    case "rootUserOnly":
      return {
        redirect: {
          statusCode: 302,
          destination: "/",
        },
      };
    case "JsonWebTokenError":
      return {
        redirect: {
          statusCode: 302,
          destination: "/login?attention=true",
        },
      };
  }

  return { props: { orderProps: res.orders, page, orderCount: res.orderCount } };
};

export default Order;
