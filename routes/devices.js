const Joi = require("joi");
const express = require("express");
const router = express.Router();

const devices = [
  {
    id: 1,
    name: "device1"
  }
];

router.get("/", (req, res) => {
  res.send(devices);
});

router.get("/:id", (req, res) => {
  const device = devices.find(d => d.id === parseInt(req.params.id));
  if (!device) return res.status(404).send("Device not found.");

  res.send(device);
});

router.post("/", (req, res) => {
  const { error } = validateDevice(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const device = { id: devices.length + 1, name: req.body.name };
  devices.push(device);
  res.send(device);
});

router.put("/:id", (req, res) => {
  const device = devices.find(d => d.id === parseInt(req.params.id));
  if (!device) return res.status(404).send("Device not found.");

  const { error } = validateDevice(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  device.name = req.body.name;
  res.send(device);
});

router.delete("/:id", (req, res) => {
  const device = devices.find(d => d.id === parseInt(req.params.id));
  if (!device) return res.status(404).send("Device not found.");

  const index = devices.indexOf(device);
  devices.splice(index, 1);

  res.send(device);
});

function validateDevice(device) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(device, schema);
}

module.exports = router;
