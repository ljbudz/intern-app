var mongoose = require("mongoose");
var Application = require("./models/application");

var data = [
  {
    title: "Full Stack Developer",
    company: "Amazon",
    userId: "106419485708717222762"
  },
  {
    title: "Software Junior Developer",
    company: "Facebook",
    userId: "106419485708717222762"
  },
  {
    title: "Spectacle Developer",
    company: "Snapchat",
    userId: "106419485708717222762"
  },
  {
    title: "Software Engineering Intern",
    company: "Bloomberg",
    userId: "106419485708717222762"
  },
  {
    title: "Cloud Architect",
    company: "Cisco",
    userId: "106419485708717222762"
  },
  {
    title: "Software Intern",
    company: "Yelp",
    userId: "106419485708717222762"
  },
  {
    title: "Machine Learning Engineer",
    company: "Blackberry",
    userId: "106419485708717222762"
  },
  {
    title: "Front End Developer",
    company: "Intuit",
    userId: "106419485708717222762"
  },
  {
    title: "Explorer Intern",
    company: "Microsoft",
    userId: "106419485708717222762"
  },
  {
    title: "iOS Engineer",
    company: "Apple",
    userId: "106419485708717222762"
  },
  {
    title: "Test",
    company: "Test Company",
    userId: "106419485708717222762"
  },
  {
    title: "Engineer Lead",
    company: "Sony",
    userId: "106419485708717222762"
  }
];

function seedDB() {
  Application.deleteMany({}, err => {
    if (err) {
      console.log(err);
    }
    console.log("Removed applications");
    data.forEach(seed => {
      Application.create(seed, err => {
        if (err) {
          console.log(err);
        } else {
          console.log("Added an application");
        }
      });
    });
  });
}

module.exports = seedDB;
