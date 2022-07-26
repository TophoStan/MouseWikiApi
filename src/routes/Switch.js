const express = require("express");
const router = express.Router();
const { pool } = require("../database/databaseconfig");
const { verifyJWT } = require("../verification");
const switchController = require('../controllers/switch.controller');
const authController = require("../controllers/authentication.controller");

// router.get("/", switchController.getAllSwitches);
// router.get("/:id", switchController.getSwitchById);
router.get("/", switchController.getAllMicroSwitchs);
router.get("/:id", switchController.getMicroSwitchById);
router.post("/", authController.validateToken, authController.validateAdmin, switchController.createMicroSwitch);
router.put("/:id", authController.validateToken, authController.validateAdmin, switchController.updateMicroSwitch);
router.delete("/:id", authController.validateToken, authController.validateAdmin, switchController.deleteMicroSwitch);

module.exports = router;
