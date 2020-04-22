<template lang="html">
  <div id="card" class="card1--content">
    <main>{{ getTitle(article)}}</main>
    <footer class="hoveredNav">
    <button  :value="article" v-on:click="addToReadingList(article)" type="button" name="select" value="select">{{checkStatusOfArticle(article)}}</button>
    <button><router-link to="/read-article/" class="link">Read</router-link></button>
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




#card {
  color: lightgray;
  background-color: tr;
  min-width: 10rem;
  min-height: 11rem;
  overflow-x: auto;
  display: grid;
  grid-template-areas: "main"
                        "footer";
  border-radius: 15px;
  font-size: 2.7vw;
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
}

.card1--content:hover {
  color: #052049;
  background-color: rgba(255, 255, 255, 0.25);
  
}

.link {
    color: lightgray;
    text-decoration: none;

}
.selected {
  /* border: solid #65abff thick; */
  background-color: rgba(255, 255, 255, 0.1);
  font-style: italic;
}

.hoveredNav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
}

button {
  height: 20px;
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
  border-radius: 15px; 
  padding: 1rem; 
  background-color:  rgb(50, 50, 50);
  color: lightgray;
  font-size: 1.8vw;

}

button:first-of-type {
  background-color:  #b242bc;
  color: lightgray;
}

li {
    align-self: flex-end;
    margin-bottom: 1rem;    
}
</style>


