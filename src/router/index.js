import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Welcome from '@/components/Welcome';
import Signup from '@/components/Signup';
import Signin from '@/components/Signin';
import Forget from '@/components/Forget';
import InfoPage from '@/components/InfoPage';
import Home from '@/components/Home';


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
    {
      path: '/signin',
      name: 'Signin',
      component: Signin,
    },
    {
      path: '/forget',
      name: 'forget',
      component: Forget,
    },
    {
      path: '/info',
      name: 'Personal Information',
      component: InfoPage,
    },
    {
      path: '/home',
      name: 'XForum',
      component: Home,
    },
  ],
});
