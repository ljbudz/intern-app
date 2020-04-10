const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const middleware = require("../../middleware");
const { secret } = require("../../config");

router.get("/verify", middleware.authenticated, (req, res) => {
  console.log(req.secret);
  const { _id, email } = req;
  res.status(200).json({ _id, email });
});

router.get("/logout", middleware.authenticated, (req, res) => {
  res.clearCookie("token").end();
});

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        res.status(400).json({ error: "Email already exists" });
      }
      const newUser = new User({
        email: req.body.email,
        password: req.body.password
      });
      newUser.save((err, user) => {
        if (err) {
          res.status(500).json("Unexpected error, please try again.");
        } else {
          res.status(200).json(user);
        }
      });
    })
    .catch((err) => res.status(500).json("Unexpected error, please try again."));
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "Email not found." });
      }

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
          const payload = { email, _id: user._id };
          const token = jwt.sign(payload, secret, {
            expiresIn: "1h"
          });
          res
            .cookie("token", token, { httpOnly: true, sameSite: "strict", signed: true })
            .sendStatus(200);
        }
      });
    })
    .catch((err) => res.status(500).json({ error: "Unexpected error, please try again." }));
});

module.exports = router;
