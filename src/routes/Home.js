const express = require("express");
const router = express.Router();
const pool = require("../database");

router.get("/", (req, res) => {
  console.log("test");
  res.send("Welkom!");
});

module.exports = router;
