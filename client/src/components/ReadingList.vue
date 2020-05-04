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

      <section class="card-wrapper" v-if="filteredArticles"  v-for="article in filteredArticles">
        <card-component :article="article" :articleToShow='articleToShow' :getTitle="getTitle"/>


      </section>     
    </div>
  </div>
</template>

<script>
import NewsService from "../services/NewsService.js";
import { eventBus } from "../main";
import CardComponent from "./CardComponent.vue";


export default {
  name: "reading-list",
  props: ["filteredArticles", "allSections", "savedReadingListItems", "getSource", "articleToShow", "getTitle"],
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
      // },
      // filteredArticles: function() {
      //   this.filteredArticles
    }
  },
  computed: {
    areThereArticles: function() {
      return this.savedReadingListItems.length !== 0;
      // console.log(this.filteredArticles.length !== 0);
    }
  },
  methods: {
    handleDelete(item) {
      // NewsService.deleteArticle(item._id);
      eventBus.$emit("remove-article", item);
    },
    handleCategorySelection() {
      if (this.selectedSection !== "") {
        console.log(this.selectedSection);
        eventBus.$emit("category-filter-change", this.selectedSection);
      } else {
        eventBus.$emit("category-filter-change", "allSections");
      }
    },
    contentCardClass() {
      // if cardover = true --> class is hovered more things are shown
      // else
      if (this.cardover) {
        return "card--content selected";
      } else {
        return "card--content";
      }
    },
    cardMouseOver(index, item) {
      this.cardOverIndex = index;
    },
    cardMouseLeave() {
      this.cardOverIndex = false;
    },
    handleRead(item) {
      if (item.source === "guardian") {
        eventBus.$emit("toggle-show-article", item);
      } else {
        window.open(item.url);
      }
    },
    itemSource(item) {
      if (item.source === "guardian") {
        return "Guardian";
      } else {
        return "New York Times";
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

.card-wrapper {
  padding: 5px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.1);
  min-width: 13rem;
  max-width: 15rem; 
  margin: 10px;

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

form {
  display: flex;
  height: 2.3em;
}

select {
  height: 3em;
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

#reading-list {
  background-color: rgba(255, 255, 255, 0.04);
  padding: 0 5rem;
}
</style>
