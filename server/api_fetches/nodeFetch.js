const fetch = require("node-fetch");
const express = require("express");

const apiKeys = require("./api_key");

const GuardianApiKey = apiKeys.GuardianApiKey;
const section = "business";

// // console.log(apiKeys.GuardianApiKey);
// console.log(
//   `https://content.guardianapis.com/search?section=${section}&api-key=${GuardianApiKey}`
// );

const nodeFetch = function() {
  console.log("does it enter here?before router");

  const router = express.Router();

  router.get("/guardian", (req, res) => {
    console.log("does it enter here after the /guardian?" + new Date());
    fetch(
      `https://content.guardianapis.com/search?section=${section}&api-key=${GuardianApiKey}`
    )
      .then(response => response.json())
      .then(data => {
        const result = data.response.results;
        return res.json(result);
      });
  });

  return router;
};

module.exports = nodeFetch;
