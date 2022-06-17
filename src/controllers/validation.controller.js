const { pool } = require("../database/databaseconfig");
const assert = require("assert");
const controller = {
  validateNumber: (req, res, next) => {
    const id = req.params.id;
    //console.log(`The provided id: ${parseInt(id)}`);
    try {
      assert(Number.isInteger(parseInt(id)), "Id must be a number (isInteger)");
      next();
    } catch (err) {
      //console.log(req.body);
      const error = {
        status: 400,
        message: err.message,
      };
      next(error);
    }
  },
  validatePropertiesMouse: (req, res, next) => {
    const mouse = req.body;
    try {
      assert(typeof mouse.brand_id === "number", "brand_id must be a number")
      assert(typeof mouse.name === "string", "Mouse name must be a string");
      assert(typeof mouse.msrp === "number", "MSRP must be a number");
      assert(typeof mouse.polling_rate === "number", "Polling rate must be a number");
      assert(typeof mouse.shape === "string", "Shape must be a string")
      assert(typeof mouse.sensor_id === "number", "sensor_id must be a number")
      assert(typeof mouse.weight === "number", "Weight must be a number")
      assert(typeof mouse.encoder_id === "number", "encoder_id must be a number")
      assert(typeof mouse.side_switch_id === "number", "side_switch_id must be a number")
      assert(typeof mouse.main_switch_id === "number", "main_switch_id must be a number")
      assert(typeof mouse.image_id === "number", "image_id must be a number")
      next()
    }
    catch (err) {
      const error = {
        status: 400,
        message: err.message,
      };
      next(error);
    }
  },
  validateUser: (req, res, next) => {
    let user = req.body;
    let {
      username,
      emailAddress,
      password,
    } = user;
    try {
      assert(typeof username === "string", "username must be a string");
      assert(typeof emailAddress === "string", "EmailAddress must be a string");
      assert(typeof password === "string", "Password must a string");
      const pattern = /[a-z0-9]+@[a-z]+\.[a-z]{2,5}/;
      assert(pattern.test(req.body.emailAddress), "emailAddress is not valid");
      next();
    } catch (err) {
      const error = {
        status: 400,
        message: err.message,
      };
      next(error);
    }
  },
  validateUserSubmission: (req, res, next) => {
    const { objectType, objectData } = req.body;
    try {
      assert(objectType == "sensor" || objectType == "mouse" || objectType == "encoder" || objectType == "microswitch" || objectType == "image" || objectType == "brand", "objectType must be one of the following'brand','encoder','image','sensor','microswitch','mouse'");
      assert(typeof objectType === "string", "objectType must be a string");
      assert(typeof objectData === "object", "objectData must be an object");
      next();
    } catch (err) {
      const error = {
        status: 400,
        message: err.message,
      };
      next(error);
    }
  }

};
module.exports = controller;
