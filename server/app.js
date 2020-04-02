const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  Application = require("./models/application"),
  User = require("./models/user"),
  mongooose = require("mongoose"),
  seedDB = require("./seeds"),
  { port } = require("./config");

const indexRoutes = require("./routes/index"),
  applicationRoutes = require("./routes/application"),
  authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

mongooose.connect("mongodb://localhost:27017/intern_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, GET, DELETE, OPTIONS");
  next();
});
seedDB();

app.use("/", indexRoutes);
app.use("/applications", applicationRoutes);
app.use("/api", authRoutes);

app.listen(port || 8080, function() {
  console.log("Server started.");
});
