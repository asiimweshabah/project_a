var express = require("express");
const app = express.Router();
const ordersController = require("../controllers/orders");
const userAuther = require("../middlewares/user-auth");
const checkAdmin = require("../middlewares/check-admin-previledge");

app.get("/", [userAuther], ordersController.getAllOrders);

// adding product by admin
app.post("/placeOrder", [userAuther], ordersController.placeOrder);

// app.post("/orders", [userAuther], ordersController.orders);

//placing an order

// app.post("/placeOrder", ordersController.placeOrder);

//delete an order
// app.delete(
//   "/deleteProduct/:id",
//   [userAuther, checkAdmin],
//   ordersController.deleteProduct
// );

// editorde
// app.patch("/editOrder/:id", ordersController.editOrder);

module.exports = app;
