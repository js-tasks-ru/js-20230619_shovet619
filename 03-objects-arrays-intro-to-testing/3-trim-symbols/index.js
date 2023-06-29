/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */


export function trimSymbols(string, size = string.length) {
  let res = "";
  let count = 0;
  let currIndex = 0;
  let prev = string[currIndex];

  while (currIndex <= string.length - 1) {
    if (count < size && prev === string[currIndex]) {
      res += string[currIndex];
      count++;
      currIndex++;
    } else {
      while (prev === string[currIndex]) {
        currIndex++;
      }
      prev = string[currIndex];
      count = 0;
    }
  }
  return res;
}
