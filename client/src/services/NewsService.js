const baseURL = "https://news-aggregator-back.herokuapp.com/api/articles/";

export default {
  getArticles() {
    return fetch(baseURL).then((res) => res.json());
  },
  postArticles(payload) {
    payload.title = payload.webTitle || payload.title;
    delete payload.webTitle;

    payload.section = payload.sectionId || payload.section;
    delete payload.sectionId;

    // if (!payload.source) {
    //   payload.source = "guardian";
    // } else if (payload.source) {
    //   payload.source = "nyt";
    // }

    return fetch(baseURL, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());
  },
  deleteArticle(id) {
    return fetch(baseURL + id, {
      method: "DELETE"
    }).then((res) => res.json())
  }
};
