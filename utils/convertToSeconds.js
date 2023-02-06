const secondsPerUnit = {
  s: 1,
  m: 60,
  h: 3600,
  d: 86400,
  w: 604800,
};

/**
 * Converts a time to seconds if given like:
 * - 2d 3m 5s
 * - 5d
 * - 7m
 * - ...
 *
 * @param {string} s - Tine string to convert to seconds
 * @returns {number}
 */
const convertToSeconds = (s) => s.split(' ')
  .map((i) => i.slice(0, -1) * secondsPerUnit[i.slice(-1).toLowerCase()])
  .reduce((a, c) => a + c, 0);

module.exports = convertToSeconds;
