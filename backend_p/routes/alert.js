var express = require("express");
const app = express.Router();

app.get("/", function (req, res, next) {
  res.json({
    date: new Date().toDateString(),
  });
});

module.exports = app;
