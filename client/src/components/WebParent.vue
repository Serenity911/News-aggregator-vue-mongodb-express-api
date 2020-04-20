<template lang="html">
  <div id="web-parent">
    <header>
      <h1>read://it</h1>
    </header>
    <main> 
    <p id=nav>
        <router-link :to="{name: 'add-article', params: {sourceSelected: 'sourceSelected', articles: 'articles', sections: 'sections', title: 'title'}}" > Add Article </router-link>
        <router-link to="/reading-list"> Reading List </router-link>        
        <router-link to="/read-article"> Read Article </router-link>
    </p>
    <router-view :sections='sections' :title='title' :articles='articles'></router-view>

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
      articles: {},
      savedReadingListItems: [],

      selectedArticle: null,
      articleToShow: null,

      searchTerm: "",
      selectedCategory: "allSections",

      sourceActive: false,
      articleFormActive: true,
      readingListActive: true,
      showArticleActive: false,
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
      console.log("event bus ", payload);
      this.addNewArticles(payload);
      this.selectedHeader = "readingList";
    });

    eventBus.$on("toggle-nav--reading-list", payload => {
      this.articles = {};
      this.selectedHeader = "readingList";
    });

    eventBus.$on("remove-article", item => {
      console.log(item);

      this.articles[
        item.section?.toLowerCase() || item.sectionName.toLowerCase()
      ].find(article => article === item)["read"] = false;

      let findArticle = this.savedReadingListItems.find(
        ({ id }) => id === item.id
      );

      NewsService.deleteArticle(findArticle._id).then(
        res => (this.savedReadingListItems = res)
      );
    });

    eventBus.$on("toggle-show-article", item => {
      this.selectedArticle = item;
      this.fetchArticleGuardian();
      this.selectedHeader = "readingList";
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
                read: this.isArticleInList(element)
              });
              console.log(articlesToAdd);
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
    fetchArticleGuardian() {
      const source = "guardian";
      console.log(this.selectedArticle);
      if (this.selectedArticle) {
        fetchAssistant
          .getArticle(source, this.selectedArticle.apiUrl)
          // fetch_assistant_guardian.getArticle(this.selectedArticle.apiUrl)
          .then(res => (this.articleToShow = res));
      }
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
          console.log("is it in filter by categ", article);

          return article.section.toLowerCase() === category;
        });
        return filteredArticlesByCategory;
      }
    },
    filterArticlesBySearchTerm(articles, searchTerm) {
      if (articles.length > 0) {
        const foundArticles = articles.filter(article => {
          const title = article.webTitle || article.title;
          console.log("is it in filter by search term", article);
          return title.toLowerCase().includes(searchTerm);
        });
        return foundArticles;
      }
    },
    addNewArticles(article) {
      if (this.savedReadingListItems.length > 0) {
        console.log("add article if");

        const mapOfExistingTitles = this.savedReadingListItems.map(
          item => item.title
        );

        if (!mapOfExistingTitles.includes(article.title || article.webTitle)) {
          NewsService.postArticles(article).then(article =>
            this.savedReadingListItems.push(article)
          );
        }
      } else {
        console.log("add article else");
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
</style>