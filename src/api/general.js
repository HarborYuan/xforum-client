import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

export default {
  baseURL: 'http://127.0.0.1:1024/',
  debug: true,
};

export function convertTimeAgo(time) {
  TimeAgo.addLocale(en);
  const current = new TimeAgo('en-US');
  return current.format(Date.parse(time));
}
