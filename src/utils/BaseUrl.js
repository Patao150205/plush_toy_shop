let BaseUrl = '';

if (process.env.NODE_ENV !== 'production') {
  BaseUrl = `http://localhost:3000`
} else {
  // $B%j%P!<%9%W%m%-%7$r;HMQ$7$F$$$k$?$a(B
   BaseUrl = (process.title === 'browser') ? `https://plush-toy-shop.patapatao.com`:  `http://localhost:${process.env.PORT}`; 
}
module.exports = BaseUrl;
