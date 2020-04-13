<template lang="html">
  <div id="select-article-form">

    <h1 class="heading" v-if="sourceSelected === 'guardian' " >Guardian</h1>
    <h1 class="heading" v-if="sourceSelected === 'nyt' " >New York Times</h1>
    <input type="submit" name="button" value="Save selected Articles" :class="isClickable()" v-on:click="handleSubmit()" ></input>
   

    <div class="sections" v-for="section in sections" >
      <h2>{{ section }}</h2>
       <card-component v-if="articles" :section="section" :articles="articles" :sourceSelected="sourceSelected" :title="title"/>
    </div>
  </div>
</template>

<script>
import { eventBus } from "../main";
import NewsService from "../services/NewsService";
import CardComponent from "./CardComponent.vue"

export default {
  name: "select-article-form",

  components: {
    "card-component": CardComponent
  },
  data() {
    return {
      checkedArticles: [],
      // localSections: this.sections,
      // localTitle: this.title,
      cardOver: false
    };
  },
  props: ["articles", "sections", "title", "sourceSelected"],

  methods: {

    isClickable() {
      if (this.checkedArticles.length > 0) {
        return "clickable";
      } else {
        return "inactive";
      }
    },

    cardMouseOver(index) {
      this.cardOver = index;
    },
    cardMouseLeave() {
      this.cardOver = false;
    }

  }
};
</script>

<style lang="css" scoped>
h1 {
  color: #b242bc;
}

h2 {
  color: #7a99ff;
  text-transform: capitalize;
}

body {
  width: 100%;
  height: 100%;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
}

#select-article-form {
  display: flex;
  flex-direction: column;
}

.heading {
  text-align: center;
  margin-bottom: 0;
}

#save_all_items {
  height: 70%;
}

/* .card {
   background-color: tr;
  min-width: 100%;
  min-height: 200px;
  overflow-x: auto;
  display: flex;
  border-radius: 15px;
} */

/* .card--content {
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
} */
/* 
h3 {
  padding: 0 5%;
  margin-bottom: 0;
  grid-column: 1/3;
} */

.clickable {
  display: flex;
  font-size: 1.5em;
  align-self: center;
}
.inactive {
  display: none;
}

/* .hoveredNav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-self: center;
  grid-column: 1/3;
  justify-items: stretch;
  align-items: center;
  align-self: stretch;
} */

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
/* button {
  height: 30%;

} */

.hoveredNav > button:hover {
  background-color: #b242bc;
  filter: hue-rotate(180);
}

.selected {
  border: solid #65abff thick;
  background-color: #cde1f9;
}

.sections {
  border-radius: 15px;
  margin: 0px 10% 0px 10%;
}
</style>
