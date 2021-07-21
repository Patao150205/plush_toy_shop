const ProductsModel = require("../models/ProductsModel");
const CartModel = require("../models/CartModel");
const mongoose = require("mongoose");

// -------------------------------------
// 商品、カート、トータルの在庫数を返す
// -------------------------------------

module.exports = {
  getStockList: async (productId) => {
    try {
      const product = await ProductsModel.findById(productId).select("stock");
      if (!product) {
        return res.status(404).send("商品情報が見つかりませんでした。");
      }
      // カートに入っている商品数取得
      const cart = await CartModel.aggregate([
        {
          $unwind: "$products",
        },
        {
          $match: { "products.product": mongoose.Types.ObjectId(productId) },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$products.amount" },
          },
        },
      ]);
      let cartStock = 0;
      if (cart.length > 0) {
        cartStock = cart[0].total;
      }
      const productStock = product.stock;
      const totalStock = productStock - cartStock;
      console.log(cartStock, productStock, totalStock);
      return { cartStock, productStock, totalStock };
    } catch (error) {
      console.error(error);
      res.status(500).send("サーバーエラー");
    }
  },
};
