const { pool } = require("../database/databaseconfig");
const Mouse = require("../models/Mouse");
const logic = require("./controller.logic");
const controller = {
  getAllMouses: async (req, res, next) => {

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
    let filter = "";
    let isFiltering = false;
    if (params.filter.includes(":")) {

      filter = params.filter.replace("{", "").replace("}", "").split(":");
      qeuryFilter = filter[1].replace(/["]/g, "").replace(/[\]\[]/g, "");
      if (filter[0].includes("name")) {
        isFiltering = true;
      }
    }
    let mouseList;
    let mouses = [];

    if (!(params.filter.includes("id")) & isFiltering & typeof qeuryFilter == "string") {
      console.log("GetFiltered");
      mouseList = await logic.getListFiltered(Mouse, mouseList, mouses, qeuryFilter, field, order, minRange, maxRange)
    } else if (params.filter.includes("id")) {
      console.log("GetMany");
      console.log(params.filter);
      mouseList = await logic.getMany(Mouse, params.filter, mouses);
    } else {
      console.log("GetList");
      mouseList = await logic.getList(Mouse, mouseList, mouses, field, order, minRange, maxRange);
    }
    res.set({
      'Access-Control-Expose-Headers': ' Content-Range',
      'Content-Type': 'application/json',
      'Content-Range': `posts ${minRange}-${maxRange}/${mouseList ? mouseList.length : 0}`,
    })

    res.status(200).json({
      status: 200,
      result: mouses,
    });

  },
  getMouseById: async (req, res, next) => {
    const mouse = await logic.getById(Mouse, req.params.id);

    if (mouse) {
      res.status(200).json({
        status: 200,
        result: mouse,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: `No data found while searching for mouse with id ${req.params.id}`,
      });
    }

  },
  updateMouse: async (req, res, next) => {
    const mouseBody = req.body;
    const mouse = await Mouse.findByPk(mouseBody.id);

    if (mouse) {
      await logic.updateOne(mouse, mouseBody);
      res.status(200).json({
        status: 200,
        result: mouse.dataValues
      })
    } else {
      res.status(404).json({
        status: 404,
        message: `Not possible to update an item that does not exist`,
      });
    }
  },
  createMouse: async (req, res, next) => {
    const mouse = await logic.createOne(Mouse, req.body);
    res.status(200).json({ status: 200, result: mouse.dataValues });
  },
  deleteMouse: async (req, res, next) => {
    const mouse = await logic.deleteOne(Mouse, req.params.id);
    res.status(200).json({
      status: 200,
      result: mouse
    })
  }
};

module.exports = controller;
