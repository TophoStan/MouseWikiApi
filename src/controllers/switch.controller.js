const { pool } = require("../database/databaseconfig");

const controller = {
  getAllSwitches: (req, res, next) => {
    pool.query("SELECT * FROM `switchjoinquery`", (err, result, fields) => {
      if (err) {
        const error = {
          status: 501,
          message: err.message,
        };
        next(error);
      }
      console.log(result);
      let switches = [];
      result.forEach((data) => {
        let mouseSwitch = {
          id: data.switch_id,
          brand_id: data.brand_id,
          brand: data.brand_name,
          name: data.name,
          image_url: data.image_url,
        };
        switches.push(mouseSwitch);
      });

      res.status(200).json({
        status: 200,
        result: switches,
      });
    });
  },
  getSwitchById: (req, res, next) => {
    const switchId = req.params.id;
    pool.query(
      `SELECT * FROM switchjoinquery WHERE sensor_id = ${switchId}`,
      (err, result, fields) => {
        if (err) {
          const error = {
            status: 501,
            message: err.message,
          };
          next(error);
        }

        if (result.length) {
          const data = result[0];
          const mouseSwitch = {
            id: data.switch_id,
            brand_id: data.brand_id,
            brand: data.brand_name,
            name: data.name,
            image_url: data.image_url,
          };

          res.status(200).json({
            status: 200,
            result: mouseSwitch,
          });
        } else {
          res.status(404).json({
            status: 404,
            message: `No data found while searching for switch with id ${switchId}`,
          });
        }
      }
    );
  },
};

module.exports = controller;
