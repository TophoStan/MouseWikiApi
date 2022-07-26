const Sequelize = require("sequelize");
const sequelize = require("../database/connection");
const Encoder = require("./Encoder");

const Brand = sequelize.define("brands", {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    logo_image_url: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "https://upload.wikimedia.org/wikipedia/en/thumb/0/05/PSV_Eindhoven.svg/1200px-PSV_Eindhoven.svg.png"
    },
    primary_market: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});


module.exports = Brand;