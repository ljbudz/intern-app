const jwt = require("jsonwebtoken");
const { secret } = require("../config");

const middlewareObj = {};

middlewareObj.authenticated = (req, res, next) => {
  const token = req.signedCookies.token;

  // req.body.token ||
  // req.query.token ||
  // req.headers["x-access-token"] ||
  // req.cookies.token;

  if (!token) {
    res.status(401).send("Unauthorized: No token provided.");
  } else {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(401).send("Unauthorized: Inalid token.");
      } else {
        const { _id, email } = decoded;
        req._id = _id;
        req.email = email;
        next();
      }
    });
  }
};

module.exports = middlewareObj;
