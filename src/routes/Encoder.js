const express = require("express");
const router = express.Router();
const encoderController = require("../controllers/encoder.controller");
const authController = require("../controllers/authentication.controller");

router.get("/", encoderController.getAllEncoders);
router.get("/:id", encoderController.getEncoderById);
router.post("/", authController.validateToken, authController.validateAdmin, encoderController.createEncoder);
router.put("/:id", authController.validateToken, authController.validateAdmin, encoderController.updateEncoder);
router.delete("/:id", authController.validateToken, authController.validateAdmin, encoderController.deleteEncoder);

module.exports = router;
