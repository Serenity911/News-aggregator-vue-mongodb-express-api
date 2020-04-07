<template lang="html">
  <div id="news-nav">
    <ul class="topnav">
      <li>
      <button
        type="button"
        name="button"
        v-on:click="handleRead"
        v-bind:class="{ active: readingListActive, 'nav-button': true }"
      >
      <img class="plus" src="../assets/book_icon.png" />READ
      </button>
      </li>
      <li>
      <button
        v-bind:class="{ active: sourceActive, 'nav-button': true }"
        type="button"
        name="button"
        v-on:click="handleAdd"
      >
        <img class="plus" src="../assets/plus.png" />ADD
      </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { eventBus } from "../main";
export default {
  name: "news-nav",
  data() {
    return {
      // search: "",
    };
  },

  props: [
    "readingListActive",
    "articleFormActive",
    "sourceActive",
    "showArticleActive"
  ],
  methods: {
    handleAdd() {
      eventBus.$emit("toggle-select-source");
    },
    handleRead() {
      eventBus.$emit("toggle-reading-list", []);
    }
  }
};
</script>

<style lang="css" scoped>
/* Add a black background color to the top navigation bar */
.topnav {
  background-color: rgba(255, 255, 255, 0.1);
  justify-self: center;
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  margin: 0 0 2rem 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: stretch;
  list-style: none;
}
.nav-button {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  color: #7a99ff;
  font-size: 60px;
  border: 1px solid black;
}
.nav-button:hover {
  background-color: rgba(255, 255, 255, 0.25);
}

.nav-button.active {
  color: #052049;
  background-color: #7a99ff;
}

img {
  margin-right: 5%;
}

/* .nav-button.active:hover {
  background-color: #b7c7fa;
} */
/* color: readingListActive || showArticleActive ? '052049' : black,
       */
/* Style the links inside the navigation bar */
/* .topnav a {
  float: left;
  display: block;
  color: black;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
} */

/* Style the "active" element to highlight the current page */
/* .topnav a.active {
  background-color: #2196F3;
  color: white;
} */

/* Style the search box inside the navigation bar */
/* .topnav input[type=text] {
  float: right;
  height: 70px;
  width: 350px;
  vertical-align: middle;
  border: none;
  margin-top: 12px;
  margin-bottom: 8px;
  margin-right: 16px;
  font-size: 40px;
} */

button {
  /* height: 80px; */
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  color: #838383;
}

/* #plus-button:hover {
  background-color: #63aac6;
} */

.plus {
  height: 60px;
  /* border-radius: 10px; */
  background-color: transparent;
}

/* #plus-button {
  font-size: 60px;
  border-radius: 15px;
  background-color: transparent;
  margin-top: 12px;
  margin-bottom: 8px;
  margin-right: 16px;
  margin-left: 20px;
  border: 1px solid black;
} */

/* .search {
  border-radius: 15px;
} */
</style>
