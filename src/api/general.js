import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

export default {
  convertTimeAgo(time) {
    TimeAgo.addLocale(en);
    const current = new TimeAgo('en-US');
    return current.format(Date.parse(time));
  },
};
