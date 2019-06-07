import Vue from 'vue';
import Router from 'vue-router';
import Welcome from '../view/Welcome';
import Success from '../view/Success';
import Signin from '../view/Signin';
import Test from '../view/Test';
import PostList from '../view/PostList';
import Forget from '../view/Forget';
import PostView from '../view/PostView';
import InfoPage from '../view/InfoPage';


// eslint-disable-next-line no-unused-vars
const createPostView = id => () => import('../view/CreatePostView').then(m => m.default(id));


Vue.use(Router);

export default new Router({
  mode: 'history',
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
    {
      path: '/signin/',
      name: 'Log In',
      component: Signin,
    },
    {
      path: '/test/',
      name: 'Test',
      component: Test,
    },
    {
      path: '/forget/',
      component: Forget,
    },
    {
      path: '/posts/:board/',
      // name: `${this.$store.state.boards.filter(this.path = this.$route.params.board).name}`,
      component: PostList,
    },
    {
      path: '/post/:pid/',
      component: PostView,
    },
    {
      path: '/user/:uid/',
      component: InfoPage,
    },
  ],
});
