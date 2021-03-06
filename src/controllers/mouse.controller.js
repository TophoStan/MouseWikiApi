const { pool } = require("../database/databaseconfig");

const controller = {
  getAllMice: (req, res, next) => {
    pool.query(`SELECT * FROM mousejoinquery;`, (err, result, fields) => {
      if (err) {
        const error = {
          status: 501,
          message: err.message,
        };
        next(error);
      }

      if (result) {
        const totalResults = result.length || 0;
        const range = req.query.range.replace("[", "").replace("]", "").split(",");
        const minRange = range[0] || 0;

        const maxRange = range[1] || 0;
        let data = [];
        let i = 0;
        result.forEach((dbdata) => {

          let mouse = {
            id: dbdata.mouse_id,
            name: dbdata.mouseName,
            msrp: dbdata.msrp,
            polling_rate: dbdata.polling_rate,
            weight: dbdata.weight,
            shape: dbdata.shape,
            mouse_brand: dbdata.mouse_brand,
            sensor: {
              id: dbdata.sensor_id,
              brand: dbdata.sensorBrand,
              name: dbdata.sensorName,
              lens: dbdata.lens,
            },
            encoder: {
              name: dbdata.encoderBrand,
              brand: dbdata.encoderName,
              height: dbdata.height,
            },
            main_switch: {
              switch_brand: dbdata.switchBrand,
              name: dbdata.switchName,
            },
            side_switch: {
              switch_brand: dbdata.sideSwitchBrand,
              name: dbdata.sideSwitchName,
            },
            image_item_name: dbdata.itemname,
            mouse_picture_url: dbdata.image_url,
          };
          if (i >= minRange && i <= maxRange) {
            data.push(mouse);
          }
          i++;
        });
        res.set({
          'Access-Control-Expose-Headers': ' Content-Range',
          'Content-Type': 'application/json',
          'Content-Range': `posts ${minRange}-${maxRange}/${totalResults}`,
          'X-Total-Count': `posts ${minRange}-${maxRange}/${totalResults}`,
        })

        res.status(200).json({
          status: 200,
          result: data,
        }
        );
      } else {
        res.status(401).json({
          status: 401,
          message: "Was not able to fetch mice",
        });
      }
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
  addMouse: (req, res, next) => {
    const mouse = req.body;
    pool.query(`INSERT INTO mouse SET ?`, mouse, (err, result, fields) => {
      if (err) {
        const error = {
          status: 404,
          message: err.message
        }
        next(error)
      } else {
        res.status(200).json({
          status: 200,
          result: "succesfully inserted mouse!"
        })
      }
    })

  },
  updateMouse: (req, res, next) => {
    const mouse_id = req.body.mouse_id;
    const mouse = req.body;
    delete mouse.mouse_id;
    pool.query(`SELECT * FROM mouse WHERE mouse_id=${mouse_id} `, (err, result, fields) => {
      if (err) {
        const error = {
          status: 404,
          message: err.message
        }
        next(error)
      }
      if (result.length) {
        pool.query(`UPDATE mouse SET ? WHERE mouse_id = ${mouse_id}`, mouse, (err, result, fields) => {
          if (err) {
            const error = {
              status: 404,
              message: err.message
            }
            next(error)
          }
          if (result.changedRows) {
            res.status(200).json({
              status: 200,
              result: "Succesfully updated mouse!"
            })
          } else {
            res.status(404).json({
              status: 200,
              result: "Mouse was not updated!"
            })
          }
        })
      }
    })
  },
  deleteMouse: (req, res, next) => {
    const mouseId = req.body.mouse_id;
    pool.query(`DELETE FROM mouse WHERE mouse_id=${mouseId}`, (err, result, fields) => {
      if (err) {
        const error = {
          status: 404,
          message: err.message
        }
        next(error)
      }
      if (result.changedRows) {
        res.status(200).json({
          status: 200,
          result: "Succesfully deleted mouse!"
        })
      } else {
        res.status(404).json({
          status: 200,
          result: "Mouse was not deleted!"
        })
      }
    })
  }
};

module.exports = controller;
