import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Play from '../views/Play.vue'

import DashboardHome from '../views/dashboard/Home.vue'

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
    {
        path: '/dashboard/home',
        name: 'Dashboard Home',
        component: DashboardHome
    },
]
const router = createRouter({
    history: createWebHistory(),
    hash: false,
    routes
})


export default router
