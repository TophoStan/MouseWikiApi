const express = require("express");
const router = express.Router();
const encoderController = require("../controllers/encoder.controller");

router.get("/", encoderController.getAllEncoders);
router.get("/:id", encoderController.getEncoderById);

module.exports = router;
