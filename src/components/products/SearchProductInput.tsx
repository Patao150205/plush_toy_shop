import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import { Input, Icon, Form } from "semantic-ui-react";

const SearchProductInput: FC = () => {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();
  const handleSearch = () => {
    router.push(`/products?kind=keyword&keyword=${keyword}`);
  };

  return (
    <div>
      <Form onSubmit={handleSearch}>
        <Input
          style={{ borderRadius: "30%" }}
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
          icon={<Icon name="search" onClick={handleSearch} inverted circular link />}
          placeholder="商品検索..."
        />
      </Form>
    </div>
  );
};

export default SearchProductInput;
