const jwt = require("jsonwebtoken");
const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send("Token is needed!");
  } else {
    jwt.verify(token, process.env.JWTSECRET, (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "Failed to authenticate" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

module.exports = { verifyJWT };
