const executeQuery = require("../db/execute-query");

http: module.exports = {
  async createProduct(req, res, next) {
    try {
      const { product, price, quantity, amount } = req.body;

      // Calculate the total amount as the sum of the amount column
      const total_amount = +amount;

      // Validate input data
      if (!product || !price || !quantity || !amount || !total_amount) {
        return res.status(400).send({ message: "Invalid Product data" });
      }

      const insertProductQuery =
        "INSERT INTO products (Product, Price, Quantity, Amount, Total_Amount) VALUES (?, ?, ?, ?, ?)";

      await executeQuery(insertProductQuery, [
        product,
        price,
        quantity,
        amount,
        total_amount,
      ]);

      res.send({ message: "Product placed successfully" });
      console.log("Product inserted successfully");
    } catch (error) {
      console.error("Error inserting Product:", error);
      res.status(500).send({ message: "Failed to insert Product" });
    }
  },

  async getAllProducts(req, res, next) {
    try {
      const getProductsQuery = "SELECT * FROM products";
      const Products = await executeQuery(getProductsQuery);
      res.send(Products);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Failed to fetch Products ", error: error.message });
    }
  },

  // deleteProduct
  async deleteProduct(req, res, next) {
    try {
      const productId = req.params.id;

      // Your logic to delete the Product from the database
      const deleteQuery = `DELETE FROM products WHERE product_Id = ${productId}`;
      await executeQuery(deleteQuery);

      res.send({ message: "Product deleted successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Failed to delete Product", error: error.message });
    }
  },
};
