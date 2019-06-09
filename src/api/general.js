import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

export default {
  debug: false,
  baseURL: '/',
};

export function convertTimeAgo(time) {
  TimeAgo.addLocale(en);
  const current = new TimeAgo('en-US');
  return current.format(Date.parse(time));
}
