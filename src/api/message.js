import axios from 'axios';
import api from './general';

export function sendMsg(uid, content) {
  return axios.post(`${api.baseURL}api/sendmessage/`, JSON.stringify({ sendee: parseInt(uid, 10), content })).then((response) => {
    if (api.debug) console.log(response.data);
    if (response.data === 'M100') {
      return 'success';
    } else if (response.data === 'U200') {
      return 'NOT_LOG_IN';
    }
    return 'fail';
  }).catch((error) => {
    if (api.debug) console.log(error);
    return 'error';
  });
}

export function recMsgList() {
  return axios.get(`${api.baseURL}api/getmeslist/`).then((response) => {
    if (api.debug) console.log(response.data);
    if (response.data === 'U200') {
      return 'NOT_LOG_IN';
    } else if (response.data === 'G104') {
      return [];
    } else if (typeof response.data === 'string') {
      return 'fail';
    }
    return response.data;
  }).catch((error) => {
    if (api.debug) console.log(error);
    return 'error';
  });
}

export function recConversation(uid) {
  return axios.post(`${api.baseURL}api/getmessage/`, JSON.stringify({ sendee: parseInt(uid, 10) })).then((response) => {
    if (api.debug) console.log(response.data);
    if (response.data === 'U200') {
      return 'NOT_LOG_IN';
    } else if (typeof response.data === 'string') {
      return 'fail';
    }
    return response.data;
  }).catch((error) => {
    if (api.debug) console.log(error);
    return 'error';
  });
}
