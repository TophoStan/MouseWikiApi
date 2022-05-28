const { pool } = require("../database/databaseconfig");

const controller = {
  getAllImages: (req, res, next) => {
    pool.query("SELECT * FROM images", (err, result, fields) => {
      if (err) {
        const error = {
          status: 501,
          message: err.message,
        };
        next(error);
      }
      console.log(result);
      let images = [];
      result.forEach((data) => {
        let image = {
          id: data.image_id,
          item_name: data.itemname,
          image_url: data.image_url,
        };
        images.push(image);
      });

      res.status(200).json({
        status: 200,
        result: images,
      });
    });
  },
};

module.exports = controller;
