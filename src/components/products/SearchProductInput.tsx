import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { Input, Icon, Form } from "semantic-ui-react";
import { userInfoSelector } from "stores/userSlice";

const SearchProductInput: FC = () => {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();
  const root = useSelector(userInfoSelector).role;
  const rootQuery = root === "root" ? "&root=root" : "";
  const handleSearch = () => {
    router.push(`/products?kind=keyword&keyword=${keyword}${rootQuery}`);
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
