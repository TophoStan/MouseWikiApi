const { pool } = require("../database/databaseconfig");

const controller = {
  getAllMice: (req, res, next) => {
    pool.query("SELECT * FROM mousejoinquery;", (err, result, fields) => {
      if (err) {
        const error = {
          status: 501,
          message: err.message,
        };
        next(error);
      }
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
            name: data.encoderBrand,
            brand: data.encoderName,
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
        };
        mice.push(mouse);
      });

      res.status(200).json({
        status: 200,
        result: mice,
      });
    });
  },
  getMiceById: (req, res, next) => {
    const mouseId = parseInt(req.params.id);
    pool.query(
      `SELECT * FROM mousejoinquery WHERE mouse_id = ${mouseId};`,
      (err, dbresult, fields) => {
        if (err) {
          const error = {
            status: 501,
            message: err.message,
          };
          next(error);
        }
        if (dbresult.length) {
          console.log(dbresult);
          const result = dbresult[0];
          const mouse = {
            mouse_id: result.mouse_id,
            name: result.mouseName,
            msrp: result.msrp,
            polling_rate: result.polling_rate,
            weight: result.weight,
            shape: result.shape,
            mouse_brand: result.mouse_brand,
            sensor: {
              id: result.sensor_id,
              brand: result.sensorBrand,
              name: result.sensorName,
              lens: result.lens,
            },
            encoder: {
              name: result.encoderName,
              height: result.height,
            },
            main_switch: {
              switch_brand: result.switchBrand,
              name: result.switchName,
            },
            side_switch: {
              switch_brand: result.sideSwitchBrand,
              name: result.sideSwitchName,
            },
            image_item_name: result.itemname,
            mouse_picture_url: result.image_url,
          };
          res.status(200).json({
            status: 200,
            result: mouse,
          });
        } else {
          res.status(400).json({
            status: 404,
            message: `No data found while searching for mouse with id ${mouseId}`,
          });
        }
      }
    );
  },

};

module.exports = controller;
