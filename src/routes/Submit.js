const express = require("express");
const router = express.Router();
const { verifyJWT } = require("../verification");
const verificationController = require("../controllers/validation.controller");
const authController = require("../controllers/authentication.controller");
const submissionController = require("../controllers/submit.controller");

router.post("/", authController.validateToken, verificationController.validateUserSubmission, submissionController.addSubmission);
router.post("/admin", authController.validateToken, authController.validateAdmin, submissionController.judgeSubmission, submissionController.submitSubmission);



module.exports = router;