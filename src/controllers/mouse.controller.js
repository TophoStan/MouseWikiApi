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
    const mouseId = req.params.id;
    console.log(mouseId);
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
            status: 400,
            message: "Mouse with provided id does not exist",
          });
        }
      }
    );
  },
  addMouse: (req, res, next) => {
    const mouse = req.body;
    pool.query("INSERT INTO Mice SET ?", mouse, (err, result, fields) => {
      if (err) {
        const error = {
          status: 404,
          message: err.message,
        };
        next(error);
      } else {
        res.status(200).json({
          status: 200,
          result: mouse,
        });
      }
    });
  },
  deleteMouse: (req, res, next) => {
    const mouseId = req.params.id;
    pool.query(`DELETE FROM mouse WHERE id =${mouseId}`, (req, res, next) => {
      if (err) {
        const error = {
          status: 404,
          message: err.message,
        };
        next(error);
      } else {
        res.status(200).json({
          status: 200,
          message: `Succesfully deleted ${mouseId}`,
        });
      }
    });
  },
  updateMouse: (req, res, next) => {
    const mouseId = req.params.id;
    const mouse = req.body;
    pool.query(
      `UPDATE mouse SET ? WHERE id =${mouseId}`,
      mouse,
      (req, res, next) => {
        if (err) {
          const error = {
            status: 404,
            message: err.message,
          };
          next(error);
        } else {
          res.status(200).json({
            status: 200,
            message: `Succesfully updated ${mouseId}`,
          });
        }
      }
    );
  },
};

module.exports = controller;
