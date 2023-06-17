const executeQuery = require("../db/execute-query");
const bcrypt = require("bcrypt");
module.exports = {
  async createOrder(req, res, next) {
    try {
      const { product, price, quantity, amount } = req.body;

      // Validate input data
      if (!product || !price || !quantity || !amount) {
        return res.status(400).send({ message: "Invalid order data" });
      }

      const insertOrderQuery =
        "INSERT INTO orders (Product, Price, Quantity, Amount) VALUES (?, ?, ?, ?)";

      await executeQuery(insertOrderQuery, [product, price, quantity, amount]);

      res.send({ message: "Order placed successfully" });
      console.log("Order inserted successfully");
    } catch (error) {
      console.error("Error inserting order:", error);
      res.status(500).send({ message: "Failed to insert order" });
    }
  },

  async getAllOrders(req, res, next) {
    try {
      const getOrdersQuery = "SELECT * FROM orders";
      const orders = await executeQuery(getOrdersQuery);
      res.send(orders);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Failed to fetch orders ", error: error.message });
    }
  },

  // deleteProduct
  async deleteProduct(req, res, next) {
    try {
      const orderId = req.params.id;

      // Your logic to delete the order from the database
      const deleteQuery = `DELETE FROM orders WHERE id = ${orderId}`;
      await executeQuery(deleteQuery);

      res.send({ message: "order deleted successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Failed to delete order", error: error.message });
    }
  },
};
