const winston = require("winston");
const express = require("express");
const app = express();

require("./startup/logging")();
require("./startup/views")(app);
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

const port = process.env.PORT || "3030";
app.listen(port, "0.0.0.0", () => winston.info(`Listening on port ${port}...`));
