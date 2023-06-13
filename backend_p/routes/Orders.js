var express = require("express");
const app = express.Router();
const ordersController = require("../controllers/Order");
//activate user

/* GET users listing. */
app.get("/", ordersController.getAllOrders);

// adding product by admin
app.post("/create", ordersController.create);
// ordering

//delete an order
app.delete("/deleteProduct/:id", ordersController.deleteProduct);

// editorde
// app.patch("/editOrder/:id", ordersController.editOrder);

module.exports = app;
