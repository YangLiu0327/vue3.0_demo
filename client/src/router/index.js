import { createRouter, createWebHistory } from 'vue-router';
import IndexComponent from '../views/Index.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
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
    path: '/login',
    name: 'login',
    component: Login
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

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken ? true : false;
  if(to.path == '/login' || to.path == '/register') {
    next();
  } else {
    isLogin ? next(): next('/login');
  }
})

export default router;