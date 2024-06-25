import { createRouter, createWebHistory } from 'vue-router';
import IndexComponent from '../views/Index.vue';
import Register from '../views/Register.vue';
import NotFound from '../views/404.vue';

const routes = [
  {
    path: '/index',
    name: 'index',
    component: IndexComponent
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;