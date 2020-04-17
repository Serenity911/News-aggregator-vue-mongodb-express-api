import Vue from 'vue'
import VueRouter from 'vue-router'
import SelectArticleForm from ".components/SelectArticleForm.vue";

Vue.use(VueRouter);
Vue.config.productionTip = false

export default new VueRouter({
    model: 'history',
    base: '/',
    routes: [
        {
            path: '/add-article',
            name: 'add-article',
            component: SelectArticleForm
        }
    ]
})