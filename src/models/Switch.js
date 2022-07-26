const Sequelize = require("sequelize");
const sequelize = require("../database/connection");

const microswitch = sequelize.define("switch", {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    image_url: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});
module.exports = microswitch;