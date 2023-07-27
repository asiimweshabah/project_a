const executeQuery = require("../db/execute-query");

module.exports = {
  async placeOrder(req, res, next) {
    try {
      const { selectedProductData } = req.body;
      const { users_Id, Username } = req.user;
      let total = 0;
      let debt = 0;

      // Check if the user has already placed an order today
      const currentDate = new Date().toISOString().slice(0, 10);
      const existingOrderQuery = `
        SELECT * FROM orders WHERE users_Id = ? AND DATE(order_date) = ?
      `;
      const existingOrder = await executeQuery(existingOrderQuery, [
        users_Id,
        currentDate,
      ]);

      if (existingOrder.length > 0) {
        // If an existing order exists, update the order instead of creating a new one
        for (const productId in selectedProductData) {
          const productData = selectedProductData[productId];
          const { Price, Quantity } = productData;
          total += Price * Quantity;
        }

        if (total > 1000) {
          debt = total - 1000;
        }

        // Update the existing order
        const updateOrderQuery = `
          UPDATE orders 
          SET Price = ?, Quantity = ?, Amount = ?, total_amount = ?, debt = ?
          WHERE users_Id = ? AND DATE(order_date) = ? AND product_Id = ?
        `;

        for (const productId in selectedProductData) {
          const productData = selectedProductData[productId];
          const { Price, Quantity, Amount } = productData;

          await executeQuery(updateOrderQuery, [
            Price,
            Quantity,
            Amount,
            total,
            debt,
            users_Id,
            currentDate,
            productId,
          ]);
        }
      } else {
        // If no existing order exists, proceed with creating a new order
        for (const productId in selectedProductData) {
          const productData = selectedProductData[productId];
          const { Price, Quantity } = productData;
          total += Price * Quantity;
        }

        if (total > 1000) {
          debt = total - 1000;
        }

        // Calculate the total amount as the sum of the Amount column multiplied by Quantity
        const total_amount = Object.values(selectedProductData).reduce(
          (sum, product) =>
            sum + parseInt(product.Amount) * parseInt(product.Quantity),
          0
        );

        // Inserting order into the orders table
        const insertOrderQuery = `
          INSERT INTO orders (users_Id, Username, product_Id, Product, Price, Quantity, Amount, total_amount, order_date, debt)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

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
      }

      res.status(200).send("Order placed successfully");
    } catch (error) {
      console.error("Error placing order:", error);
      res.status(500).send("Error placing order");
    }
  },

  async getAllOrders(req, res, next) {
    try {
      const getAllOrdersQuery = `
        SELECT
          orders.order_Id,
          orders.users_Id,
          users.Username,
          DATE_FORMAT(orders.order_date, '%Y-%m-%d') AS order_date,
          GROUP_CONCAT(
            CONCAT(
              orders.Product, 
              '(', orders.Quantity, ')-',                       
              orders.Amount
            )
            ORDER BY orders.order_date -- Sort by order_date for grouping by date
          ) AS Orders,
          SUM(orders.Amount) AS total_amount,
          orders.debt
        FROM orders
        LEFT JOIN users ON orders.users_Id = users.users_Id
        GROUP BY DATE_FORMAT(orders.order_date, '%Y-%m-%d'), orders.users_Id -- Group by formatted order_date and users_Id
        ORDER BY orders.order_date DESC -- Sort the results by order_date descending
      `;

      const orders = await executeQuery(getAllOrdersQuery);

      if (orders && orders.length > 0) {
        res.status(200).json(
          orders.map((order) => ({
            order_Id: order.order_Id,
            users_Id: order.users_Id,
            Username: order.Username,
            order_date: order.order_date,
            orders: order.Orders ? order.Orders.split(",") : [],
            total_amount: order.total_amount,
            debt: order.debt,
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
      const getOrdersByUserQuery = `
        SELECT
          orders.order_date,
          GROUP_CONCAT(
            CONCAT(
              orders.Product,
              '(', orders.Quantity, ')-',
              orders.Amount
            )
            ORDER BY orders.order_date
          ) AS Orders,
          SUM(orders.Amount) AS total_amount,
          SUM(orders.debt) AS debt
        FROM orders
        WHERE orders.users_Id = ?
        GROUP BY orders.order_date
        ORDER BY orders.order_date DESC
      `;

      const orders = await executeQuery(getOrdersByUserQuery, [users_Id]);

      if (orders && orders.length > 0) {
        res.status(200).json(
          orders.map((order) => ({
            order_date: order.order_date,
            orders: order.Orders ? order.Orders.split(",") : [],
            total_amount: order.total_amount,
            debt: order.debt,
          }))
        );
      } else {
        res.status(200).json([]);
      }
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
      const { total_amount } = req.query;

      if (!users_Id || !total_amount) {
        return res
          .status(400)
          .send("Invalid parameters: users_Id or total_amount is missing.");
      }

      const deleteUserOrderQuery = `
        DELETE FROM orders
        WHERE orders.users_Id = ? AND orders.total_amount = ?
      `;

      const result = await executeQuery(deleteUserOrderQuery, [
        users_Id,
        total_amount,
      ]);

      if (result.affectedRows > 0) {
        res.status(200).send("Order deleted successfully");
      } else {
        res.status(404).send("Order not found");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      res.status(500).send("Error deleting order");
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
