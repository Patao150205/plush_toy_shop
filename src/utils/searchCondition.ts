import { ParsedUrlQuery } from "querystring";

let searchTarget: string | undefined = undefined;

export const extractQuery = (query: ParsedUrlQuery): string | undefined => {
  // 検索条件の絞り込み
  switch (query.kind) {
    case undefined:
      return (searchTarget = "すべて");

    case "hot":
      return (searchTarget = "おすすめ");

    case "new":
      return (searchTarget = "新商品");

    case "genre":
      switch (query.genre) {
        case "可愛い系":
          return (searchTarget = "可愛い系");

        case "かっこいい系":
          return (searchTarget = "かっこいい系");
      }
      return;
    case "price":
      switch (query.price) {
        case "0-2999":
          return (searchTarget = "0円 ~ 2999円");

        case "3000-5999":
          return (searchTarget = "3000円 ~ 5999円");

        case "7000-9999":
          return (searchTarget = "6000円 ~ 9999円");

        case "10000-":
          return (searchTarget = "10000円 ~ ");
      }
      return;
    case "size":
      switch (query.size) {
        case "1-29":
          return (searchTarget = "1cm ~ 29cm");

        case "30-59":
          return (searchTarget = "30cm ~ 59cm");

        case "60-89":
          return (searchTarget = "60cm ~ 89cm");

        case "90-129":
          return (searchTarget = "90cm ~ 129cm");

        case "130-":
          return (searchTarget = "130cm 以上");
      }
  }
};
