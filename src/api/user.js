import axios from 'axios';
import api from './general';


export function login(form) {
  return axios.post(`${api.baseURL}api/login/`, JSON.stringify(form))
  // eslint-disable-next-line consistent-return
    .then((response) => {
      if (response.data === 'C100-1') {
        return 'success';
      }
      return 'fail';
    })
    .catch(() => 'error');
}
export function checkState() {
  return axios.post(`${api.baseURL}api/getposts/`, '{"path":"index"}').then(
    (response) => {
      if (response.data !== 'U200') {
        return true;
      }
      return false;
    },
  ).catch(
    () => 'error');
}
export function logout() {
  return axios.get(`${api.baseURL}api/logout`).then(
    (response) => {
      if (response.data === 'U100') {
        return 'success';
      }
      return 'fail';
    },
  ).catch(() => 'error');
}

export function getUserInfo(uid) {
  return axios.post(`${api.baseURL}api/getuserdetailinfo/`, JSON.stringify({ uid })).then((response) => {
    if (response.data === 'G104') {
      return 'USER_NOT_FOUND';
    } else if (typeof response.data === 'string') {
      return 'fail';
    }
    return response.data;
  }).catch((error) => {
    if (api.debug) console.log(error);
    return 'error';
  });
}
