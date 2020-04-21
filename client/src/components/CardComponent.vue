<template lang="html">
  <div id="card" class="card1--content">
    <main>{{ getTitle(article)}}</main>
    <!-- <div class="hoveredNav" v-if="cardOver === section + index"> -->
    <footer class="hoveredNav">
    <button  :value="article" v-on:click="addToReadingList(article)" type="button" name="select" value="select">{{checkStatusOfArticle(article)}}</button>

    <!-- <button type="button" name="button" v-on:click="handleShowArticle(article)" :value="article"> -->
    <li><router-link to="/read-article/">Read</router-link></li>
        <!-- </button> -->
    <router-view :articleToShow='articleToShow'></router-view>

    </footer>
  </div>
</template>

<script>
import { eventBus } from "../main";
export default {
  name: "card-component",
  props: ["article", "articleToShow", "getTitle"],
 
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
//     handleShowArticle(item) {
//       if (getSource(item) === "guardian") {
//         eventBus.$emit("toggle-show-article", item);
//       } else {
//         window.open(item.url);
//       }
//     },
    checkStatusOfArticle(article) {
      if (article.read === true) {
        return "Remove from list";
      } else {
        return "Add to list";
      }
    }
}
      //   if (this.checkedArticles.includes(article)) {
      //     return "Unselect";
      //   } else {
      //     return "Select";
      //   }
    // }
    // handleSubmit(article) {
    //     console.log(article);

    //     eventBus.$emit("toggle-reading-list", article);
    // }
  // }
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
  min-width: 10rem;
  min-height: 11rem;
  overflow-x: auto;
  display: grid;
  grid-template-areas: "main"
                        "footer";
  border-radius: 15px;
}

main {
    margin: 1rem 1rem 0 1rem;
}

.card1--content {
    margin: 0.5rem;
    padding: 5px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.1);
  min-width: 200px; 
  /* margin: 10px; */
  /* padding: 5px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.1);
  min-width: 200px;
  margin: 10px;
  align-content: space-between;
  display: grid;
  grid-template-columns: 1fr 1fr; */
}

.card1--content:hover {
  color: #052049;
  background-color: rgba(255, 255, 255, 0.25);
  
}

.selected {
  /* border: solid #65abff thick; */
  background-color: rgba(255, 255, 255, 0.1);
  font-style: italic;
}

.hoveredNav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* align-self: center; */
  /* grid-column: 1/3; */
  justify-items: stretch;
  align-items: center;
  /* align-self: stretch; */
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
  align-self: self-end;
  margin-bottom: 1rem;    
}

li {
    align-self: flex-end;
    margin-bottom: 1rem;    
}
</style>


