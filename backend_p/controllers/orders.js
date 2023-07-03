const executeQuery = require("../db/execute-query");
module.exports = {
  async placeOrder(req, res, next) {
    try {
      const { selectedProductIds } = req.body;
      const { Username, users_Id } = req.user;

      const verifyUserQuery = `SELECT * FROM users WHERE users_Id = ?`;
      const userExists = await executeQuery(verifyUserQuery, [users_Id]);

      if (userExists === null) {
        throw new Error("User does not exist.");
      }
      const selectedProductsQuery = `SELECT * FROM products WHERE product_Id IN (?)`;
      const selectedProducts = await executeQuery(selectedProductsQuery, [
        selectedProductIds,
      ]);
      const insertOrderQuery = `
    INSERT INTO orders (users_Id, Username, product_Id, Product, Price, Quantity, Amount, order_date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
      const currentDate = new Date();
      for (const product of selectedProducts) {
        const { product_Id, Product, Price, Quantity, Amount } = product;

        await executeQuery(insertOrderQuery, [
          users_Id,
          Username,
          product_Id,
          Product,
          Price,
          Quantity,
          Amount,
          currentDate,
        ]);
      }
      res.status(200).send("Order placed successfully");
    } catch (error) {
      console.error("Error placing order:", error);

      res.status(500).send("Error placing order");
    }
  },

  async getAllOrders(req, res, next) {
    try {
      const getAllOrdersQuery = `SELECT * FROM orders`;
      const orders = await executeQuery(getAllOrdersQuery);

      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Failed to fetch Orders", error: error.message });
    }
  },

  async getOrdersByUser(req, res, next) {
    try {
      const { users_Id } = req.user;
      const getUserOrdersQuery = `SELECT * FROM orders WHERE users_Id = ?`;
      const orders = await executeQuery(getUserOrdersQuery, [users_Id]);

      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Failed to fetch user orders", error: error.message });
    }
  },

  async deleteAllOrders(req, res, next) {
    try {
      const deleteAllOrdersQuery = `DELETE FROM orders`;
      await executeQuery(deleteAllOrdersQuery);
      res.status(200).send("All orders deleted successfully");
    } catch (error) {
      console.error("Error deleting orders:", error);
      res.status(500).send("Error deleting orders");
    }
  },
};
