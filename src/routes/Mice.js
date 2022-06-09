const express = require("express");
const router = express.Router();
const { verifyJWT } = require("../verification");
const mouseController = require("../controllers/mouse.controller");
const verificationController = require("../controllers/verification.controller");

router.get("/", mouseController.getAllMice);
router.get(
  "/:id",
  verificationController.validateNumber,
  mouseController.getMiceById
);

module.exports = router;
