import Vue from 'vue'
// import Vue from 'vue/dist/vue.js';

import App from './App.vue'
import router from 'vue-router'


export const eventBus = new Vue();

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
// Vue.config.productionTip = false

// new Vue({ render: h => h(App),
//   VueRouter,
//   components: { App }
// }).$mount('#app')