const { pool } = require("../database/databaseconfig");

const controller = {
  getAllBrands: (req, res, next) => {
    pool.query("SELECT * FROM `brandview`", (err, result, fields) => {
      if (err) {
        const error = {
          status: 501,
          message: err.message,
        };
        next(error);
      }
      console.log(result);
      let brands = [];
      result.forEach((data) => {
        let brand = {
          id: data.brand_id,
          brand: data.brand_name,
          market: data.primary_market,
          logo: data.logo_image_url,
        };
        brands.push(brand);
      });

      res.status(200).json({
        status: 200,
        result: brands,
      });
    });
  },
  getBrandById: (req, res, next) => {
    const brandId = req.params.id;
    pool.query(
      `SELECT * FROM brandview WHERE brand_id = ${brandId}`,
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
          const brand = {
            id: data.brand_id,
            brand: data.brand_name,
            market: data.primary_market,
            logo: data.logo_image_url,
          };

          res.status(200).json({
            status: 200,
            result: brand,
          });
        } else {
          res.status(404).json({
            status: 404,
            message: `No data found while searching for brand with id ${brandId}`,
          });
        }
      }
    );
  },
};

module.exports = controller;
