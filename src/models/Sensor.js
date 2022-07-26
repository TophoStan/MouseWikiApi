const Sequelize = require("sequelize");
const sequelize = require("../database/connection");

const Sensor = sequelize.define("sensor", {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lens: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = Sensor;