<template lang="html">
  <div id="card" class="card1--content">
    <header v-if="this.$route.params.source !== 'nyt' && this.$route.params.source !== 'guardian'"> 
      <h3>{{article.source}}</h3>
      <h4 :class="article.section.toLowerCase()">{{ article.section.toLowerCase() }}</h4>
    </header>
    <p>{{ getTitle(article)}}</p>
    <footer class="hoveredNav">
      <button  :value="article" v-on:click="addToReadingList(article)" type="button" name="select" value="select"><router-link to="/reading-list/" class="link"> {{checkStatusOfArticle(article)}}</router-link></button>
      <button v-on:click="handleShowArticle(article)"><router-link to="/read-article/" class="link">Read</router-link></button>
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
        article.read = true;
        eventBus.$emit("toggle-reading-list", article);
      }
    },
    checkStatusOfArticle(article) {
      if (article.read === true) {
        return "Remove from list";
      } else {
        return "Add to list";
      }
    },
    handleShowArticle(article) {
      eventBus.$emit("toggle-show-article", article);
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
main {
  margin: 1rem 1rem 0 1rem;
}

#card > header {
  display: flex;
  align-items: center;
}

#card > header > h4 {
  justify-self: self-end;
}

#card > header > h3 {
  justify-self: self-start;
  font-size: 1.1em;
}

.card1--content {
  color: lightgray;
  margin: 0.5rem;
  padding: 5px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.1);
  min-width: 12rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-height: 30rem;
  min-height: 13rem;
  font-size: 2.3vh;
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
  justify-self: end;
}

button {
  height: 2rem;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 15px;
  background-color: rgb(50, 50, 50);
  color: lightgray;
  font-size: 0.8rem;
}

button:first-of-type {
  background-color: #b242bc;
  color: lightgray;
}

li {
  align-self: flex-end;
  margin-bottom: 1rem;
}

p {
  margin: 0.3em 0.3em 0.5rem 0.3rem;
  font-size: 2.6vh;
  height: 10rem;
  overflow: hidden;
}

.technology {
  color: rgb(23, 148, 28);
}

.business {
  color: rgb(26, 22, 208);
}

.food {
  color: rgb(238, 29, 29);
}

.travel {
  color: rgb(172, 158, 34);
}

.world {
  color: rgb(237, 129, 17);
}
</style>


