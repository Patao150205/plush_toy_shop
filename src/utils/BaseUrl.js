let BaseUrl = '';

if (process.env.NODE_ENV !== 'production') {
  BaseUrl = `http://localhost:3000`
} else {
  // リバースプロキシを使用しているため
   BaseUrl = (process.title === 'browser') ? `https://plush-toy-shop.patapatao.com`:  `http://localhost:${process.env.PORT}`; 
}
module.exports = BaseUrl;
