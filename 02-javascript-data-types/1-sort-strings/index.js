/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const newArr = [...arr];

  const sortCallback = (a, b) => {
    let first = a;
    let second = b;

    if (param !== 'asc') {
      first = b;
      second = a;
    }
    
    return first.localeCompare(second, 'ru', {caseFirst: 'upper'}); 
  };

  return newArr.sort(sortCallback);
}
