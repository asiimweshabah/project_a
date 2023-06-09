const executeQuery = require("../db/execute-query");
const bcrypt = require("bcrypt");

module.exports = {
  // ...

  // Get all users with their orders
  async getUsersWithOrders(req, res, next) {
    try {
      const getUsersWithOrdersQuery = `
        SELECT u.Id, u.Company, u.UserType, u.Username, u.Email, o.Product, o.Price, o.Quantity, o.Amount
        FROM users AS u
        JOIN orders AS o ON u.Id = o.UserId
      `;
      const result = await executeQuery(getUsersWithOrdersQuery);
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Failed to fetch users with orders",
        error: error.message,
      });
    }
  },

  // Get order history of a single user
  async getAllOrdersForUser(req, res, next) {
    try {
      const userId = req.params.userId;

      // Fetch orders for the specified user
      const getOrderHistoryQuery = `
        SELECT o.Id, o.Product, o.Price, o.Quantity, o.Amount
        FROM orders AS o
        WHERE o.UserId = ?
        ORDER BY o.OrderDate DESC
      `;
      const orderHistory = await executeQuery(getOrderHistoryQuery, [userId]);

      res.send(orderHistory);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Failed to fetch order history",
        error: error.message,
      });
    }
  },
};
