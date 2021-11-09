const BaseUrl =
  process.env.NODE_ENV !== 'production' ? `http://localhost:3000` : `https://plush-toy-shop.patapatao.com`;

module.exports = BaseUrl;
