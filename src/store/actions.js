import { updateBoard, updatePosts, getComments } from '../api/post';


export default {
  FETCH_BOARD_DATA: ({ commit }) => updateBoard().then((response) => {
    if ((response === 'fail') || (response === 'error')) {
      commit('CLEAR_BOARDS');
      return 'refuse';
    }
    commit('SET_BOARDS', { boards: response });
    return 'success';
  }),
  FETCH_POST_DATA: ({ state, commit }, { type }) => {
    commit('SET_BOARD', { path: type });
    return updatePosts(type).then((response) => {
      if (state.debug) console.log(response);
      if (response === 'fail') {
        commit('CLEAR_POSTS');
        return 'refuse';
      } else if (response === 'error') {
        commit('CLEAR_POSTS');
        return 'network error';
      } else if (response === 'empty') {
        commit('CLEAR_POSTS');
        return 'empty';
      }
      response.reverse();
      commit('SET_POSTS', { posts: response });
      return 'success';
    });
  },
  FETCH_COMMENT_DATA: ({ state, commit }, { pid }) => getComments(pid).then((response) => {
    if (state.debug) console.log(response);
    if (response === 'fail') {
      return 'refuse';
    } else if (response === 'error') {
      return 'network error';
    }
    commit('SET_POST', { post: response, pid });
    return 'success';
  }),
};
