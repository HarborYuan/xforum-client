import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Welcome from '@/components/Welcome';
import Signup from '@/components/Signup';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/Hello',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/',
      name: 'Welcome',
      component: Welcome,
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
    },
  ],
});
