const Sequelize = require("sequelize");
const sequelize = require("../database/connection");

const User = sequelize.define("users", {

    emailaddress: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'UK_users_Email'
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});
module.exports = User;