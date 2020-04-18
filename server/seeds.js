const mongoose = require("mongoose");
const Application = require("./models/application");
const User = require("./models/user");
const Company = require("./models/company");
const getCompanyReviews = require("./scripts/parser");

var data = [
  {
    title: "Full Stack Developer",
    company: "Amazon",
    userId: "106419485708717222762",
    stage: 0
  },
  {
    title: "Software Junior Developer",
    company: "Facebook",
    userId: "106419485708717222762",
    stage: 1
  },
  {
    title: "Spectacle Developer",
    company: "Snapchat",
    userId: "106419485708717222762",
    stage: 4
  },
  {
    title: "Software Engineering Intern",
    company: "Bloomberg",
    userId: "106419485708717222762",
    stage: 0
  },
  {
    title: "Cloud Architect",
    company: "Cisco",
    userId: "106419485708717222762",
    stage: 4
  },
  {
    title: "Software Intern",
    company: "Yelp",
    userId: "106419485708717222762",
    stage: 2
  },
  {
    title: "Machine Learning Engineer",
    company: "Blackberry",
    userId: "106419485708717222762",
    stage: 3
  },
  {
    title: "Front End Developer",
    company: "Intuit",
    userId: "106419485708717222762",
    stage: 3
  },
  {
    title: "Explorer Intern",
    company: "Microsoft",
    userId: "106419485708717222762",
    stage: 2
  },
  {
    title: "iOS Engineer",
    company: "Apple",
    userId: "106419485708717222762",
    stage: 1
  },
  {
    title: "Test",
    company: "Test Company",
    userId: "106419485708717222762",
    stage: 4
  },
  {
    title: "Engineer Lead",
    company: "Sony",
    userId: "106419485708717222762",
    stage: 1
  }
];

async function seedCompanies() {
  const newData = data;
  for await (const app of newData) {
    await Company.findOne({ name: app.company })
      .then(async (company) => {
        if (company === null) {
          const reviews = await getCompanyReviews(app.company);
          Company.create({ name: app.company, reviews })
            .then((newCompany) => {
              app.company = newCompany._id;
            })
            .catch((err) => console.log(err));
        } else {
          app.company = company._id;
        }
      })
      .catch((err) => console.log(err));
  }

  return newData;
}

async function seedDB() {
  const newData = await seedCompanies();

  Application.deleteMany({}, (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Removed applications");
    User.findOne({ email: "hello@me.com" }, (err, user) => {
      if (err) return console.log(err);
      user.applications = [];
      Application.insertMany(newData, (err, app) => {
        app.forEach(({ _id }) => {
          user.applications.push(_id);
        });
        user.save();
      });
    });
  });
}

module.exports = seedDB;
