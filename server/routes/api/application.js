const express = require("express");
const router = express.Router();
const Application = require("../../models/application");

// INDEX route
router.get("/", (req, res) => {
  Application.find({}, (err, allApplications) => {
    if (err) {
      console.log(err);
    } else {
      res.send(allApplications);
    }
  });
});

// SHOW route
router.get("/:id", (req, res) => {
  Application.findById(req.params.id, (err, application) => {
    if (err || !application) {
      console.log(err);
    } else {
      res.send(application);
    }
  });
});

// EDIT route
router.patch("/:id", (req, res) => {
  Application.findByIdAndUpdate(
    req.params.id,
    req.body,
    { useFindAndModify: false },
    (err, updatedApp) => {
      if (err) {
        console.log(err);
      } else {
        console.log(updatedApp);
        res.send(updatedApp);
      }
    }
  );
});

// NEW route
router.post("/", (req, res) => {
  console.log("called post");
  const { title, company } = req.body;
  const newApplication = { title, company };
  Application.create(newApplication, (err, newApp) => {
    if (err) {
      console.log(err);
    } else {
      res.send(newApp);
    }
  });
});

// DELETE router
router.delete("/:id", (req, res) => {
  Application.findByIdAndRemove(req.params.id, { useFindAndModify: false }, (err, removedApp) => {
    if (err) {
      console.log(err);
    } else {
      res.send(removedApp);
    }
  });
});

module.exports = router;
