<template lang="html">
  <div id="web-parent">
    <header>
      <h1>read://it</h1>
    </header>
    <main> 
    <nav id=nav>
        <router-link :to="{name: 'select-source'}" > Add Article </router-link>
        <router-link :to="{name: 'reading-list'}"> Reading List </router-link>        
    </nav>
    <router-view :sections='sections' :title='title' :articles='articles' :filteredArticles='filteredArticles' :allSections='allSections' :savedReadingListItems='savedReadingListItems' :articleToShow='articleToShow' :getSource='getSource' :getTitle='getTitle'></router-view>

    </main>
  </div>
</template>

<script>
import { eventBus } from "../main";
import NewsService from "../services/NewsService.js";
import fetchAssistant from "../services/FetchAssistant.js";
import SelectArticleForm from "./SelectArticleForm.vue";
import NewsNav from "./NewsNav.vue";
import SourceSelect from "./SourceSelect.vue";
import ReadingList from "./ReadingList.vue";
import ShowArticle from "./ShowArticle.vue";

export default {
  name: "web-parent",
  data() {
    return {
      articles: null,
      savedReadingListItems: [],
      selectedArticle: null,
      articleToShow: null,
      searchTerm: "",
      selectedCategory: "allSections",
      allSections: ["business", "technology", "food", "world", "travel"],
      selectedHeader: "readingList",
      sections: null,
      sourceSelected: "guardian",
      title: ""
    };
  },
  computed: {
    filteredArticles: function() {
      if (this.searchTerm != "" && this.selectedCategory) {
        let filteredArticlesBySearchTerm = this.filterArticlesBySearchTerm(
          this.savedReadingListItems,
          this.searchTerm
        );
        let filteredArticlesBySearchTermAndSelectedCategory = this.filterArticlesByCategory(
          filteredArticlesBySearchTerm,
          this.selectedCategory
        );
        return filteredArticlesBySearchTermAndSelectedCategory;
      }
      if (this.selectedCategory != "allSections") {
        let filteredArticlesBySelectedCategory = this.filterArticlesByCategory(
          this.savedReadingListItems,
          this.selectedCategory
        );

        return filteredArticlesBySelectedCategory;
      }
      return this.savedReadingListItems;
    }
  },

  mounted() {
    this.fetchReadingList();

    this.readingListClass();
    this.addArticleClass();

    eventBus.$on("search-entered", search => {
      this.searchTerm = search;
    });

    eventBus.$on("category-filter-change", category => {
      this.selectedCategory = category;
    });

    eventBus.$on("toggle-select-source", () => {
      this.articles = {};
      this.selectedHeader = "addNewArticle";
    });

    eventBus.$on("toggle-select-article-form", source => {
      this.sourceSelected = source;
      this.fetchAllArticles(this.allSections, source);
      this.selectedHeader = "addNewArticle";
    });

    eventBus.$on("toggle-reading-list", payload => {
      this.articles = {};
      this.addNewArticles(payload);
      this.selectedHeader = "readingList";
    });

    eventBus.$on("remove-article", item => {
      let findArticle = this.savedReadingListItems.find(
        ({ id }) => id === item.id
      );
      NewsService.deleteArticle(findArticle._id).then(
        res => (this.savedReadingListItems = res)
      );
    });

    eventBus.$on("toggle-show-article", item => {
      if (item) {
        this.fetchArticleGuardian(item);
      } else {
        this.articleToShow = null;
      }
    });
  },
  methods: {
    fetchAllArticles(arrayOfCategories, source) {
      this.articles = {};
      const promises = arrayOfCategories.map(section => {
        return fetchAssistant
          .getArticleBySection(source, section)
          .then(fetchedArticles => {
            let articlesToAdd = [];
            fetchedArticles.forEach(element => {
              articlesToAdd.push({
                ...element,
                read: this.isArticleInList(element),
                source: this.getSource(element)
              });
            });
            this.articles[section] = articlesToAdd;
          })
          .then(res => {
            this.title = this.selectTitleProperty();
          })
          .catch(console.error);
      });
      Promise.all(promises).then(sections => {
        this.sections = Object.keys(this.articles);
      });
    },
    fetchReadingList() {
      NewsService.getArticles().then(res => (this.savedReadingListItems = res));
    },
    fetchArticleGuardian(item) {
      const title = this.getTitle(item);
      const source = this.getSource(item);
      if (source === "guardian") {
        fetchAssistant
          .getArticle(source, item.apiUrl)
          // fetch_assistant_guardian.getArticle(this.selectedArticle.apiUrl)
          .then(res => (this.articleToShow = res));
      }
    },
    getSource(item) {
      if (item.webTitle) {
        return "guardian";
      }
      if (item.title) {
        return "nyt";
      }
    },
    getTitle(item) {
      return item.title || item.webTitle;
    },
    // fetchSections() {
    //   fetch_assistant_guardian.getAllSections()
    //   .then(res => this.allSections = res.map(item => item.webTitle))
    // },
    filterArticlesByCategory(articles, category) {
      if (category === "allSections") {
        return articles;
      } else {
        let filteredArticlesByCategory = articles.filter(article => {
          return article.section.toLowerCase() === category;
        });
        return filteredArticlesByCategory;
      }
    },
    filterArticlesBySearchTerm(articles, searchTerm) {
      if (articles.length > 0) {
        const foundArticles = articles.filter(article => {
          const title = article.webTitle || article.title;
          return title.toLowerCase().includes(searchTerm);
        });
        return foundArticles;
      }
    },
    addNewArticles(article) {
      if (this.savedReadingListItems.length > 0) {
        const mapOfExistingTitles = this.savedReadingListItems.map(
          item => item.title
        );

        if (!mapOfExistingTitles.includes(article.title || article.webTitle)) {
          NewsService.postArticles(article).then(article =>
            this.savedReadingListItems.push(article)
          );
        }
      } else {
        NewsService.postArticles(article).then(article =>
          this.savedReadingListItems.push(article)
        );
      }
    },
    readingListClass() {
      return this.selectedHeader === "readingList"
        ? "headerActive"
        : "headerInactive";
    },
    addArticleClass() {
      return this.selectedHeader === "addNewArticle"
        ? "headerActive"
        : "headerInactive";
    },
    selectTitleProperty() {
      if (this.sourceSelected === "nyt") {
        return "title";
      } else if (this.sourceSelected === "guardian") {
        return "webTitle";
      }
    },
    isArticleInList(article) {
      const mapOfExistingTitles = this.savedReadingListItems.map(
        item => item.title
      );
      return mapOfExistingTitles.includes(article.title || article.webTitle);
    }
  },
  components: {
    "news-nav": NewsNav,
    "select-article-form": SelectArticleForm,
    "source-select": SourceSelect,
    "reading-list": ReadingList,
    "show-article": ShowArticle
  }
};
</script>

<style lang="css" scoped>
header {
  background-color: rgba(255, 255, 255, 0.1);
}

h1 {
  color: #7a99ff;
  font-size: 3rem;
  text-align: center;
  padding: 0.5rem;
}

main {
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
}

nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: rgba(255, 255, 255, 0.07);
  padding: 1rem;
  justify-items: center;
  width: 100vw;
  text-align: center;
  margin-bottom: 3rem;
}
nav > a {
  text-decoration: none;
  font-size: 3rem;
  color: #b242bc;
  width: 17rem;
  background-color: rgba(255, 255, 255, 0.1);
  /* color: #7a99ff; */
  color: lightgray;
  border: 1px solid black;
  padding: 0.5rem;
  font-family: "IM Fell English", serif;
}

nav > a:hover {
  background-color: rgba(255, 255, 255, 0.25);
}
</style>