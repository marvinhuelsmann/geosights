import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Edit from '../views/Edit'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: Edit
  }
]
const router = createRouter({
  history: createWebHistory(),
  hash: false,
  routes
})


export default router
