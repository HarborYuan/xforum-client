
// eslint-disable-next-line no-unused-vars
import Vue from 'vue';

export default {
  LOGIN: (state) => {
    // if (state.debug) console.log('Logging in');
    state.isLoggedIn = true;
  },
  LOGOUT: (state) => {
    // if (state.debug) console.log('Logging out');
    state.isLoggedIn = false;
  },
  CLEAR_BOARDS: (state) => {
    state.boards = [{ name: 'Home', path: 'index' }];
  },

  SET_BOARDS: (state, { boards }) => {
    state.boards = boards;
  },
  CLEAR_POSTS: (state) => {
    // state.posts = {};
    state.list = {
      index: [],
      edu: [],
      pe: [],
      tech: [],
    };
  },
  SET_POSTS: (state, { posts }) => {
    if (state.debug) console.log(posts);
    Vue.set(state.list, state.activeBoard, posts);
  },
  SET_POST: (state, { post, pid }) => {
    if (state.debug) console.log(post);
    if (post.response === null) {
      post.response = [];
    }
    Vue.set(state.posts, pid, post);
  },
  SET_BOARD: (state, { path }) => {
    state.activeBoard = path;
  },
  SET_USER_INFO(state, { userInfo }) {
    // if (state.debug) console.log('setUserAction triggered with ', newValue);
    state.userInfo = userInfo;
    state.userInfo.password = '';
  },
  CLEAR_USER_INFO(state) {
    // if (state.debug) console.log('clearUserAction triggered');
    state.userInfo = {
      username: '',
      password: '',
      email: '',
      birthday: '',
      avatarURL: '',
    };
    state.isLoggedIn = false;
  },
};
