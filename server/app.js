const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongooose = require("mongoose"),
  seedDB = require("./seeds");

const routes = require("./routes");

mongooose.connect("mongodb://localhost:27017/intern_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
seedDB();
app.use("/", routes);

app.listen(5000, function() {
  console.log("Server started.");
});
