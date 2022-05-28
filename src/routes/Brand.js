const express = require("express");
const router = express.Router();
const brandController = require("../controllers/brand.controller");

router.get("/", brandController.getAllBrands);
router.get("/:id", brandController.getBrandById);

module.exports = router;
