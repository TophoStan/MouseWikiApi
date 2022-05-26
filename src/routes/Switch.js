const express = require("express");
const router = express.Router();
const { pool } = require("../database/databaseconfig");
const { verifyJWT } = require("../verification");

router.get("/", (req, res) => {
  pool.query(
    "SELECT switch.switch_id, switch.brand_id,Brands.brand_name, switch.name, switch.image_url , Brands.logo_image_url FROM switch JOIN Brands ON Brands.brand_id = switch.brand_id",
    (err, result) => {
      if (err) console.log(err.message);
      else {
        res.status(200).json({
          status: 200,
          result: result,
        });
      }
    }
  );
});

router.post("/", (req, res) => {
  let microswitch = req.body;
  console.log(microswitch);
  pool.query(
    "INSERT INTO switch (brand_id, name, image_url) VALUES (?,?,?);",
    [microswitch.brand_id, microswitch.name, microswitch.image_url],
    (err, result) => {
      if (err) throw err;
      res.status(200).json({ status: 200, message: "Succes" });
    }
  );
});

module.exports = router;
