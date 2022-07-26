const Sequelize = require("sequelize");
const sequelize = require("../database/connection");
const Brand = require("./Brand");

const Encoder = sequelize.define("encoder", {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    height: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    image_url: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});
module.exports = Encoder;