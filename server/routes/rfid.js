var mqtt = require("mqtt");
const express = require("express");
const router = express.Router();
const client = mqtt.connect("mqtt://broker.mqttdashboard.com");
const Device = require("../models/Device");

const verifyToken = require("../middleware/auth");

client.on("connect", function () {
  console.log("Connected");
});
client.on("error", function (error) {
  console.log(error);
});

// -- read RFID card add
router.get("/", verifyToken, (req, res) => {
  client.subscribe("doan/rfid/publishtopic");
  client.on("message", async (topic, message) => {
    // called each time a message is received
    const cardID = await message.toString().trim();
    res.json({ success: true, message: "Successfully", rfidId: cardID });
  });
});

/// search Device by RFID card
client.subscribe("doan/rfid/publishtopic");
client.on("message", async (topic, message) => {
  // called each time a message is received
  const cardID = await message.toString().trim();
  const data = await Device.find({ rfidId: cardID });
  try {
    if (data[0]!= null) {
      const mess = {
        message: "found",
        rfidId: data[0].rfidId,
        deviceName: data[0].deviceName,
        type: data[0].type,
        deviceModel: data[0].deviceModel,
      };
      client.publish("doan/rfid/subcribetopic", JSON.stringify(mess));
    } else {
      const mess = {
        message : "not found",
        rfidId: cardID
      }
      client.publish("doan/rfid/subcribetopic", JSON.stringify(mess));
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
