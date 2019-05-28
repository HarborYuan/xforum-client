import axios from 'axios';
import store from '../store/store';

export default {
  signup(form) {
    axios.post(`${store.baseURL}api/signup/`, JSON.stringify(form))
    // eslint-disable-next-line consistent-return
      .then((response) => {
        if (store.debug) console.log(response);
        if (response.data === 'U100') {
          return 'success';
        }
        return 'fail';
      })
      .catch((error) => {
        if (store.debug) console.log(error);
        return 'error';
      });
  },
  login(form) {
    axios.post(`${store.baseURL}api/login/`, JSON.stringify(form))
    // eslint-disable-next-line consistent-return
      .then((response) => {
        if (store.debug) console.log(response);
        if (response.data === 'C100-1') {
          return 'success';
        }
        return 'fail';
      })
      .catch((error) => {
        if (store.debug) console.log(error);
        return 'error';
      });
  },
  checkState() {
    axios.post(`${store.baseURL}api/getposts/`, '{"path":"index"}').then(
      (response) => {
        if (store.debug) console.log(response);
        if (response.data !== 'U200') {
          store.login();
          return true;
        }
        store.logout();
        return false;
      },
    ).catch(
      (error) => {
        if (store.debug) console.log(error);
        return 'error';
      });
  },
  logout() {
    axios.get(`${store.baseURL}api/logout`).then(
      (response) => {
        if (store.debug) console.log(response);
        if (response.data === 'U100') {
          store.logout();
          return 'success';
        }
        return 'fail';
      },
    ).catch((error) => {
      if (store.debug) console.log(error);
      return 'error';
    });
  },

};

