const express = require("express");
const app = express.Router();
const productsController = require("../controllers/products");
const userAuther = require("../middlewares/user-auth");
const checkAdmin = require("../middlewares/check-admin-previledge");

/* GET users listing. */
app.get("/", [userAuther], productsController.getAllProducts);

// adding product by admin
app.post(
  "/createProduct",
  [userAuther, checkAdmin],
  productsController.createProduct
);

//delete an Product
app.delete(
  "/deleteProduct/:id",
  [userAuther, checkAdmin],
  productsController.deleteProduct
);

module.exports = app;
