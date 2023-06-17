var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var http = require("http");
var usersRouter = require("./routes/users");
var ordersRouter = require("./routes/Orders");
var productsRouter = require("./routes/products");
var app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// get config vars
dotenv.config();

// access config var
process.env.TOKEN_SECRET;
app.use(cors());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/users", usersRouter);
// app.use("/orders", ordersRouter);
app.use("/products", productsRouter);
module.exports = app;
