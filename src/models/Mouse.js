const Sequelize = require("sequelize");
const sequelize = require("../database/connection");

const Mouse = sequelize.define("mouse", {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    msrp: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    polling_rate: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    shape: {
        type: Sequelize.ENUM(["Ambidextrous", "Symmetrical", "AmbiErgo"]),
        allowNull: false,
    },
});

module.exports = Mouse;