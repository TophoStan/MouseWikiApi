const express = require("express");
const router = express.Router();
const { verifyJWT } = require("../verification");
const mouseController = require("../controllers/mouse.controller");

router.get("/", mouseController.getAllMice);
router.get("/:id", mouseController.getMiceById);

module.exports = router;
