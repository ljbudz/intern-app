const HTMLparser = require("node-html-parser");
const { key } = require("../config");
const scraperapiClient = require("scraperapi-sdk")(key);

async function getCompanyReviews(companyName) {
  return await scraperapiClient
    .get(`https://ca.indeed.com/cmp/${companyName}`)
    .then((response) => {
      const root = HTMLparser.parse(response).querySelector(".cmp-ReviewAndRatingsStory-rating");

      if (root === null) return {};

      const table = root.childNodes.filter((node) => {
        return node.tagName === "table";
      });

      if (table === null) return {};

      const tableBody = table[0].childNodes.filter((node) => {
        return node.tagName === "tbody";
      });

      const tableRows = [];
      tableBody[0].childNodes.forEach((node) => {
        tableRows.push(node);
      });

      const companyReviewObj = {};

      tableRows.forEach((row) => {
        const rating = row.childNodes[0].childNodes[0].rawText.toString();
        const category = row.childNodes[2].childNodes[0].rawText.toString();
        companyReviewObj[category] = rating;
      });

      return companyReviewObj;
    })
    .catch((err) => {
      console.log(err.statusCode);
      return {};
    });
}

module.exports = getCompanyReviews;
