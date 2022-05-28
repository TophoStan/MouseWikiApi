const { pool } = require("../database/databaseconfig");

const controller = {
  getAllEncoders: (req, res, next) => {
    pool.query("SELECT * FROM `encoderjoinqeury`", (err, result, fields) => {
      if (err) {
        const error = {
          status: 501,
          message: err.message,
        };
        next(error);
      }
      console.log(result);
      let encoders = [];
      result.forEach((data) => {
        let encoder = {
          id: data.encoder_id,
          brand_id: data.brand_id,
          brand: data.brand_name,
          name: data.name,
          height: data.height,
          image_url: data.image_url,
        };
        encoders.push(encoder);
      });

      res.status(200).json({
        status: 200,
        result: encoders,
      });
    });
  },
  getEncoderById: (req, res, next) => {
    const encoderId = req.params.id;
    pool.query(
      `SELECT * FROM brandview WHERE brand_id = ${encoderId}`,
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
          const encoder = {
            id: data.encoder_id,
            brand_id: data.brand_id,
            brand: data.brand_name,
            name: data.name,
            height: data.height,
            image_url: data.image_url,
          };

          res.status(200).json({
            status: 200,
            result: encoder,
          });
        } else {
          res.status(404).json({
            status: 404,
            message: `No data found while searching for encoder with id ${encoderId}`,
          });
        }
      }
    );
  },
};

module.exports = controller;
