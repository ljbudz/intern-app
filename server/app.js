const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  Application = require("./models/application"),
  mongooose = require("mongoose"),
  seedDB = require("./seeds");

const indexRoutes = require("./routes/index"),
  applicationRoutes = require("./routes/application");

mongooose.connect("mongodb://localhost:27017/intern_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, GET, DELETE, OPTIONS");
  next();
});
seedDB();

app.use("/", indexRoutes);
app.use("/applications", applicationRoutes);

app.listen(5000, function() {
  console.log("Server started.");
});
