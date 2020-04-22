<template lang="html">
  <div id="select-article-form">
    <h1 class="heading" v-if="sourceSelected === 'guardian' " >Guardian</h1>
    <h1 class="heading" v-if="sourceSelected === 'nyt' " >New York Times</h1>
    <input type="submit" name="button" value="Save selected Articles" :class="isClickable()" v-on:click="handleSubmit()" ></input>
   

    <div class="sections" v-for="section in sections" >
      <h2>{{ section }}</h2>
       <section-component v-if="articles" :section="section" :articles="articles" :sourceSelected="sourceSelected" :getTitle="getTitle" :articleToShow='articleToShow'/>
    </div>
  </div>
</template>

<script>
import { eventBus } from "../main";
import NewsService from "../services/NewsService";
import SectionComponent from "./SectionComponent.vue";

export default {
  name: "select-article-form",

  components: {
    "section-component": SectionComponent
  },
  data() {
    return {
      checkedArticles: [],
      cardOver: false
    };
  },

  props: ["articles", "sections", "title", "articleToShow", "getTitle"],
  created() {
    sections: {
      return this.sections;
    }
    title: {
      return this.title;
    }
  },
  mounted() {
    eventBus.$emit("toggle-select-article-form", this.$route.params.source);
  },
  computed: {
    sourceSelected() {
      return this.$route.params.source;
    },
    localArticles() {
        eventBus.$emit("toggle-select-article-form", this.$route.params.source);
        return this.articles;
    }
  },
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

.clickable {
  display: flex;
  font-size: 1.5em;
  align-self: center;
}
.inactive {
  display: none;
}


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
