<template lang="">
  <div id="reading-list">
    <div class="reading-list">
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

      <section class="card" v-if="areThereArticles">
        <div
          @mouseover.self="cardMouseOver(index, item)"
          @mouseleave.self="cardMouseLeave()"
          :class="contentCardClass()"
          v-for="(item, index) in filteredArticles"
        >
        
          <header>
            <h5>{{ itemSource(item) }}</h5>
            <h4 :class="item.section">{{ item.section }}</h4>
          </header>
          <h3>{{ item.title }}</h3>
          <!-- <div class="hoveredNav" v-if="cardOverIndex === index"> -->

          <div class="hoveredNav" >
            <!-- <div class="hoveredNav" > -->
            <a v-on:click="handleDelete(item)"
              ><img class="cross" src="../assets/cross.png" />Remove</a
            >
            <a v-on:click="handleRead(item)"
              ><img class="cross" src="../assets/view.png" />
              Read</a
            >
          </div>

          <!-- <a :href="fetchArticleAPI"></a> -->
          <!-- <p>news and possibly an image. There will almost certainly be a headline here but mayebe not an image. A plus button will most likely be present and that will be just awesome. cqcn eqfqfv vdwfv fqsfcsq feqfq fqfqfwq fwqdfwqf fwqfwq fwqfqw fqwfq</p> -->
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import NewsService from "../services/NewsService.js";
import { eventBus } from "../main";

export default {
  name: "reading-list",
  props: ["filteredArticles", "allSections", "savedReadingListItems"],
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

/* body {
  background-color: #0a1018;
} */

h1 {
  color: #b242bc;
  text-align: center;
  /* border: 2px solid black; */
  border-radius: 15px;
  padding: 2px 5px 2px 5px;
  align-self: center;
  margin-left: 1em;
  margin-right: 1em;
}

h2 {
  color: aliceblue;
/* border: 2px solid black;
border-radius: 15px;
padding: 2px 5px 2px 5px; */
}

h3 {
  color: lightgray;
  font-weight: 100;
  font-size: 1.1rem;
  padding: 0 7%;
  margin-bottom: 0;
  margin-top: 0;
  grid-column: 1/3;
}

h4 {
  justify-self: self-start;
  font-size: 1.1em;
}

h5 {
  color: aliceblue;
  justify-self: self-end;
}

p {
  max-height: 90px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.reading-list {
  border: 5px 5px 5px 5px solid black;
  /* size: 100%; */
  display: flex;
  align-items: center;
  flex-direction: column;
}

.card {
  background-color: trasparent;
  /* border: 3px solid black; */
  border-radius: 15px;
  padding: 10px 2px 10px 2px;
  /* this seems to cause an issue. Commented out and delete when sure */
  /* min-height: 500px; */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 940px;
}

.card--content {
  border-radius: 25px;
  /* background-color: #0f1724; */
  background-color: rgba(255, 255, 255, 0.1);

  border: 1px solid black;
  min-width: 200px;
  max-width: 200px;
  margin: 5px;
  padding: 10px;
  min-height: 215px;
  max-height: 215px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 20% 50% 30%;
  grid-row-gap: 5%;
  justify-items: center;
}

.card--content:hover {
  background-color: rgba(255, 255, 255, 0.25);
}

.category-search {
  color: aliceblue;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
}

a {
  background-color: transparent;
  color: #b242bc;
  border: none;
  outline: none;
  cursor: pointer;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: 4rem;
  justify-items: center;
}

a:hover {
  background-color: #b242bca9;
  color: #052049;
}

.cross {
  box-sizing: border-box;
  min-height: 25px;
  max-height: 27px;
  opacity: 0.4;
  margin: 10%;
  color: aliceblue;
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

.hoveredNav {
  /* background-color: #b242bc; */
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column: 1/3;
  align-self: end;
  margin-bottom: 8%;
  grid-column-gap: 1rem;
}

header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  grid-column: 1/3;
  grid-row: 1;
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
