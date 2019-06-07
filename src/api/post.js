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

export function sendComment(pid, content) {
  return axios.post(`${api.baseURL}api/addresponse/`, JSON.stringify({ pid: parseInt(pid, 10), content })).then((response) => {
    if (api.debug) console.log(response);
    if (response.data === 'R100') {
      return 'success';
    }
    return 'fail';
  }).catch((error) => {
    if (api.debug) console.log(error);
    return 'error';
  });
}

export function sendPost(content, path) {
  return axios.post(`${api.baseURL}api/addposts/`, JSON.stringify({ content, path })).then((response) => {
    if (api.debug) console.log(response);
    if (response.data === 'B100') {
      return 'success';
    }
    return 'fail';
  }).catch((error) => {
    if (api.debug) console.log(error);
    return 'error';
  });
}
