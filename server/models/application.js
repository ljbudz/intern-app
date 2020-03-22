const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  title: String,
  company: String,
  id: Number,
  userId: String
});

const Application = mongoose.model("Application", applicationSchema);
module.exports = Application;
