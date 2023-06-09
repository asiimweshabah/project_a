var express = require("express");
const app = express.Router();
const ordersController = require("../controllers/Order");
//activate user

// const client = require("../db/connect_to_db");

/* GET users listing. */
app.get("/", ordersController.getAllOrders);

// adding a product

app.post("/create", ordersController.create);
// ordering

//delete an order
app.delete("/deleteProduct/:id", ordersController.deleteProduct);

// editorde
app.patch("/editOrder/:id", ordersController.editOrder);

module.exports = app;
