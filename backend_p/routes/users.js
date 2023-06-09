var express = require("express");

const app = express.Router();
const usersController = require("../controllers/users");
const { activateUser, deactivateUser } = require("../controllers/users");

// const client = require("../db/connect_to_db");

const { error } = require("console");

/* GET users listing. */
app.get("/allUsers", usersController.getAllUsers);

// Regestering user
app.post("/register", usersController.register);

// Logging in
app.post("/login", usersController.login);

//delete a user
app.delete("/deleteUser/:id", usersController.deleteUser);

//logout user
app.delete("/logout/:id", usersController.logout);

//delete a user

// Define routes
app.put("/activate/:id", activateUser);
app.put("/deactivate/:id", deactivateUser);

module.exports = app;
