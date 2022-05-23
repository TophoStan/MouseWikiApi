const express = require("express");
const router = express.Router();
const { pool } = require("../databaseconfig");
const { verifyJWT } = require("../verification");

router.get("/", (req, res) => {
  pool.query("SELECT * FROM Sensor", (err, result) => {
    res.status(200).json({ status: 200, result: result });
  });
});

//Admin verifier
router.post("/", (req, res) => {
  const sensor = req.body;
  pool.query(
    "INSERT INTO Sensor (brand_id, name, lens)Values (?,?,?)",
    [sensor.brand_id, sensor.name, sensor.lens],
    (err, result) => {
      if (err) throw err;
      else {
        res.status(200).json({ status: 200, result: sensor });
      }
    }
  );
});

module.exports = router;
