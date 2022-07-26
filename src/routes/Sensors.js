const express = require("express");
const router = express.Router();
const sensorController = require("../controllers/sensor.controller");
const authController = require("../controllers/authentication.controller");

router.get("/", sensorController.getAllSensors);
router.get("/:id", sensorController.getSensorById);
router.post("/", authController.validateToken, authController.validateAdmin, sensorController.createSensor);
router.put("/:id", authController.validateToken, authController.validateAdmin, sensorController.updateSensor);
router.delete("/:id", authController.validateToken, authController.validateAdmin, sensorController.deleteSensor);

module.exports = router;
