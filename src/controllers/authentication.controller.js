const assert = require("assert");
const { pool } = require("../database/databaseconfig");
const jwt = require("jsonwebtoken");
require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("../models/User")

const jwtSecretKey = process.env.JWTSECRET;
const controller = {
    login: async (req, res, next) => {
        const findUsers = await User.findAll({ where: { emailAddress: req.body.emailAddress } })
        if (findUsers.length) {
            const match = await bcrypt.compare(
                req.body.password,
                findUsers[0].password
            );
            if (match) {
                const userinfo = findUsers[0];
                // Create an object containing the data we want in the payload.
                const payload = {
                    userId: userinfo.id,
                };
                const { password, createdAt, updatedAt, isAdmin, ...userData } = userinfo.dataValues;
                jwt.sign(
                    payload,
                    jwtSecretKey,
                    { expiresIn: "12d" },
                    function (err, token) {
                        res.status(200).json({
                            status: 200,
                            results: { ...userData, auth: token },
                        });
                    })
            } else {
                res.status(404).json({
                    status: 404,
                    message: "User not found or password invalid",
                });
            }
        } else {
            res.status(404).json({
                status: 404,
                message: "User not found or password invalid",
            });
        }

    },
    validateLogin(req, res, next) {
        // Verify that we receive the expected input
        try {
            assert(
                typeof req.body.emailAddress === "string",
                "emailAddress must be a string."
            );
            const pattern = /[a-z0-9]+@[a-z]+\.[a-z]{2,5}/;
            assert(pattern.test(req.body.emailAddress), "emailAddress is not valid");
            next();
        } catch (exception) {
            res.status(400).json({
                status: 400,
                message: exception.message,
            });
        }
    },
    validateToken(req, res, next) {
        // The headers should contain the authorization-field with value 'Bearer [token]'
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json({
                status: 401,
                message: "Authorization header missing!",
            });
        } else {
            // Strip the word 'Bearer ' from the headervalue
            const token = authHeader.substring(7, authHeader.length);

            jwt.verify(token, jwtSecretKey, (err, payload) => {
                if (err) {
                    res.status(401).json({
                        status: 401,
                        message: "Not authorized",
                    });
                }
                if (payload) {
                    // User heeft toegang. Voeg UserId uit payload toe aan
                    // request, voor ieder volgend endpoint.
                    req.userId = payload.userId;
                    next();
                }
            });
        }
    },
    validateAdmin: async (req, res, next) => {
        const tokenString = req.headers.authorization.split(" ");
        const token = tokenString[1];
        const payload = jwt.decode(token);
        const userId = payload.userId;

        const user = await User.findByPk(userId, { where: { isAdmin: 1 } });
        if (user.isAdmin) {
            next();
        } else {
            const error = {
                status: 404,
                message: "Not an admin"
            }
            next(error);
        }
    },
    loginAsAdmin: async (req, res, next) => {
        const findUsers = await User.findAll({ where: { emailAddress: req.body.emailAddress } })
        if (findUsers.length) {
            const match = await bcrypt.compare(
                req.body.password,
                findUsers[0].password
            );
            if (match && findUsers[0].isAdmin) {
                console.log(findUsers[0].isAdmin);
                const userinfo = findUsers[0];

                // Create an object containing the data we want in the payload.
                const payload = {
                    userId: userinfo.id,
                };
                const { password, createdAt, updatedAt, isAdmin, ...userData } = userinfo.dataValues;
                jwt.sign(
                    payload,
                    jwtSecretKey,
                    { expiresIn: "12d" },
                    function (err, token) {
                        res.status(200).json({
                            status: 200,
                            results: { ...userData, auth: token },
                        });
                    })
            } else {
                res.status(404).json({
                    status: 404,
                    message: "User not found or password invalid",
                });
            }
        } else {
            res.status(404).json({
                status: 404,
                message: "User not found or password invalid",
            });
        }
    }
}
module.exports = controller;