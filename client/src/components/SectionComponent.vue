<template lang="html">
  <div id="section">
              <!-- <div  :class="contentCardClass(article)" v-for="(article, index) in localArticles[section]" @mouseover.self="cardMouseOver(section + index)" @mouseleave.self="cardMouseLeave"> -->
        <section v-for="(article, index) in articles[section]" >
                  <!-- <section  class="section--content" v-for="(article, index) in articles[section]" > -->
          <card-component :article="article" :getTitle="getTitle"></card-component>
        </section>
  </div>
</template>

<script>
import { eventBus } from "../main";
import CardComponent from "./CardComponent.vue";

export default {
  name: "section-component",
  props: [
    "section",
    "articles",
    "sourceSelected",
    "articleToShow",
    "getTitle"
  ],
  components: {
    "card-component": CardComponent
  },
  methods: {
    contentCardClass(article) {
      if (article.read) {
        return "card--content selected";
      } else {
        return "card--content";
      }
    },
    addToReadingList(article) {
      if (article.read) {
        eventBus.$emit("remove-article", article);
      } else {
        eventBus.$emit("toggle-reading-list", article);
      }
    },

    checkStatusOfArticle(article) {
      if (article.read === true) {
        return "Remove from list";
      } else {
        return "Add to list";
      }
    }
  }
};
</script>

<style lang="css" scoped>
#section {
  color: white;
  min-width: 10vw;
  min-height: 14rem;
  max-height: 17rem;
  overflow-x: auto;
  display: flex;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.1);
}



.selected {
  background-color: rgba(255, 255, 255, 0.1);
  font-style: italic;
}
</style>


