var express = require("express");
const app = express.Router();
const usersController = require("../controllers/users");
const userAuther = require("../middlewares/user-auth");
const checkAdmin = require("../middlewares/check-admin-previledge");
const { activateUser, deactivateUser } = require("../controllers/users");

// const client = require("../db/connect_to_db");

const { error } = require("console");

/* GET users listing. */
app.get("/allUsers", [userAuther, checkAdmin], usersController.getAllUsers);

//localhost:3006/users/${email}
// Regestering user
app.post("/register", [userAuther, checkAdmin], usersController.register);
// set password
app.post("/setpassword", usersController.setPassword);

// Logging in
app.post("/login", usersController.login);

//delete a user
app.delete(
  "/deleteUser/:id",
  [userAuther, checkAdmin],
  usersController.deleteUser
);

//logout user
app.post("/logout/:id", [userAuther], usersController.logout);
// app.post("/logout/:id", usersController.logout);

// Define routes
// app.put("/activate/:id", [userAuther, checkAdmin], activateUser);
// app.put("/deactivate/:id", [userAuther, checkAdmin], deactivateUser);

module.exports = app;
