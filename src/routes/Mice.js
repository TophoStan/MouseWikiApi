const express = require("express");
const router = express.Router();
const { verifyJWT } = require("../verification");
const mouseController = require("../controllers/mouse.controller");

router.get("/", mouseController.getAllMice);
router.get("/:id", mouseController.getMiceById);
router.post("/", verifyJWT, mouseController.addMouse);
router.delete("/:id", verifyJWT, mouseController.deleteMouse);
router.put("/:id", verifyJWT, mouseController.updateMouse);

module.exports = router;
