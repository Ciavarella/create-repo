const renameKey = (obj, oldKey, newKey) => {
  Object.defineProperty(obj, newKey,
    Object.getOwnPropertyDescriptor(obj, oldKey))
  delete obj[oldKey]

  const seperator = obj[newKey].search("=");
  let value = obj[newKey].slice(seperator + 1);

  Object.defineProperty(obj, newKey, {
    value: value,
  })

  return obj
}

module.exports = { renameKey }