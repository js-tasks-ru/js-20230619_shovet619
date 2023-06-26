/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */

const sortCallback = (a, b) => a.localeCompare(b, 'ru', {caseFirst: 'upper'}); 

  
export function sortStrings(arr, param = 'asc') {
  const newArr = [...arr];

  return newArr.sort((a, b) => param === 'asc' ? sortCallback(a, b) : sortCallback(b, a));
}
