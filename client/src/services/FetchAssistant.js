const baseURL = "http://localhost:3000/api/source/";

export default {
  getArticleBySection(selectedSource, section) {
    return fetch(baseURL + selectedSource + "/section/" + section).then(res =>
      res.json()
    );
  },

  getArticle(source, articleId) {
    return fetch(baseURL + `${source}/article/${articleId}`).then(response =>
      response.json()
    );
  },

  getAllSections(source) {
    return fetch(baseURL + `${source}/guardian/sections`).then(response =>
      response.json()
    );
  }
};
