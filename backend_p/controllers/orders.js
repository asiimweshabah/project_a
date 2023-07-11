const executeQuery = require("../db/execute-query");
module.exports = {
  async placeOrder(req, res, next) {
    try {
      const { selectedProductIds, selectedProductData } = req.body;
      const { Username, users_Id } = req.user;
      let total = 0;
      let debt = 0;
      // Validate user existence
      const verifyUserQuery = `SELECT * FROM users WHERE users_Id = ?`;
      const userExists = await executeQuery(verifyUserQuery, [users_Id]);

      if (!userExists) {
        throw new Error("User does not exist.");
      }

      for (const productId in selectedProductData) {
        const productData = selectedProductData[productId];
        const { Price, Quantity } = productData;
        total += Price * Quantity;
      }

      if (total > 1000) {
        debt = total - 1000;
      }

      // Calculate the total amount as the sum of the Amount column
      const total_amount = Object.values(selectedProductData).reduce(
        (sum, product) => sum + product.Amount,
        0
      );

      // Inserting orders into the orders table
      const insertOrderQuery = `
        INSERT INTO orders (users_Id, Username, product_Id, Product, Price, Quantity, Amount, total_amount, order_date, debt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const currentDate = new Date();

      for (const productId in selectedProductData) {
        const productData = selectedProductData[productId];
        const { Product, Price, Quantity, Amount } = productData;

        await executeQuery(insertOrderQuery, [
          users_Id,
          Username,
          productId,
          Product,
          Price,
          Quantity,
          Amount,
          total_amount,
          currentDate,
          debt,
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
      let getAllOrdersQuery = `
        SELECT
          orders.users_Id,
          users.Username,
          GROUP_CONCAT(
            CONCAT(
              orders.Product, 
              orders.Quantity,        
              orders.Price,             
              orders.Amount
            )
          ) AS Orders,
          orders.total_amount,
          orders.debt,
          orders.order_date
        FROM orders
        LEFT JOIN users ON orders.users_Id = users.users_Id
        GROUP BY orders.users_Id, users.Username
      `;

      const orders = await executeQuery(getAllOrdersQuery);

      if (orders && orders.length > 0) {
        res.status(200).json(
          orders.map((order) => ({
            users_Id: order.users_Id,
            Username: order.Username,
            orders: order.Orders ? order.Orders.split(",") : [],
            total_amount: order.total_amount,
            debt: order.debt,
            order_date: order.order_date,
          }))
        );
      } else {
        res.status(200).json([]);
      }
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
        .send({ message: "Failed to get user orders", error: error.message });
    }
  },

  async deleteUserOrder(req, res, next) {
    try {
      const { users_Id } = req.user;
      const sql = `DELETE FROM orders WHERE users_Id = ?`;
      await executeQuery(sql, [users_Id]);
      res.send({ message: "Order history cleared successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Failed to delete user orders",
        error: error.message,
      });
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
