const config = require("config");
const debug = require("debug")("app:startup");

module.exports = function() {
  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
  }
  debug(`Application Name: ${config.get("name")}`);
  debug(`Mail Server: ${config.get("mail.host")}`);
  debug(`Mail Password: ${config.get("mail.password")}`);
};
