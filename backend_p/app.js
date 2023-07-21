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

// app.use(cors());

const corsOptions = {
  origin: "https://odysseybreaksytem.netlify.app", // Replace this with your frontend domain or a comma-separated list of allowed domains
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Add the HTTP methods your frontend might use
  credentials: true, // Allow credentials (cookies, authorization headers) to be sent along with requests
  optionsSuccessStatus: 200, // Respond with a 200 status code for preflight requests
};

app.use(cors(corsOptions));
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// get config consts
dotenv.config();

// access config const
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
