import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import { useAuthStore } from '../stores/auth.store.ts'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue'),
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('../views/Create.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/post/:slug',
    name: 'post',
    component: () => import('../views/Post.vue'),
//     beforeEnter(to, from) {
//       const exists = sourceData.posts.find(
//         post => post.slug === to.params.slug
//       );
// 
//       if (!exists) {
//         return {
//           name: 'NotFound',
//           params: { pathMatch: to.path.substring(1).split('/') },
//           query: to.query,
//           hash: to.hash,
//         };
//       }
//     },
    props: true
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

router.beforeEach((to, from) => {
  const auth = useAuthStore();

  if (to.name === 'login' && !to.query.redirect) {
    return { name: 'login', query: { redirect: from.fullPath }};
  } else if (to.meta.requiresAuth && !auth.user) {
    return { name: 'login', query: { redirect: to.fullPath }};
  } else if (to.meta.requiresGuest && auth.user) {
    return { name: 'home'};
  }
})

export default router;
