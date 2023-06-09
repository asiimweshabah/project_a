var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var http = require("http");
var usersRouter = require("./routes/users");
var ordersRouter = require("./routes/Orders");
var orderHistoryRouter = require("./routes/orderHistory");
var alertRouter = require("./routes/alert");
var app = express();
const cors = require("cors");

app.use(cors());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/alert", alertRouter);
app.use("/users", usersRouter);
app.use("/orders", ordersRouter);
app.use("/orderHistory", ordersRouter);

module.exports = app;
