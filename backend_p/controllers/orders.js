const executeQuery = require("../db/execute-query");

module.exports = {
  async placeOrder(req, res, next) {
    try {
      const products = req.body;
      const insertOrderQuery = `
        INSERT INTO orders (Product, Price, Quantity, Amount, order_date, debt)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      const insertPromises = products.map(async (product) => {
        const values = [
          product.Product,
          product.Price,
          product.Quantity,
          product.Amount,
          product.order_date,
          product.debt,
          // product.user_Id, // Add the user_Id value
        ];
        await executeQuery(insertOrderQuery, values);
      });

      await Promise.all(insertPromises);

      res.status(200).send("Order placed successfully");
    } catch (error) {
      console.error("Error placing order:", error);
      res.status(500).send("Error placing order");
    }
  },

  async getAllOrders(req, res, next) {
    try {
      const getOrdersQuery = "SELECT * FROM orders";
      const Orders = await executeQuery(getOrdersQuery);
      res.send(Orders);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Failed to fetch Orders ", error: error.message });
    }
  },
};
