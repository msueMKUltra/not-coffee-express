const mongoose = require("mongoose");
const Joi = require("joi");

const Device = mongoose.model(
  "Device",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    }
  })
);

function validateDevice(device) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required()
  };

  return Joi.validate(device, schema);
}

module.exports.Device = Device;
module.exports.validate = validateDevice;
