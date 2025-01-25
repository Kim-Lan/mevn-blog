import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import sourceData from '../data.json'

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
    beforeEnter(to, from) {
      const exists = sourceData.posts.find(
        post => post.id === parseInt(to.params.id)
      );

      if (!exists) {
        return {
          name: 'NotFound',
          params: { pathMatch: to.path.substring(1).split('/') },
          query: to.query,
          hash: to.hash,
        };
      }
    },
    props: route => ({ id: parseInt(route.params.id) })
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || { top: 0 };
  }
});

export default router;
