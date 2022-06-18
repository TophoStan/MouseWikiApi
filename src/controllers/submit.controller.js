const { pool } = require("../database/databaseconfig");
const jwt = require('jsonwebtoken');
const controller = {

    addSubmission: (req, res, next) => {
        const tokenString = req.headers.authorization.split(" ");
        const token = tokenString[1];
        const payload = jwt.decode(token);
        const userId = payload.userId;

        const { objectType, objectData } = req.body;

        const submission = {
            user_id: userId,
            type: objectType,
            data: JSON.stringify(objectData)
        }
        pool.query(`INSERT INTO usersubmitteddata SET ?`, submission, (err, results, fields) => {
            if (err) {
                const error = {
                    status: 501,
                    message: err.message,
                };
                next(error);
            }
            res.status(200).json({
                status: 200,
                message: "Succesfully submitted data"
            })
        })
    },
    deleteSubmission: (req, res, next) => { },
    //Can only be done by an Admin
    judgeSubmission: (req, res, next) => {

        const judgement = req.body;
        const submissionId = judgement.submissionId;
        if (judgement.approval) {

            //Set submission to approved 2
            pool.query(`UPDATE usersubmitteddata SET isApproved = ${2} WHERE submission_id=${submissionId}`, (err, results, fields) => {
                if (err) {
                    const error = {
                        status: 501,
                        message: err.message,
                    };
                    next(error);
                }
                if (results.affectedRows) {
                    next();
                }
            });
        }
        //Set submission to unapproved 1
        else {
            pool.query(`UPDATE usersubmitteddata SET isApproved = ${1} WHERE submission_id=${submissionId}`, (err, results, fields) => {
                if (err) {
                    const error = {
                        status: 501,
                        message: err.message,
                    };
                    next(error);
                }
                if (results.affectedRows) {
                    res.status(200).json({
                        status: 200,
                        message: "Succesfully disapproved usersubmission"
                    });
                } else {
                    res.status(401).json({
                        status: 401,
                        message: "Submission was not updated"
                    });
                }
            });
        }
    },
    submitSubmission: (req, res, next) => {
        const judgement = req.body;
        const submissionId = judgement.submissionId;

        pool.query(`SELECT * FROM usersubmitteddata WHERE submission_id=${submissionId}`, (err, results, fields) => {
            if (results.length) {
                //console.log(results);
                const { data, type } = results[0];
                const object = JSON.parse(data);

                pool.query(`INSERT INTO ${type} SET ?`, object, (err, results, fields) => {
                    if (err) {
                        const error = {
                            status: 501,
                            message: err.message,
                        };
                        next(error);
                    } else {
                        res.status(401).json({
                            status: 401,
                            message: "Submission posted to database"
                        });
                    }
                });
            }
        });
    }
}

module.exports = controller;
