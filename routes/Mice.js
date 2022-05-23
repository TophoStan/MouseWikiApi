const express = require("express");
const router = express.Router();
const { pool } = require("../databaseconfig");
const { verifyJWT } = require("../verification");

router.get("/", (req, res) => {
  pool.query(
    "SELECT mouse_id,Mouse.name AS mouseName, Mouse.msrp, Mouse.polling_rate, Mouse.shape, Mouse.weight, mouseBrand.brand_name AS mouse_brand, Sensor.sensor_id, sensorBrand.brand_name AS sensorBrand ,Sensor.name AS sensorName , Sensor.lens, mouseEncoder.name AS encoderName, mouseEncoder.height , switchBrand.brand_name AS switchBrand,mouseSwitch.name AS switchName ,mouseImage.itemname, mouseImage.image_url, sideMouseSwitch.name AS sideSwitchName, sideSwitchBrand.brand_name AS sideSwitchBrand FROM Mouse JOIN Sensor ON Sensor.sensor_id = Mouse.sensor_id JOIN Brands AS mouseBrand ON mouseBrand.brand_id = Mouse.brand_id JOIN Brands AS sensorBrand ON sensorBrand.brand_id = Sensor.brand_id JOIN images AS mouseImage ON mouseImage.image_id = Mouse.image_id JOIN Encoder AS mouseEncoder ON mouseEncoder.encoder_id = Mouse.encoder_id JOIN switch AS mouseSwitch ON mouseSwitch.switch_id = Mouse.main_switch_id JOIN Brands AS switchBrand ON mouseSwitch.brand_id = switchBrand.brand_id JOIN switch AS sideMouseSwitch ON sideMouseSwitch.switch_id = Mouse.side_switch_id JOIN Brands AS sideSwitchBrand ON sideSwitchBrand.brand_id = sideMouseSwitch.brand_id;",
    (err, result, fields) => {
      if (err) throw err;
      console.log(result);
      let mice = [];
      result.forEach((data) => {
        let mouse = {
          mouse_id: data.mouse_id,
          name: data.mouseName,
          msrp: data.msrp,
          polling_rate: data.polling_rate,
          weight: data.weight,
          shape: data.shape,
          mouse_brand: data.mouse_brand,
          sensor: {
            id: data.sensor_id,
            brand: data.sensorBrand,
            name: data.sensorName,
            lens: data.lens,
          },
          encoder: {
            name: data.encoderName,
            height: data.height,
          },
          main_switch: {
            switch_brand: data.switchBrand,
            name: data.switchName,
          },
          side_switch: {
            switch_brand: data.sideSwitchBrand,
            name: data.sideSwitchName,
          },
          image_item_name: data.itemname,
          mouse_picture_url: data.image_url,
          // sensor_name: data.
        };
        mice.push(mouse);
      });

      res.status(200).json({
        status: 200,
        result: mice,
      });
    }
  );
});

router.post("/", verifyJWT, (req, res) => {
  const reqBody = req.body;
  pool.query(
    "INSERT INTO Mice (name, brand, description, imageUrl, msrp, shape, polling_rate, switch, button_count, main_color, sensor, lens, cable, scroll_type, scroll_encoder, weight) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ",
    [
      reqBody.name,
      reqBody.brand,
      reqBody.description,
      reqBody.imageUrl,
      reqBody.msrp,
      reqBody.shape,
      reqBody.polling_rate,
      reqBody.switch,
      reqBody.button_count,
      reqBody.main_color,
      reqBody.sensor,
      reqBody.lens,
      reqBody.cable,
      reqBody.scroll_type,
      reqBody.scroll_encoder,
      reqBody.weight,
    ],
    (error, result, fields) => {
      let responseBody = {
        status: "200",
        status_message: "succes",
      };
      if (error) {
        responseBody.status = error.code;
        responseBody.status_message = error.message;
        responseBody.reqbody = req.body;
      }
      res.send(responseBody);
    }
  );
});

module.exports = router;
