const express = require("express");
const router = express.Router();
const Application = require("../../models/application");
const User = require("../../models/user");
const middleware = require("../../middleware");

// INDEX route
router.get("/", middleware.authenticated, (req, res) => {
  const { _id } = req;
  User.findById(_id)
    .populate("applications")
    .exec((err, user) => {
      if (err) {
        res.status(500).json("Unexpected error, please try again.");
      } else {
        res.send(user.applications);
      }
    });
});

// SHOW route
router.get("/:id", middleware.authenticated, (req, res) => {
  const { _id } = req;
  const appId = req.params.id;

  User.findById(_id)
    .populate({ path: "applications", match: { _id: appId } })
    .exec((err, user) => {
      if (err) {
        res.status(500).json("Unexpected error, please try again.");
      } else {
        res.send(user.applications[0]);
      }
    });
});

// EDIT route
router.patch("/:id", middleware.authenticated, (req, res) => {
  const appId = req.params.id;
  const newValues = req.body;
  Application.findByIdAndUpdate(
    appId,
    newValues,
    { useFindAndModify: false },
    (err, updatedApp) => {
      if (err) {
        res.status(500).json("Unexpected error, please try again.");
      } else {
        res.send(updatedApp);
      }
    }
  );
});

// NEW route
router.post("/", middleware.authenticated, (req, res) => {
  const { _id } = req;
  const { title, company } = req.body;
  const newApp = { title, company, stage: 0 };

  Application.create(newApp, (err, app) => {
    if (err) {
      res.status(500).json("Unexpected error, please try again.");
    } else {
      User.findByIdAndUpdate(_id, { $push: { applications: app._id } }, (err, user) => {
        if (err) {
          res.status(500).json("Unexpected error, please try again.");
        } else {
          res.send(app);
        }
      });
    }
  });
});

// DELETE router
router.delete("/:id", middleware.authenticated, (req, res) => {
  const { _id } = req;
  const appId = req.params.id;
  User.findByIdAndUpdate(_id, { $pull: { applications: appId } }, (err) => {
    if (err) {
      res.status(500).json("Unexpected error, please try again.");
    } else {
      Application.findByIdAndRemove(appId, { useFindAndModify: false }, (err, removedApp) => {
        if (err) {
          res.status(500).json("Unexpected error, please try again.");
        } else {
          res.send(removedApp);
        }
      });
    }
  });
});

module.exports = router;
