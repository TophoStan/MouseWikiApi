const { createPool } = require("mysql");

const config = {
  user: "u184887469_user",
  host: "sql779.main-hosting.eu",
  database: "u184887469_MouseWikidb",
  password: "Wikipass123",
  connectionLimit: 10,
};

const pool = createPool(config);

module.exports = { config, pool };
