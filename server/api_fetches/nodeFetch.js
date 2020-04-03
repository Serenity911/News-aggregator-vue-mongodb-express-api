const fetch = require("node-fetch");
const express = require("express");

const apiKeys = require("./api_key");

const GuardianApiKey = apiKeys.GuardianApiKey;
const NytApiKey = apiKeys.NytApiKey;

const nodeFetch = function() {
  const router = express.Router();

  router.get("/guardian/section/:section", (req, res) => {
    const section = req.params.section;
    fetch(
      `https://content.guardianapis.com/search?section=${section}&api-key=${GuardianApiKey}`
    )
      .then(response => response.json())
      .then(data => {
        const result = data.response.results;
        return res.json(result);
      });
  });

  router.get("/nyt/section/:section", (req, res) => {
    const section = req.params.section;
    fetch(
      `https://api.nytimes.com/svc/news/v3/content/all/${section}.json?api-key=${NytApiKey}`
    )
      .then(response => response.json())
      .then(data => {
        const result = data.results;
        return res.json(result);
      });
  });

  router.get("/guardian/article/*", (req, res) => {
    const articleApi = req.params[0];
    fetch(`${articleApi}?&show-fields=body&api-key=${GuardianApiKey}`)
      .then(response => response.json())
      .then(data => {
        const result = data.response.content;
        return res.json(result);
      });
  });

  router.get("/guardian/sections", (req, res) => {
    const articleApi = req.params[0];
    fetch(`https://content.guardianapis.com/sections?api-key=${GuardianApiKey}`)
      .then(response => response.json())
      .then(data => {
        const result = data.response;
        return res.json(result);
      });
  });

  return router;
};

module.exports = nodeFetch;
