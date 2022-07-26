const Sensor = require("../models/Sensor");
const logic = require("./controller.logic")
const controller = {
  getAllSensors: async (req, res, next) => {

    const params = req.query;

    let field = 'id';
    let order = 'ASC';
    if (params.sort) {
      const sort = params.sort.replace(/["]/g, "").replace(/[\]\[]/g, "").split(",");
      field = sort[0];
      order = sort[1];
    }
    let minRange = 0;
    let maxRange = 0;
    if (params.range) {
      const range = params.range.replace("[", "").replace("]", "").split(",");
      minRange = range[0];
      maxRange = range[1];
    }
    let qeuryFilter = "";
    let isFiltering = false;
    if (params.filter.includes(":")) {
      filter = params.filter.replace("{", "").replace("}", "").split(":");
      qeuryFilter = filter[1].replace(/["]/g, "").replace(/[\]\[]/g, "");
      if (filter[0].includes("name")) {
        isFiltering = true;
      }
    }
    let sensorList;
    let sensors = [];
    if (!(params.filter.includes("id")) & isFiltering & typeof qeuryFilter == "string") {
      console.log("GetFiltered");
      sensorList = await logic.getListFiltered(Sensor, sensorList, sensors, qeuryFilter, field, order, minRange, maxRange)
    } else if (params.filter.includes("id")) {
      console.log("GetMany");
      sensorList = await logic.getMany(Sensor, params.filter, sensors);
    } else {
      console.log("GetList");
      sensorList = await logic.getList(Sensor, sensorList, sensors, field, order, minRange, maxRange);
    }

    res.set({
      'Access-Control-Expose-Headers': ' Content-Range',
      'Content-Type': 'application/json',
      'Content-Range': `posts ${minRange}-${maxRange}/${sensorList ? sensorList.length : 0}`,
    })



    res.status(200).json({
      status: 200,
      result: sensors,
    });
  },
  getSensorById: async (req, res, next) => {
    const sensor = await logic.getById(Sensor, req.params.id);

    if (sensor) {
      res.status(200).json({
        status: 200,
        result: sensor,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: `No data found while searching for sensor with id ${req.params.id}`,
      });
    }
  },
  updateSensor: async (req, res, next) => {
    const sensorBody = req.body;
    const sensor = await Sensor.findByPk(sensorBody.id);

    if (sensor) {
      await logic.updateOne(sensor, sensorBody);
      res.status(200).json({
        status: 200,
        result: sensor.dataValues
      })
    } else {
      res.status(404).json({
        status: 404,
        message: `Not possible to update an item that does not exist`,
      });
    }
  },
  createSensor: async (req, res, next) => {
    const item = await logic.createOne(Sensor, req.body);
    res.status(200).json({ status: 200, result: item.dataValues });
  },
  deleteSensor: async (req, res, next) => {
    const item = await logic.deleteOne(Sensor, req.params.id);
    res.status(200).json({
      status: 200,
      result: item
    })
  }
};

module.exports = controller;
