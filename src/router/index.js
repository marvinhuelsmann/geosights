import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Play from '../views/Play.vue'


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/play',
        name: 'Play',
        component: Play
    },
]
const router = createRouter({
    history: createWebHistory(),
    hash: false,
    routes
})


export default router
