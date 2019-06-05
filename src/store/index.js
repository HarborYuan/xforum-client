import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

Vue.use(Vuex);

// eslint-disable-next-line import/prefer-default-export
export function createStore() {
  return new Vuex.Store({
    state: {
      debug: true,
      userInfo: {
        username: '',
        password: '',
        email: '',
        birthday: '',
        avatarURL: '',
      },
      boards: [{ name: 'Home', path: 'index' }],
      isLoggedIn: false,
      activeBoard: null,
      // posts: {/* [pid]: post */},
      list: {
        index: [/* pid */],
        edu: [],
        pe: [],
        tech: [],
      },
      commentList: {/* [pid]: comments */},
    },
    actions,
    mutations,
    getters,
  });
}
