const express = require("express");
const router = express.Router();
const { pool } = require("../database/databaseconfig");
const { verifyJWT } = require("../verification");
const sensorController = require("../controllers/sensor.controller");

router.get("/", sensorController.getAllSensors);
router.get("/:id", sensorController.getSensorById);
module.exports = router;
