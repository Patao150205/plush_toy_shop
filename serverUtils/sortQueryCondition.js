module.exports = (q) => {
  switch (parseInt(q.sort)) {
    // 新着順
    case 1:
      return { createdAt: -1 };
    // サイズが小さい順
    case 2:
      return { height: 1 };
    // サイズが大きい順
    case 3:
      return { height: -1 };
    // 価格が安い順
    case 4:
      return { price: 1 };
    // 価格が高い順
    case 5:
      return { price: -1 };
    default:
      return { createdAt: -1 };
  }
};
