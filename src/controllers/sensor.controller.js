const { pool } = require("../database/databaseconfig");

const controller = {
  getAllSensors: (req, res, next) => {
    pool.query("SELECT * FROM `sensorjoinquery`", (err, result, fields) => {
      if (err) {
        const error = {
          status: 501,
          message: err.message,
        };
        next(error);
      }
      console.log(result);
      let sensors = [];
      result.forEach((data) => {
        let sensor = {
          id: data.sensor_id,
          brand_id: data.brand_id,
          brand: data.brand_name,
          name: data.name,
          lens: data.lens,
        };
        sensors.push(sensor);
      });

      res.status(200).json({
        status: 200,
        result: sensors,
      });
    });
  },
  getSensorById: (req, res, next) => {
    const mouseId = req.params.id;
    pool.query(
      `SELECT * FROM sensorjoinquery WHERE sensor_id = ${mouseId}`,
      (err, result, fields) => {
        if (err) {
          const error = {
            status: 501,
            message: err.message,
          };
          next(error);
        }

        if (result.length) {
        }
        const sensor = {
          id: data.sensor_id,
          brand_id: data.brand_id,
          brand: data.brand_name,
          name: data.name,
          lens: data.lens,
        };

        res.status(200).json({
          status: 200,
          result: sensor,
        });
      }
    );
  },
};

module.exports = controller;
