const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("test");
  res.send("Welkom!");
});

module.exports = router;
