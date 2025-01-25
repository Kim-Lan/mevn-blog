import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../components/NotFound.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/post/:id/:slug',
    name: 'post',
    component: () => import('../views/Post.vue'),
    props: route => ({ id: parseInt(route.params.id) })
  },
  {
    path: '/:catchAll(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
