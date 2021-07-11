module.exports = (q) => {
  switch (q.kind) {
    case undefined:
      return undefined;

    case "hot":
      return { Hot: true };

    case "new":
      return { New: true };

    case "genre":
      switch (q.genre) {
        case "可愛い系":
          return { category: "可愛い系" };

        case "かっこいい系":
          return { category: "かっこいい系" };
      }
      return;
    case "price":
      switch (q.price) {
        case "0-2999":
          return { price: { $gte: 0, $lte: 2999 } };

        case "3000-5999":
          return { price: { $gte: 3000, $lte: 5999 } };

        case "7000-9999":
          return { price: { $gte: 7000, $lte: 9999 } };

        case "10000-":
          return { price: { $gte: 10000 } };
      }
      return;
    case "size":
      switch (q.size) {
        case "1-29":
          return { height: { $gte: 1, $lte: 29 } };

        case "30-59":
          return { height: { $gte: 30, $lte: 59 } };

        case "60-89":
          return { height: { $gte: 60, $lte: 89 } };

        case "90-129":
          return { height: { $gte: 90, $lte: 129 } };

        case "130-":
          return { height: { $gte: 130 } };
      }
  }
};
