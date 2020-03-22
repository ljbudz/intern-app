const express = require("express");
const router = express.Router();
const Application = require("../models/application");

router.get("/applications", (req, res) => {
  Application.find({}, (err, allApplications) => {
    if (err) {
      console.log(err);
    } else {
      res.send(allApplications);
    }
  });
});

module.exports = router;
