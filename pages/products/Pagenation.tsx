import React, { FC } from "react";
import { useRouter } from "next/router";
import { Pagination as ChangePage } from "semantic-ui-react";

type Props = {
  totalNumber: number;
};

const Pagination: FC<Props> = ({ totalNumber }) => {
  const router = useRouter();
  const query = router.query;
  const pageLength = Math.ceil(totalNumber / 20);
  const currentPage = parseInt(query.p as string) || 1;

  return (
    <ChangePage
      onPageChange={(_, data) => {
        const query = router.query;

        let url = `/products/?p=${data.activePage}`;
        
        if (query.kind) url = url + `&kind=${query.kind}`;
        if (query.price) url = url + `&price=${query.price}`;
        if (query.size) url = url + `&size=${query.size}`;
        if (query.genre) url = url + `&genre=${query.genre}`;

        router.push(url);
      }}
      defaultActivePage={currentPage}
      totalPages={pageLength}
    />
  );
};

export default Pagination;
