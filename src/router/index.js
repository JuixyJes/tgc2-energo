import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' 

Vue.use(Vuesax)
Vue.use(VueRouter)
Vue.use(Vuetify)

const routes = [
    {
        path: '/',
        name: 'Create',
        component: () => import('../views/Home.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
const opts = {}

export default router


