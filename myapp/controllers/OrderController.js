const session = require("express-session")
const OrderData = require("../models/OrderData");
const Products = require("../models/Product");
const OrderDetails = require("../models/OrderDetails");
const ShipmentInfo = require("../models/ShipmentInfo");


module.exports = {
  async getOrderDetails(req, res) {
    const { id } = req.session.userID;
    try {
      const orderData = await OrderData.findOne({ where: { user_id: id } });
      const orderDetails = await OrderDetails.findAll({ where: { order_id: orderId } });
      const productsIds = orderDetails.map(order => order.product_id);
      const orders = Products.findAll({ where: { id: productsIds } });
      const response = {
        orderData,
        orderDetails,
        orders
      }
      res.status(200).send(response);
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  },
  async createOrder(req, res) {
    const { id } = req.session.userID;
    const { shipment, total, products } = req.body;
    try {
      const isShipment = await ShipmentInfo.findOne({ where: { user_id: id } });
      const shipmentData = isShipment ? isShipment : await ShipmentInfo.create({ user_id: id, ...shipment });
      const orderData = await OrderData.create({ user_id: id, date: new Date(), status: "pending", total: total, shipment_id: shipmentData.id, user_id: id });
      const orderDetails = products.map(product => {
        return {
          order_id: orderData.id,
          product_id: product.id,
          quantity: product.quantity
        }
      });
      await OrderDetails.bulkCreate(orderDetails);
      res.status(200).send("Order created");
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  }
}