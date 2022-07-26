const { pool } = require("../database/databaseconfig");
const Brand = require("../models/Brand");
const logic = require("./controller.logic");

const controller = {
  getAllBrands: async (req, res, next) => {

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
    let brandList;
    let brands = [];

    if (!(params.filter.includes("id")) & isFiltering & typeof qeuryFilter == "string") {
      console.log("GetFiltered");
      brandList = await logic.getListFiltered(Brand, brandList, brands, qeuryFilter, field, order, minRange, maxRange)
    } else if (params.filter.includes("id")) {
      console.log("GetMany");
      console.log(params.filter);
      brandList = await logic.getMany(Brand, params.filter, brands);
    } else {
      console.log("GetList");
      brandList = await logic.getList(Brand, brandList, brands, field, order, minRange, maxRange);
    }
    res.set({
      'Access-Control-Expose-Headers': ' Content-Range',
      'Content-Type': 'application/json',
      'Content-Range': `posts ${minRange}-${maxRange}/${brandList ? brandList.length : 0}`,
    })

    res.status(200).json({
      status: 200,
      result: brands,
    });

  },
  getBrandById: async (req, res, next) => {
    const brand = await logic.getById(Brand, req.params.id);

    if (brand) {
      res.status(200).json({
        status: 200,
        result: brand,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: `No data found while searching for brand with id ${req.params.id}`,
      });
    }

  },
  updateBrand: async (req, res, next) => {
    const brandBody = req.body;
    const brand = await Brand.findByPk(brandBody.id);

    if (brand) {
      await logic.updateOne(brand, brandBody);
      res.status(200).json({
        status: 200,
        result: brand.dataValues
      })
    } else {
      res.status(404).json({
        status: 404,
        message: `Not possible to update an item that does not exist`,
      });
    }
  },
  createBrand: async (req, res, next) => {
    const brand = await logic.createOne(Brand, req.body);
    if (brand.logo_image_url.length == 0) {
      console.log("No image provided");
      brand.update({ logo_image_url: "https://upload.wikimedia.org/wikipedia/en/thumb/0/05/PSV_Eindhoven.svg/1200px-PSV_Eindhoven.svg.png" })
    }
    res.status(200).json({ status: 200, result: brand.dataValues });
  },
  deleteBrand: async (req, res, next) => {
    const brand = await logic.deleteOne(Brand, req.params.id);
    res.status(200).json({
      status: 200,
      result: brand
    })
  }
};

module.exports = controller;
