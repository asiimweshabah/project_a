var express = require("express");
const app = express.Router();
const usersController = require("../controllers/users");
const userAuther = require("../middlewares/user-auth");
const checkAdmin = require("../middlewares/check-admin-previledge");

app.get("/allUsers", [userAuther, checkAdmin], usersController.getAllUsers);

app.post("/register", [userAuther, checkAdmin], usersController.register);

app.post("/setpassword", usersController.setPassword);

app.post("/login", usersController.login);

app.delete(
  "/deleteUser/:id",
  [userAuther, checkAdmin],
  usersController.deleteUser
);

app.post("/logout/:id", [userAuther], usersController.logout);

app.put(
  "/activate/:id",
  [userAuther, checkAdmin],
  usersController.activateUser
);

app.put(
  "/deactivate/:id",
  [userAuther, checkAdmin],
  usersController.deactivateUser
);

module.exports = app;
