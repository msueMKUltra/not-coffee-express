const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const auth = require("../routes/auth");
const users = require("../routes/users");
const genres = require("../routes/genres");
const customers = require("../routes/customers");
const movies = require("../routes/movies");
const rentals = require("../routes/rentals");
const home = require("../routes/home");
const logger = require("../middleware/logger");
const error = require("../middleware/error");
const debug = require("debug")("app:startup");

module.exports = function(app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use(helmet());
  if (app.get("env") === "development") {
    app.use(morgan("tiny"));
    debug(`${app.get("env")} - Morgan enabled...`);
  }
  app.use("/api/auth", auth);
  app.use("/api/users", users);
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use("/", home);
  app.use(logger);
  app.use(error);
};
