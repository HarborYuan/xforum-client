// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
// import { sync } from 'vue-router-sync';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import App from './App';
import router from './router';
import { createStore } from './store/index';

Vue.use(BootstrapVue);
Vue.config.productionTip = false;
const store = createStore();
// sync(store, router);

/* eslint-disable no-new */
// eslint-disable-next-line no-unused-vars
const nv = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
