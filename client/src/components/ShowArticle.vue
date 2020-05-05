<template lang="html">
  <div id="show-article">
    <article>
      <header>
      <h2>
        {{articleToShow.webTitle}}
      </h2>
    </header>
      <main v-html="articleToShow.fields.body">
      </main>
    </article>
  </div>
</template>

<script>
import { eventBus } from "../main";

export default {
  name: "show-article",
  props: ["articleToShow"],
  destroyed() {
    eventBus.$emit("toggle-show-article", null);
  }
};
</script>

<style lang="css" scoped>
article {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  font-size: 1.5em;
  margin: 2em;
  padding: 1em;
  text-align: justify;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 15px;
}

article >>> figure {
  /* border-left: 4px solid pink; */
  font-size: 1em;
  padding-left: 1em;
}
</style>
