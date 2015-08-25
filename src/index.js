function update(object, path, mutator) {
  if (!path || path.length === undefined) {
    throw new Error(`expected path (${path}) to be a string or an array`);
  }

  if (typeof path === 'string') {
    path = path.split('.');
  }

  const key = path[0];

  if (path.length === 0) {
    return object;
  } else if (path.length === 1) {
    const value = mutator(object[key]);
    return cloneAndUpdate(object, key, value);
  } else {
    const value = update(object[key], path.slice(1), mutator);
    return cloneAndUpdate(object, key, value);
  }
}

function cloneAndUpdate(object, key, value) {
  const newObject = Array.isArray(object)
    ? object.slice(0)
    : Object.assign({}, object)
  ;

  newObject[key] = value;

  return newObject;
}

function set(object, path, value) {
  return update(object, path, () => value);
}

export {
  set,
  update
};
