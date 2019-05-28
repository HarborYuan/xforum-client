import axios from 'axios';
import store from '../store/store';

export default {
  updateBoard() {
    axios.get(`${store.baseURL}api/getboards/`).then(
      (response) => {
        // eslint-disable-next-line no-console
        if (store.debug) console.log(response);
        if (response.data === 'U200') {
          return 'fail';
        }
        return response.data.board;
      },
    ).catch((error) => {
      if (store.debug) console.log(error);
      return 'error';
    });
  },
  updatePosts(board) {
    axios.post(`${store.baseURL}api/getposts/`, JSON.stringify(board)).then(
      (response) => {
        if (store.debug) console.log(response);
        if (response.data === 'U200') {
          return 'fail';
        } else if (response.data === 'G104') {
          return [{ content: 'Unfortunately, there is nothing here.' }];
        }
        return response.data.posts;
      },
    ).catch((error) => {
      if (store.debug) console.log(error);
      return 'error';
    });
  },
  getComments(post) {
    axios.post(`${store.baseURL}api/getresponse/`, JSON.stringify(post)).then(
      (response) => {
        if (store.debug) console.log(response);
        if (response.data === 'U200') {
          return 'fail';
        }
        return response.data.response;
      },
    ).catch((error) => {
      if (store.debug) console.log(error);
      return 'error';
    });
  },
};
