const BaseUrl = process.env.NODE_ENV !== 'production' ? `http://localhost:3000` : `https://blush-toy-shop.herokuapp.com/`;

module.exports = BaseUrl;
