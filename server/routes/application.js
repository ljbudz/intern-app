const express = require("express");
const router = express.Router();
const Application = require("../models/application");

router.get("/", (req, res) => {
  Application.find({}, (err, allApplications) => {
    if (err) {
      console.log(err);
    } else {
      res.send(allApplications);
    }
  });
});

router.get("/:id", (req, res) => {
  Application.findById(req.params.id, (err, application) => {
    if (err || !application) {
      console.log(err);
    } else {
      res.send(application);
    }
  });
});

router.post("/", (req, res) => {
  console.log(req.body);
  const { title, company } = req.body;
  const newApplication = { title, company };
  Application.create(newApplication, (err, newApp) => {
    if (err) {
      console.log(err);
    } else {
      console.log(newApp);
      res.send(newApp);
    }
  });
});

module.exports = router;
