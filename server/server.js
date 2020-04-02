const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const createRouter = require("./helpers/create_router.js");
const nodeFetch = require("./api_fetches/nodeFetch.js");

const fetchRouter = nodeFetch();
app.use(bodyParser.json());

app.use("/api/source", fetchRouter);

MongoClient.connect("mongodb://localhost:27017")
  .then(client => {
    const db = client.db("news");
    const newsCollection = db.collection("articles");
    const newsRouter = createRouter(newsCollection);
    app.use("/api/articles", newsRouter);
  })
  .catch(console.err);

app.listen(3000, function() {
  console.log(`listening on port ${this.address().port}`);
});
