const express = require("express");
const router = express.Router();
const mouseController = require("../controllers/mouse.controller");
const verificationController = require("../controllers/validation.controller");
const authController = require("../controllers/authentication.controller");

// router.get("/", mouseController.getAllMice);
// router.get(
//   "/:id",
//   authController.validateToken,
//   verificationController.validateNumber,
//   mouseController.getMiceById
// );
// //Post to actual database
// router.post("/admin/", authController.validateToken, authController.validateAdmin, verificationController.validatePropertiesMouse, mouseController.addMouse);
// router.put("/admin/", authController.validateToken, authController.validateAdmin, verificationController.validatePropertiesMouse, mouseController.updateMouse);
router.get("/", mouseController.getAllMouses);
router.get("/:id", mouseController.getMouseById);
router.post("/", authController.validateToken, authController.validateAdmin, mouseController.createMouse);
router.put("/:id", authController.validateToken, authController.validateAdmin, mouseController.updateMouse);
router.delete("/:id", authController.validateToken, authController.validateAdmin, mouseController.deleteMouse);


module.exports = router;
