const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  title: String,
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  stage: Number
});

const Application = mongoose.model("Application", applicationSchema);
module.exports = Application;
