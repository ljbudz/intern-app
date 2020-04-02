const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const middleware = require("../middleware");
const { secret } = require("../config");

router.get("/secret", middleware.withAuth, (req, res) => {
  res.send("The password is potato");
});

router.get("/checkToken", middleware.withAuth, (req, res) => {
  res.sendStatus(200);
});

router.post("/register", (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password });
  user.save(err => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).send("User registered");
    }
  });
});

router.post("/authenticate", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: "Internal error please try again."
      });
    } else if (!user) {
      res.status(401).json({
        error: "Incorrect email or password."
      });
    } else {
      user.isCorrectPassword(password, (err, same) => {
        if (err) {
          res.status(500).json({
            error: "Internal error please try again."
          });
        } else if (!same) {
          res.status(401).json({
            error: "Incorrect email or password."
          });
        } else {
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: "1h"
          });
          res.cookie("token", token, { httpOnly: true, sameSite: "strict" }).sendStatus(200);
        }
      });
    }
  });
});

module.exports = router;
