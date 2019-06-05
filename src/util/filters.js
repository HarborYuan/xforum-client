
function pluralize(time, label) {
  if (time === 1) {
    return time + label;
  }
  return `${time + label}s`;
}


// eslint-disable-next-line import/prefer-default-export
export function timeAgo(time) {
  // eslint-disable-next-line no-mixed-operators
  const between = Date.now() / 1000 - Number(time);
  if (between < 3600) {
    // eslint-disable-next-line no-bitwise
    return pluralize(~~(between / 60), ' minute');
  } else if (between < 86400) {
    // eslint-disable-next-line no-bitwise
    return pluralize(~~(between / 3600), ' hour');
  }
  // eslint-disable-next-line no-bitwise
  return pluralize(~~(between / 86400), ' day');
}


