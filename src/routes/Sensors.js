const express = require("express");
const router = express.Router();
const { pool } = require("../database/databaseconfig");
const { verifyJWT } = require("../verification");
const sensorController = require("../controllers/sensor.controller");

router.get("/", sensorController.getAllSensors);

router.post("/", (req, res) => {
  const sensor = req.body;
  pool.query(
    "INSERT INTO Sensor (brand_id, name, lens)Values (?,?,?)",
    [sensor.brand_id, sensor.name, sensor.lens],
    (err, result) => {
      if (err) throw err;
      else {
        res.status(200).json({ status: 200, result: sensor });
      }
    }
  );
});

module.exports = router;
