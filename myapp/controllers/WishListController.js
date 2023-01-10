

const Products = require('../models/Product');
const WishList = require('../models/WishList');
const WishListDetails = require('../models/WishListDetails');

module.exports = {
  async getWishList(req, res) {
    try {
      const { id } = req.session.userID;
      const wishListId = await WishList.findOne({ where: { user_id: id } })
      const wishList = await Products.findAll({
        include: [{
          model: WishListDetails,
          where: { wish_list_id: wishListId.id },
          attributes: []
        }]
      });
      res.status(200).send(wishList);
    } catch (e) {
      console.log(e);
      res.status(500).send("Server error");
    }
  },
  async addToWishList(req, res) {
    try {
      const { id } = req.session.userID;
      const { product_id } = req.body;
      const wishList = await WishList.findOne({ where: { user_id: id } });
      const wishListDetails = await WishListDetails.findOne({ where: { wish_list_id: wishList.id, product_id } });
      if (wishListDetails) {
        res.status(200).send("Product already in wish list");
      } else {
        await WishListDetails.create({ wish_list_id: wishList.id, product_id });
        res.status(200).send("Product added to wish list");
      }
    } catch (e) {
      console.log(e);
      res.status(500).send("Server error");
    }
  },
  async removeFromWishList(req, res) { }
};