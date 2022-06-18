const express = require("express");
const router = express.Router();
const { pool } = require("../database/databaseconfig");
const { verifyJWT } = require("../verification");
const switchController = require('../controllers/switch.controller');

router.get("/", switchController.getAllSwitches);
router.get("/:id", switchController.getSwitchById);


module.exports = router;
