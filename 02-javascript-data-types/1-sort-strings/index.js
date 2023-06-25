/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */

const sortCallback = (a, b, param) => {
  const [first, second] = param === 'asc' ? [a, b] : [b, a];
    
  return first.localeCompare(second, 'ru', {caseFirst: 'upper'}); 
};
  
export function sortStrings(arr, param = 'asc') {
  const newArr = [...arr];

  return newArr.sort((a, b) => sortCallback(a, b, param));
}
