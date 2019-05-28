
const store = {
  debug: true,
  baseURL: 'http://127.0.0.1:1024/',
  userInfo: {
    username: '',
    password: '',
    email: '',
    birthday: '',
    avatarURL: '',
  },
  isLoggedIn: false,
  setUserAction(newValue) {
    if (this.debug) console.log('setUserAction triggered with ', newValue);
    this.userInfo = newValue;
    this.userInfo.password = '';
  },
  clearUserAction() {
    if (this.debug) console.log('clearUserAction triggered');
    this.userInfo = {
      username: '',
      password: '',
      email: '',
      birthday: '',
      avatarURL: '',
    };
  },
  login() {
    if (this.debug) console.log('Logging in');
    this.isLoggedIn = true;
  },
  logout() {
    if (this.debug) console.log('Logging out');
    this.isLoggedIn = false;
  },
};

export default store;
