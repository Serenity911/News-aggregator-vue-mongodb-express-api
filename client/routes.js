import Vue from 'vue'
import VueRouter from 'vue-router'
import SourceSelect from "./src/components/SourceSelect.vue";
import SelectArticle from "./src/components/SelectArticleForm.vue";
import ReadingList from "./src/components/ReadingList.vue";
import ShowArticle from "./src/components/ShowArticle.vue";

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
            path: '/select-source',
            name: 'select-source',
            component: SourceSelect
        },
        {
            path: '/reading-list',
            name: 'reading-list',
            component: ReadingList
        },
        {
            path: '/read-article/',
            name: 'show-article',
            component: ShowArticle
        }
    ]
})