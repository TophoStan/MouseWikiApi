const { pool } = require("../database/databaseconfig");
const Encoder = require("../models/Encoder");
const logic = require("./controller.logic");
const controller = {
  getAllEncoders: async (req, res, next) => {

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
    let encoderList;
    let encoders = [];
    if (!(params.filter.includes("id")) & isFiltering & typeof qeuryFilter == "string") {

      console.log("GetFiltered");
      encoderList = await logic.getListFiltered(Encoder, encoderList, encoders, qeuryFilter, field, order, minRange, maxRange)
    } else if (params.filter.includes("id")) {
      console.log("GetMany");
      encoderList = await logic.getMany(Encoder, params.filter, encoders);
    } else {
      console.log("GetList");
      encoderList = await logic.getList(Encoder, encoderList, encoders, field, order, minRange, maxRange);
    }

    res.set({
      'Access-Control-Expose-Headers': ' Content-Range',
      'Content-Type': 'application/json',
      'Content-Range': `posts ${minRange}-${maxRange}/${encoderList ? encoderList.length : 0}`,
    })



    res.status(200).json({
      status: 200,
      result: encoders,
    });
  },
  getEncoderById: async (req, res, next) => {
    const encoder = await logic.getById(Encoder, req.params.id);

    if (encoder) {
      res.status(200).json({
        status: 200,
        result: encoder,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: `No data found while searching for encoder with id ${req.params.id}`,
      });
    }
  },
  updateEncoder: async (req, res, next) => {
    const encoderBody = req.body;
    const encoder = await Encoder.findByPk(encoderBody.id);

    if (encoder) {
      await logic.updateOne(encoder, encoderBody);
      res.status(200).json({
        status: 200,
        result: encoder.dataValues
      })
    } else {
      res.status(404).json({
        status: 404,
        message: `Not possible to update an item that does not exist`,
      });
    }
  },
  createEncoder: async (req, res, next) => {
    const item = await logic.createOne(Encoder, req.body);
    res.status(200).json({ status: 200, result: item.dataValues });
  },
  deleteEncoder: async (req, res, next) => {
    const item = await logic.deleteOne(Encoder, req.params.id);
    res.status(200).json({
      status: 200,
      result: item
    })
  }
};

module.exports = controller;
