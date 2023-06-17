var express = require("express");
const app = express.Router();
const productsController = require("../controllers/products");
const userAuther = require("../middlewares/user-auth");
const checkAdmin = require("../middlewares/check-admin-previledge");

/* GET users listing. */
app.get("/", [userAuther], productsController.getAllOrders);

// adding product by admin
app.post(
  "/createOrder",
  [userAuther, checkAdmin],
  productsController.createOrder
);

// app.post("/userOrder", [userAuther], productsController.userOrder);

// ordering
//  app.post("/placeOrder", userOrderController.placeOrder);

//delete an order
app.delete(
  "/deleteProduct/:id",
  [userAuther, checkAdmin],
  productsController.deleteProduct
);

module.exports = app;
