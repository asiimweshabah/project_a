const express = require("express");
const app = express.Router();
const ordersController = require("../controllers/orders");
const userAuther = require("../middlewares/user-auth");
const checkAdmin = require("../middlewares/check-admin-previledge");

app.get("/", [userAuther, checkAdmin], ordersController.getAllOrders);

app.get("/myOrders/:id", [userAuther], ordersController.getOrdersByUser);

app.post("/placeOrder", [userAuther], ordersController.placeOrder);

app.delete(
  "/deleteOrders",
  [userAuther, checkAdmin],

  ordersController.deleteAllOrders
);

app.delete(
  "/deleteMyOrders/:id",
  [userAuther],
  ordersController.deleteUserOrder
);

module.exports = app;
