const express = require("express");
const router = express.Router();
const { pool } = require("../databaseconfig");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { verifyJWT } = require("../verification");

let responseBody = {
  status: "200",
  status_message: "succes",
};

router.post("/register", async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 5);
  pool.query(
    "INSERT INTO Users (emailaddress, username, password) VALUES (?,?,?)",
    [req.body.emailaddress, req.body.username, hash],
    (error, result, fields) => {
      let responseBody = {
        status: "200",
        status_message: "succes",
      };
      if (error) {
        responseBody.status = error.code;
        responseBody.status_message = error.message;
      }
      //Almost always returns errors when it is not supposed to like duplicate key
      res.send(responseBody);
    }
  );
});

router.get("/isAuthenticated", verifyJWT, (req, res) => {
  res.send({ message: "succes" });
});

router.post("/login", (req, res) => {
  pool.query(
    "SELECT * FROM Users WHERE Emailaddress= ?",
    [req.body.emailaddress],
    async (error, result, fields) => {
      if (error) {
        responseBody.status = error.code;
        responseBody.status_message = error.message;
      }
      if (result[0]) {
        const match = await bcrypt.compare(
          req.body.password,
          result[0].password
        );
        if (match) {
          const id = result[0].id;
          const token = jwt.sign({ id }, process.env.JWTSECRET, {
            expiresIn: "1d",
          });

          res.json({ auth: true, token: token, result: result });
        } else if (error) {
          res.json({
            auth: false,
            message: "Wrong combination of email and password",
          });
        }
      } else {
        res.json({
          auth: false,
          message: "User doesn't exist with given email",
        });
      }
    }
  );
});

module.exports = router;
