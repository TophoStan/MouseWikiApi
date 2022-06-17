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
            if (err) throw err;
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
        if (judgement.approval) {
            const object = judgement.object;
            switch (objectType) {
                case "mouse":
                    break;
                case "encoder":
                    break;
                case "microswitch":
                    break;
                case "sensor":
                    break;
                case "brand":
                    break;
                case "image":
                    break;

                default:
                    break;
            }
        }
        //Set submission to unapproved 1
        else {
            const submissionId = judgement.submissionId;
            pool.query(`UPDATE usersubmitteddata SET isApproved = ${1} WHERE submission_id=${submissionId}`, (err, results, fields) => {
                if (err) throw err;
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
    }
}

module.exports = controller;
