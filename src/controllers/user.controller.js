const { pool } = require("../database/databaseconfig");
const bcrypt = require("bcryptjs");
const User = require("../models/User")

const controller = {
    registerUser: async (req, res, next) => {
        await User.sync({ alter: true });
        console.log(req.body.emailAddress);
        console.log(req.body);
        const findUsers = await User.findAll({ where: { emailaddress: req.body.emailAddress } })
        console.log(findUsers);
        if (findUsers.length) {
            res.status(400).json({
                status: 400,
                result: "Unable to register with an existing emailAddress"
            })
        } else {
            const hash = await bcrypt.hash(req.body.password, 5);
            // const user = { emailAddress: req.body.emailAddress, username: req.body.username, password: hash };
            const user = await User.create({
                emailaddress: req.body.emailAddress, username: req.body.username, password: hash
            });
            res.status(201).json({
                status: 201,
                result: user
            })
        }
    },
}
module.exports = controller;