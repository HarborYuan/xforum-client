import Vue from 'vue';
import Router from 'vue-router';
import Welcome from '../view/Welcome';
import Success from '../view/Success';
import Signin from '../view/Signin';
import Test from '../view/Test';
import PostList from '../view/PostList';


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
      path: '/posts/:board',
      // name: `${this.$store.state.boards.filter(this.path = this.$route.params.board).name}`,
      component: PostList,
    },
  ],
});
