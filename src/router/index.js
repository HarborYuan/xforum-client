import Vue from 'vue';
import Router from 'vue-router';
import Welcome from '../view/Welcome';
import Success from '../view/Success';


Vue.use(Router);

export default new Router({
  routes: [

    {
      path: '/',
      name: 'Welcome',
      component: Welcome,
    },
    {
      path: '/success/',
      name: 'Congratulations',
      component: Success,
    },

  ],
});
