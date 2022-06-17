const { pool } = require("../database/databaseconfig");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const controller = {
    registerUser: async (req, res, next) => {
        console.log(req.body);
        const hash = await bcrypt.hash(req.body.password, 5);
        const user = { emailAddress: req.body.emailAddress, username: req.body.username, password: hash };
        pool.query(
            "INSERT INTO users SET ?",
            user,
            (err, result, fields) => {
                if (err) {
                    console.log(err);
                    const error = {
                        status: 400,
                        message: "User was unable to be registered"
                    }
                    next(error);
                } else {
                    res.status(200).json({
                        status: 200,
                        results: { id: result.insertId, ...user },
                    });
                }
            }
        );
    },
    getUserById: (req, res, next) => {
        const userId = req.params.id;
        const tokenString = req.headers.authorization.split(" ");
        const token = tokenString[1];
        const payload = jwt.decode(token);
        const userIdToken = payload.userId;

        if (userId == userIdToken) {
            pool.query(
                `SELECT * FROM user WHERE id =${userId}`,
                (err, results, fields) => {
                    const user = results[0];
                    if (err) {
                        const error = {
                            status: 500,
                            message: err.message,
                        };
                        next(error);
                    } else if (user != null) {
                        res.status(200).json({
                            status: 200,
                            result: user,
                        });
                    } else {
                        const error = {
                            status: 404,
                            message: "User with provided Id does not exist",
                        };
                        next(error);
                    }
                }
            );
        } else {
            const error = {
                status: 403,
                message: "You cannot access an account that is not yours!",
            };
            next(error);
        }
    },
}
module.exports = controller;