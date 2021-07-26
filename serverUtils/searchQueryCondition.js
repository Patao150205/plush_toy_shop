module.exports = (q) => {
  switch (q.kind) {
    case undefined:
      return { isRelease: true };
    case "keyword":
      return { name: new RegExp(`.*${q.keyword}.*`), isRelease: true };
    case "hot":
      return { Hot: true, isRelease: true };

    case "new":
      return { New: true, isRelease: true };

    case "genre":
      switch (q.genre) {
        case "可愛い系":
          return { category: "可愛い系", isRelease: true };

        case "かっこいい系":
          return { category: "かっこいい系", isRelease: true };
      }
      return;
    case "price":
      switch (q.price) {
        case "0-2999":
          return { price: { $gte: 0, $lte: 2999 }, isRelease: true };

        case "3000-5999":
          return { price: { $gte: 3000, $lte: 5999 }, isRelease: true };

        case "7000-9999":
          return { price: { $gte: 7000, $lte: 9999 }, isRelease: true };

        case "10000-":
          return { price: { $gte: 10000 }, isRelease: true };
      }
      return;
    case "size":
      switch (q.size) {
        case "1-29":
          return { height: { $gte: 1, $lte: 29 }, isRelease: true };

        case "30-59":
          return { height: { $gte: 30, $lte: 59 }, isRelease: true };

        case "60-89":
          return { height: { $gte: 60, $lte: 89 }, isRelease: true };

        case "90-129":
          return { height: { $gte: 90, $lte: 129 }, isRelease: true };

        case "130-":
          return { height: { $gte: 130 }, isRelease: true };
      }
  }
};
