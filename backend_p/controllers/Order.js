const executeQuery = require("../db/execute-query");
const bcrypt = require("bcrypt");

module.exports = {
  // Create order controller for admin
  async create(req, res, next) {
    try {
      const product = req.body.product;
      const price = req.body.price;
      const quantity = req.body.quantity;
      const amount = req.body.amount;
      const insertOrderQuery = `
        INSERT INTO orders (Product, Price, Quantity, Amount)
        VALUES (?, ?, ?, ?)
      `;

      await executeQuery(insertOrderQuery, [product, price, quantity, amount]);

      res.send({ message: "Order placed successfully" });
      console.log("Item inserted successfully:");
    } catch (error) {
      console.error("Error inserting item:", error);
    }
  },

  //create order for user

  async create(req, res, next) {
    try {
      const product = req.body.product;
      const price = req.body.price;
      const quantity = req.body.quantity;

      const insertOrderQuery = `
        INSERT INTO orders (Product, Price, Quantity)
        VALUES (?, ?, ?)
      `;

      await executeQuery(insertOrderQuery, [product, price, quantity]);

      res.send({ message: "Order placed successfully" });
      console.log("Item inserted successfully:");
    } catch (error) {
      console.error("Error inserting item:", error);
    }
  },

  // getAllorders
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

  // edit a product
  async editOrder(req, res, next) {
    try {
      const orderId = req.params.id;
      const { product, price, quantity, amount } = req.body;
      // Your logic to update the order in the database
      const updateQuery = `
      UPDATE orders
      SET Product = ?, Price = ?, Quantity = ?, Amount = ?
      WHERE id = ?
    `;
      await executeQuery(updateQuery, [
        product,
        price,
        quantity,
        amount,
        orderId,
      ]);
      res.send({ message: "Order updated successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Failed to update order", error: error.message });
    }
  },
};
