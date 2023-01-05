const Cart = require("../models/Cart");
const CartDetails = require("../models/CartDetails");
const Products = require("../models/Product");

module.exports = {
  async getCart(req, res) {
    const id = 2;
    try {
      const cart = await CartDetails.findAll({
        include: [
          {
            model: Cart,
            where: { user_id: id }
          }
        ]
      });
      res.status(200).send(cart);
    } catch (e) {
      console.log(e);
      res.status(500).send("Server error");
    }
  }
};