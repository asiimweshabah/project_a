var express = require("express");
const orderHistoryController = require("../controllers/orderHistory");
const app = express.Router();

/* GET users listing. */
app.get("/", orderHistoryController.getUsersWithOrders);

//get order for single user
app.get("/userOrder", orderHistoryController.getAllOrdersForUser);

module.exports = app;
