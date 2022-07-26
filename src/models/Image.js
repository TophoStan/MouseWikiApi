const Sequelize = require("sequelize");
const sequelize = require("../database/connection");

const Image = sequelize.define("images", {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    image_url: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});
module.exports = Image;