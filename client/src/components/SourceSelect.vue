<template lang="html">
  <div id="source-select">
    <h1>Select News Source</h1>
    <br />
    <ul>
      <li><router-link to="/add-article/guardian">Guardian</router-link></li>
      <li><router-link to="/add-article/nyt">New York Times</router-link></li>
    <router-view :getTitle='getTitle' ></router-view>
    </ul>
  </div>
</template>

<script>
import { eventBus } from "../main";
export default {
  name: "source-select"
};
</script>

<style lang="css" scoped>
h1 {
  color: #b242bc;
  font-size: 50px;
  text-align: center;
}

li {
  background-color: rgba(255, 255, 255, 0.1);
  color: lightgray;

  font-size: 50px;
  text-align: center;
  font-family: "IM Fell English", serif;
  list-style: none;
  cursor: pointer;
  border: 8px solid black;
  border-radius: 15px;
  width: 40rem;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
}

li:hover {
  background-color: rgba(255, 255, 255, 0.25);
}

ul {
  margin-left: auto;
  margin-right: auto;
}
</style>
