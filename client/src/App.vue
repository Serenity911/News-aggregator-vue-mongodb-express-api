<template lang="html">
  <div id="id">
    <link
      href="https://fonts.googleapis.com/css?family=IM+Fell+English"
      rel="stylesheet"
    />


    <web-parent />
  </div>
</template>

<script>
import WebParent from "./components/WebParent.vue";

export default {
  name: "app",
  components: {
    "web-parent": WebParent,
     }
};
</script>

<style lang="css">
body {
  background-color: #121212;
  margin: 0;
  padding: 0;
}

#nav {
  color: white;
}

</style>


