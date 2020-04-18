const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: String,
  reviews: {}
});

const Company = mongoose.model("Company", companySchema);
module.exports = Company;
