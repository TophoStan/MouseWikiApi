const { pool } = require("../database/databaseconfig");
const ItemImage = require("../models/Image");
const logic = require("./controller.logic");
const controller = {
  getAllItemImages: async (req, res, next) => {

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
    let itemImageList;
    let itemImages = [];

    if (!(params.filter.includes("id")) & isFiltering & typeof qeuryFilter == "string") {
      console.log("GetFiltered");
      itemImageList = await logic.getListFiltered(ItemImage, itemImageList, itemImages, qeuryFilter, field, order, minRange, maxRange)
    } else if (params.filter.includes("id")) {
      console.log("GetMany");
      console.log(params.filter);
      itemImageList = await logic.getMany(ItemImage, params.filter, itemImages);
    } else {
      console.log("GetList");
      itemImageList = await logic.getList(ItemImage, itemImageList, itemImages, field, order, minRange, maxRange);
    }
    res.set({
      'Access-Control-Expose-Headers': ' Content-Range',
      'Content-Type': 'application/json',
      'Content-Range': `posts ${minRange}-${maxRange}/${itemImageList ? itemImageList.length : 0}`,
    })

    res.status(200).json({
      status: 200,
      result: itemImages,
    });

  },
  getItemImageById: async (req, res, next) => {
    const itemImage = await logic.getById(ItemImage, req.params.id);

    if (itemImage) {
      res.status(200).json({
        status: 200,
        result: itemImage,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: `No data found while searching for itemImage with id ${req.params.id}`,
      });
    }

  },
  updateItemImage: async (req, res, next) => {
    const itemImageBody = req.body;
    const itemImage = await ItemImage.findByPk(itemImageBody.id);

    if (itemImage) {
      await logic.updateOne(itemImage, itemImageBody);
      res.status(200).json({
        status: 200,
        result: itemImage.dataValues
      })
    } else {
      res.status(404).json({
        status: 404,
        message: `Not possible to update an item that does not exist`,
      });
    }
  },
  createItemImage: async (req, res, next) => {
    const itemImage = await logic.createOne(ItemImage, req.body);
    res.status(200).json({ status: 200, result: itemImage.dataValues });
  },
  deleteItemImage: async (req, res, next) => {
    const itemImage = await logic.deleteOne(ItemImage, req.params.id);
    res.status(200).json({
      status: 200,
      result: itemImage
    })
  }
};

module.exports = controller;
