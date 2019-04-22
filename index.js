const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const debug = require("debug")("app:startup");
const devices = require("./routes/devices");
const home = require("./routes/home");
const logger = require("./middleware/logger");
const app = express();

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
app.use("/api/devices", devices);
app.use("/", home);
app.use(logger);

console.log(`Application Name: ${config.get("name")}`);
console.log(`Mail Server: ${config.get("mail.host")}`);
console.log(`Mail Password: ${config.get("mail.password")}`);

const port = process.env.PORT || "3030";
app.listen(port, "0.0.0.0", () => console.log(`Listening on port ${port}...`));
