const express = require("express");
const router = express.Router();
const mouseController = require("../controllers/mouse.controller");
const verificationController = require("../controllers/validation.controller");
const authController = require("../controllers/authentication.controller");

router.get("/", mouseController.getAllMice);
router.get(
  "/:id",
  authController.validateToken,
  verificationController.validateNumber,
  mouseController.getMiceById
);
//Post to actual database
router.post("/admin/", authController.validateToken, authController.validateAdmin, verificationController.validatePropertiesMouse, mouseController.addMouse);
router.put("/admin/", authController.validateToken, authController.validateAdmin, verificationController.validatePropertiesMouse, mouseController.updateMouse);


module.exports = router;
