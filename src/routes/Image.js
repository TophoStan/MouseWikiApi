const express = require("express");
const router = express.Router();
const authController = require("../controllers/authentication.controller");
const itemImageController = require("../controllers/image.controller");

router.get("/", itemImageController.getAllItemImages);
router.get("/:id", itemImageController.getItemImageById);
router.post("/", authController.validateToken, authController.validateAdmin, itemImageController.createItemImage);
router.put("/:id", authController.validateToken, authController.validateAdmin, itemImageController.updateItemImage);
router.delete("/:id", authController.validateToken, authController.validateAdmin, itemImageController.deleteItemImage);

module.exports = router;
