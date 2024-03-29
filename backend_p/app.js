const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const http = require("http");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products");
const ordersRouter = require("./routes/orders");

// const corsOptions = {
//   origin: ["https://odysseybreaksytem.netlify.app"],
//   optionsSuccessStatus: 200,
// };

// app.use(cors(corsOptions));
app.use(cors());

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

dotenv.config();

process.env.TOKEN_SECRET;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/orders", ordersRouter);

port = 3006;
console.log(`App running on port ${port}`);

module.exports = app;
