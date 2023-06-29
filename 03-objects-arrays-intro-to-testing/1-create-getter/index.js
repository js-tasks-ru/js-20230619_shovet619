/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const pathParts = path.split('.');
  let index = 0;

  const getter = (obj) => {
    if (!obj[pathParts[index]]) {
      return;
    }
    if (index === pathParts.length - 1) {
      return obj[pathParts[index]];
    }
    return getter(obj[pathParts[index++]]);
  };

  return getter;
}
