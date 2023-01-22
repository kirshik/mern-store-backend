const sequelize = require("../database/database.js");
const { QueryTypes } = require("sequelize");
const Cart = require("../models/Cart");
const CartDetails = require("../models/CartDetails");
const Products = require("../models/Product");

module.exports = {
  async getCart(req, res) {
    const { id } = req.session.userID;
    try {
      const cart_id = await Cart.findOne({ where: { user_id: id } });
      const cart = await Products.findAll({
        include: [{
          model: CartDetails,
          where: { cart_id: cart_id.id },
          attributes: ["quantity"],
        }],
        attributes: ["id", "name", "price", "images_urls"]
      });

      res.status(200).send({ cart, total: cart_id.total });
    } catch (e) {
      console.log(e);
      res.status(500).send("Server error");
    }
  },
  async addToCart(req, res) {
    try {
      const { id } = req.session.userID;
      const { product_id, quantity } = req.body;
      const cart = await Cart.findOne({ where: { user_id: id } });
      const cartDetails = await CartDetails.findOne({ where: { cart_id: cart.id, product_id } });
      if (cartDetails) {
        cartDetails.quantity += quantity;
        await cartDetails.save();
      } else {
        await CartDetails.create({ cart_id: cart.id, product_id, quantity });
      }
      res.status(200).send("Product added to cart");
    } catch (e) {
      console.log(e);
      res.status(500).send("Server error");
    }
  },
  async removeFromCart(req, res) {
    try {
      const { id } = req.session.userID;
      const { product_id } = req.body;
      const cart = await Cart.findOne({ where: { user_id: id } });
      const cartDetails = await CartDetails.findOne({ where: { cart_id: cart.id, product_id } });
      if (cartDetails) {
        await cartDetails.destroy();
      }
      res.status(200).send("Product removed from cart");
    } catch (e) {
      console.log(e);
      res.status(500).send("Server error");
    }
  }
};