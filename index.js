const mongoose = require("mongoose");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const debug = require("debug")("app:startup");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const home = require("./routes/home");
const logger = require("./middleware/logger");
const app = express();

mongoose
  .connect("mongodb://localhost/playground", { useNewUrlParser: true })
  .then(() => debug("Connected to MongoDB..."))
  .catch(() => debug("Could not connect to MongoDB..."));

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug(`${app.get("env")} - Morgan enabled...`);
}
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/", home);
app.use(logger);

console.log(`Application Name: ${config.get("name")}`);
console.log(`Mail Server: ${config.get("mail.host")}`);
console.log(`Mail Password: ${config.get("mail.password")}`);

const port = process.env.PORT || "3030";
app.listen(port, "0.0.0.0", () => console.log(`Listening on port ${port}...`));
