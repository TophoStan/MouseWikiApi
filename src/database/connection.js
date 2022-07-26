const Sequelize = require("sequelize");

const sequelize = new Sequelize("mousewikidb", "root", "", {
    dialect: "mysql",
    host: "localhost",
    // operatorAliases: false
    logging: false,
});

module.exports = sequelize;