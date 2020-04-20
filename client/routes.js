import Vue from 'vue'
import VueRouter from 'vue-router'
import SourceSelect from "./src/components/SourceSelect.vue";
import SelectArticle from "./src/components/SelectArticleForm.vue";

Vue.use(VueRouter);
Vue.config.productionTip = false

export default new VueRouter({
    mode: 'history',
    base: '/',
    routes: [        
        {
            path: '/add-article/:source',
            name: 'select-article-form',
            component: SelectArticle
        },
        {
            path: '/add-article',
            name: 'add-article',
            component: SourceSelect
        }

    ]
})