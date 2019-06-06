import axios from 'axios';
import api from './general';

export function updateBoard() {
  return axios.get(`${api.baseURL}api/getboards/`).then(
    (response) => {
      // eslint-disable-next-line no-console
      if (api.debug) console.log(response);
      if (response.data === 'U200') {
        return 'fail';
      }
      return response.data.board;
    },
  ).catch((error) => {
    if (api.debug) console.log(error);
    return 'error';
  });
}

export function updatePosts(type) {
  return axios.post(`${api.baseURL}api/getposts/`, JSON.stringify({ path: type })).then(
    (response) => {
      if (api.debug) console.log(response);
      if (response.data === 'U200') {
        return 'fail';
      } else if (response.data === 'G104') {
        return 'empty';
      }
      return response.data.posts;
    },
  ).catch((error) => {
    if (api.debug) console.log(error);
    return 'error';
  });
}

export function getComments(pid) {
  return axios.post(`${api.baseURL}api/getresponse/`, `{"pid":${pid}}`).then(
    (response) => {
      if (api.debug) console.log(response);
      if (response.data === 'U200') {
        return 'fail';
      }
      return response.data;
    },
  ).catch((error) => {
    if (api.debug) console.log(error);
    return 'error';
  });
}
