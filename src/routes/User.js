const express = require("express");
const userController = require('../controllers/user.controller');
const authController = require('../controllers/authentication.controller');
const validationController = require('../controllers/validation.controller')
const router = express.Router();

router.post("/register", validationController.validateUser, userController.registerUser);
router.post("/login", authController.validateLogin, authController.login);
router.get("/:id", authController.validateToken, userController.getUserById);




module.exports = router;
