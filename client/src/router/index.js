import { createRouter, createWebHistory } from 'vue-router';
import IndexComponent from '../views/Index.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import NotFound from '../views/404.vue';
import HomeComponent from '../views/Home.vue';
import InfoshowComponent from '../views/Infoshow.vue';
import FundListComponent from '../views/FundList.vue';

const routes = [
  {
    path: '/index',
    name: 'index',
    component: IndexComponent,
    children: [
    {
      path: '',
      component: {
        default: HomeComponent,
        main: HomeComponent
      },
      name: 'index-home'
    },
    {
      path: '/home',
      components: {
        default: HomeComponent,
        main: HomeComponent
      },
      name: 'index-home'
    },
    {
      path: '/infoshow',
      components: {
        default: InfoshowComponent,
        main: InfoshowComponent
      },
      name: 'index-infoshow'
    },
    {
      path: '/fundlist',
      components: {
        default: FundListComponent,
        main: FundListComponent
      },
      name: 'index-fundlist'
    }
    ]   
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