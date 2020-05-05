<template lang="">
  <div id="reading-list" >
    <div class="reading-list-wrapper">
      <div class="heading">
        <div class="category-search" v-if="areThereArticles">
          <label for="">Category</label>
          <select
            v-model="selectedSection"
            v-on:change="handleCategorySelection"
          >
            <option value="allSections">All Categories</option>
            <option v-for="section in allSections" :value="section">{{
              section
            }}</option>
          </select>
        </div>

        <h1>//reading list</h1>
        <form v-if="areThereArticles" v-on:submit.prevent>
          <input type="text" v-model="search" placeholder="Search" />
        </form>
      </div>
      <h2 v-if="!areThereArticles">
        You currently have no saved articles. Please go ahead and add your
        favourite articles.
      </h2>
      <div class="section">
      <section class="card-wrapper" v-if="filteredArticles"  v-for="article in filteredArticles">
        <card-component :article="article" :articleToShow='articleToShow' :getTitle="getTitle" :getSource="getSource"/>
      </section>  
      </div>

    </div>
  </div>
</template>

<script>
import NewsService from "../services/NewsService.js";
import { eventBus } from "../main";
import CardComponent from "./CardComponent.vue";
import { log } from "util";

export default {
  name: "reading-list",
  props: [
    "filteredArticles",
    "allSections",
    "savedReadingListItems",
    "getSource",
    "articleToShow",
    "getTitle"
  ],
  components: {
    "card-component": CardComponent
  },
  data() {
    return {
      search: "",
      selectedSection: "",
      cardOverIndex: false
    };
  },
  watch: {
    search: function() {
      eventBus.$emit("search-entered", this.search);
    }
  },
  computed: {
    areThereArticles: function() {
      return this.savedReadingListItems.length !== 0;
    }
  },
  destroyed() {
    eventBus.$emit("category-filter-change", "allSections");
    eventBus.$emit("search-entered", "");
  },
  methods: {
    handleDelete(item) {
      eventBus.$emit("remove-article", item);
    },
    handleCategorySelection() {
      if (this.selectedSection !== "") {
        eventBus.$emit("category-filter-change", this.selectedSection);
      } else {
        eventBus.$emit("category-filter-change", "allSections");
      }
    }
  }
};
</script>

<style lang="css" scoped>
html,
body {
  width: 100%;
  height: 100%;
}

h1 {
  color: #b242bc;
  text-align: center;
  border-radius: 15px;
  padding: 2px 5px 2px 5px;
  align-self: center;
  margin-left: 1em;
  margin-right: 1em;
}

h2 {
  color: aliceblue;
}

.reading-list-wrapper {
  border: 5px 5px 5px 5px solid black;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.category-search {
  color: aliceblue;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
}

.heading {
  display: flex;
  align-items: center;
}

.card-wrapper {
  max-width: 15rem;
}

form {
  display: flex;
  height: 2.3em;
}

select {
  height: 3em;
}

#reading-list {
  background-color: rgba(255, 255, 255, 0.04);
  padding: 0 1rem;
}
.section {
  color: white;
  min-width: 100%;
  min-height: 14rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
