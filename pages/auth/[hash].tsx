import { GetServerSideProps } from "next";
import React, { FC } from "react";
import { confirmCurrectHash } from "utils/auth";
import cookies from "js-cookie";

const Confirm: FC<{ token: string }> = ({ token }) => {
  cookies.set("token", token);

  return <div></div>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!ctx.params)
    return {
      redirect: {
        statusCode: 302,
        destination: "/login",
      },
    };

  const hash = ctx.params.hash as string;
  const res = await confirmCurrectHash(hash);
  if (res.error) {
    return {
      redirect: {
        statusCode: 302,
        destination: "/login",
      },
    };
  } else {
    return { props: { token: res.token } };
  }
};

export default Confirm;
