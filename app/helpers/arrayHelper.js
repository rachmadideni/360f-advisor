export function filterByValue(array, string) {
  return array.filter(o =>
    Object.keys(o).some(k => o[k].toLowerCase().includes(string.toLowerCase())),
  );
}

export function filterByKey(array, string) {
  /* const raw = _.map(array, (item) => item[string] === string ? item[string] : null);
  const output = _.without(raw, null) */

  return array.filter(item => (item[string] === string ? item[string] : null));
  // return output
}
