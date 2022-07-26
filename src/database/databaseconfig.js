const { createPool } = require("mysql2");
require("dotenv").config();

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 10,
  multipleStatements: true,
};

const pool = createPool(config);

module.exports = { config, pool };


