const { Device, validate } = require("../models/devices");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const devices = await Device.find().sort("name");
  res.send(devices);
});

router.get("/:id", async (req, res) => {
  const device = await Device.findById(req.params.id);
  if (!device) return res.status(404).send("Device not found.");

  res.send(device);
});

router.post("/", async (req, res) => {
  const { error } = validateDevice(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let device = new Device({
      name: req.body.name
    });
    device = await device.save();
    res.send(device);
  } catch (ex) {
    for (field in ex.errors) console.log(ex.errors[field].message);
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validateDevice(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const device = await Device.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name
    },
    { new: true }
  );
  if (!device) return res.status(404).send("Device not found.");

  res.send(device);
});

router.delete("/:id", async (req, res) => {
  const device = await Device.findByIdAndRemove(req.params.id);
  if (!device) return res.status(404).send("Device not found.");

  res.send(device);
});

module.exports = router;
