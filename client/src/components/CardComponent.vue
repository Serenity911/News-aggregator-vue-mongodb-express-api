<template lang="html">
  <div id="card">
              <!-- <div  :class="contentCardClass(article)" v-for="(article, index) in localArticles[section]" @mouseover.self="cardMouseOver(section + index)" @mouseleave.self="cardMouseLeave"> -->
        <section  :class="contentCardClass(article)" v-for="(article, index) in articles[section]" >
          <main >{{ article[`${title}`] }}</main>
          <!-- <div class="hoveredNav" v-if="cardOver === section + index"> -->
          <footer class="hoveredNav">
            <button  :value="article" v-on:click="addToCheckedArticles(article)" type="button" name="select" value="select">{{checkStatusOfArticle(article)}}</button>

            <button type="button" name="button" v-on:click="handleShowArticle(article)" :value="article">Read</button>
          </footer>
        </section>
  </div>
</template>

<script>
import { eventBus } from "../main";
export default {
  name: "card-component",
  props: ["section", "articles", "sourceSelected", "title"],
  methods: {
    contentCardClass(article) {
    //   if (this.checkedArticles.includes(article)) {
    //     return "card--content selected";
    //   } else {
        return "card--content";
    //   }
    },
    addToCheckedArticles(article) {
      eventBus.$emit("toggle-reading-list", article);

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
        return "Add to list"
    //   if (this.checkedArticles.includes(article)) {
    //     return "Unselect";
    //   } else {
    //     return "Select";
    //   }
    },
    // handleSubmit(article) {
    //     console.log(article);
        
    //     eventBus.$emit("toggle-reading-list", article);
    // }
  }
};
</script>

<style lang="css" scoped>
h1 {
    font-size: 10rem;
    color: antiquewhite;
}
h3 {
  font-weight: 100;
  color: lightgray;
    padding: 0 5%;
  margin-bottom: 0;
  grid-column: 1/3;
}
div {
    color: white;
}
#card {
   background-color: tr;
  min-width: 100%;
  min-height: 200px;
  overflow-x: auto;
  display: flex;
  border-radius: 15px;
}
.card--content {
  padding: 5px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.1);
  min-width: 200px;
  margin: 10px;
  align-content: space-between;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.card--content:hover {
  color: #052049;
  background-color: rgba(255, 255, 255, 0.25);
}

.hoveredNav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-self: center;
  grid-column: 1/3;
  justify-items: stretch;
  align-items: center;
  align-self: stretch;
}

button {
  height: 20px;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
}
</style>


