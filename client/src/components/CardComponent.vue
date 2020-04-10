<template lang="html">
  <div>
              <!-- <div  :class="contentCardClass(article)" v-for="(article, index) in localArticles[section]" @mouseover.self="cardMouseOver(section + index)" @mouseleave.self="cardMouseLeave"> -->
        <div  :class="contentCardClass(article)" v-for="(article, index) in localArticles[section]">
          <h3 >{{ article[`${localTitle}`] }}</h3>
          <!-- <div class="hoveredNav" v-if="cardOver === section + index"> -->
          <div class="hoveredNav">
            <button  :value="article" v-on:click="addToCheckedArticles(article)" type="button" name="select" value="select">{{checkStatusOfArticle(article)}}</button>

            <button type="button" name="button" v-on:click="handleShowArticle(article)" :value="article">Read</button>
          </div>


        </div>
  </div>
</template>

<script>
// import  from "./components/";
export default {
  name: "card-component",
  props: ["section", "localArticles", "sourceSelected", "checkedArticles","localTitle"],
  methods: {
    contentCardClass(article) {
    //   if (this.checkedArticles.includes(article)) {
    //     return "card--content selected";
    //   } else {
    //     return "card--content";
    //   }
    },
    addToCheckedArticles(article) {
    //   if (this.checkedArticles.includes(article)) {
    //     let indexOfArticleIncluded = this.checkedArticles.indexOf(article);
    //     this.checkedArticles.splice(indexOfArticleIncluded, 1);
    //   } else {
    //     this.checkedArticles.push(article);
    //   }
    },
    handleShowArticle(item) {
      if (this.sourceSelected === "guardian") {
        eventBus.$emit("toggle-show-article", item);
      } else {
        window.open(item.url);
      }
    },
       checkStatusOfArticle(article) {
    //   if (this.checkedArticles.includes(article)) {
    //     return "Unselect";
    //   } else {
    //     return "Select";
    //   }
    }
  }
};
</script>

<style lang="css" scoped>
h1 {
    font-size: 10rem;
    color: antiquewhite;
}
div {
    color: white;
}
</style>


