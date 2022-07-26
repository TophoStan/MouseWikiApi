const { pool } = require("../database/databaseconfig");
const MicroSwitch = require("../models/Switch");
const logic = require("./controller.logic")
const controller = {
  getAllMicroSwitchs: async (req, res, next) => {

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
    let switchList;
    let switchs = [];
    if (!(params.filter.includes("id")) & isFiltering & typeof qeuryFilter == "string") {

      console.log("GetFiltered");
      switchList = await logic.getListFiltered(MicroSwitch, switchList, switchs, qeuryFilter, field, order, minRange, maxRange)
    } else if (params.filter.includes("id")) {
      console.log("GetMany");
      switchList = await logic.getMany(MicroSwitch, params.filter, switchs);
    } else {

      console.log("GetList");
      switchList = await logic.getList(MicroSwitch, switchList, switchs, field, order, minRange, maxRange);
    }

    res.set({
      'Access-Control-Expose-Headers': ' Content-Range',
      'Content-Type': 'application/json',
      'Content-Range': `posts ${minRange}-${maxRange}/${switchList ? switchList.length : 0}`,
    })



    res.status(200).json({
      status: 200,
      result: switchs,
    });
  },
  getMicroSwitchById: async (req, res, next) => {
    const microswitch = await logic.getById(MicroSwitch, req.params.id);

    if (microswitch) {
      res.status(200).json({
        status: 200,
        result: microswitch,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: `No data found while searching for microswitch with id ${req.params.id}`,
      });
    }
  },
  updateMicroSwitch: async (req, res, next) => {
    const switchBody = req.body;
    const microswitch = await MicroSwitch.findByPk(switchBody.id);

    if (microswitch) {
      await logic.updateOne(microswitch, switchBody);
      res.status(200).json({
        status: 200,
        result: microswitch.dataValues
      })
    } else {
      res.status(404).json({
        status: 404,
        message: `Not possible to update an item that does not exist`,
      });
    }
  },
  createMicroSwitch: async (req, res, next) => {
    const item = await logic.createOne(MicroSwitch, req.body);
    res.status(200).json({ status: 200, result: item.dataValues });
  },
  deleteMicroSwitch: async (req, res, next) => {
    const item = await logic.deleteOne(MicroSwitch, req.params.id);
    res.status(200).json({
      status: 200,
      result: item
    })
  }
};

module.exports = controller;
