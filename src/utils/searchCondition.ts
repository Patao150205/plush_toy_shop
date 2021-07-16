import { ParsedUrlQuery } from "querystring";

export const extractQuery = (query: ParsedUrlQuery): string | undefined => {
  // 検索条件の絞り込み
  switch (query.kind) {
    case "keyword":
      return query.keyword as string;
    case undefined:
      return "すべて";
    case "hot":
      return "おすすめ";

    case "new":
      return "新商品";
    case "genre":
      switch (query.genre) {
        case "可愛い系":
          return "可愛い系";

        case "かっこいい系":
          return "かっこいい系";
      }
      return;
    case "price":
      switch (query.price) {
        case "0-2999":
          return "0円 ~ 2999円";

        case "3000-5999":
          return "3000円 ~ 5999円";

        case "7000-9999":
          return "6000円 ~ 9999円";

        case "10000-":
          return "10000円 ~ ";
      }
      return;
    case "size":
      switch (query.size) {
        case "1-29":
          return "1cm ~ 29cm";

        case "30-59":
          return "30cm ~ 59cm";

        case "60-89":
          return "60cm ~ 89cm";

        case "90-129":
          return "90cm ~ 129cm";

        case "130-":
          return "130cm 以上";
      }
  }
};
