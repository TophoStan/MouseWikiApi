const express = require("express");
const router = express.Router();
const brandController = require("../controllers/brand.controller");
const authController = require("../controllers/authentication.controller");
const verificationController = require("../controllers/validation.controller");

router.get("/", brandController.getAllBrands);
router.get("/:id", brandController.getBrandById);
router.post("/", authController.validateToken, authController.validateAdmin, brandController.createBrand);
router.put("/:id", authController.validateToken, authController.validateAdmin, brandController.updateBrand);
router.delete("/:id", authController.validateToken, authController.validateAdmin, brandController.deleteBrand);
module.exports = router;
