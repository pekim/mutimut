function update(object, path, mutator) {
  if (!path || path.length === undefined) {
    throw new Error('expected path to be a non-empty array');
  }

  if (typeof path === 'string') {
    path = path.split('.');
  }

  const key = path[0];
  const newObject = Array.isArray(object)
    ? object.slice(0)
    : Object.assign({}, object)
  ;

  if (path.length === 0) {
    return object;
  } else if (path.length === 1) {
    newObject[key] = mutator(object[key]);

    return newObject;
  } else {
    newObject[key] = update(object[key], path.slice(1), mutator);

    return newObject;
  }
}

function set(object, path, value) {
  return update(object, path, () => value);
}

export {
  set,
  update
};
