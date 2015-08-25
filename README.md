# mutitmut

Mutate immutable data.

Well that doesn't really make sense.
What it really does is mutate data, cloning only objects that are mutated
and re-using all other objects.

It can be summed up like this.
* It does not clone objects that do not need to mutate.
* It clones and applies changes to objects that do need to mutate; the modified object and its ancestors.

## Why
The driver was [redux reducers](http://rackt.github.io/redux/docs/basics/Reducers.html).

Libraries like
[Immutable](https://github.com/facebook/immutable-js) or
[mori](http://swannodette.github.io/mori/)
provide an relatively easy means of managing immutable data,
but referencing such data in React component can be a little noisy.

Using mutitmut means that React components can be provided with
data that is easy to use. It is just regular JavaScript objects.
Yet it is still suitable for shallow equality testing in
_shouldComponentUpdate_ implementations.

## Examples
Set a value somewhere in a graph.
Specify path either as an array, or in dotted string.
```
  import {set} from 'mutimut';

  const state = {
    array : [1, 2, 4, 8],
    nested: {a: 1, b: 2}
  };

  const state2 = set(state, ['nested', 'b'], 20);
  // { array: [1, 2, 4, 8], nested: {a: 1, b: 20} }

  const state3 = set(state, 'nested.b', 30);
  // { array: [1, 2, 4, 8], nested: {a: 1, b: 30} }
```
Note that in the both cases new `state` and `nested` objects have been created.
However the `array` is not cloned; the original one is kept.

## API
### Set
```
  import {set} from 'mutimut';

  set(data, path, value) // => new data
```

#### Arguments
* `data` _(Object)_: The object graph to be modified.
* `path` _(Array|String)_: The path in `data` to the value to be modified.
* `value` _(any)_ : The value to be set in `data` at the specified `path`.

#### Returns
_(Object)_: The modified object graph.

### Update
```
  import {update} from 'mutimut';

  update(data, path, mutator) // => new data
```

#### Arguments
* `data` _(Object)_: The object graph to be modified.
* `path` _(Array|String)_: The path in `data` to the value to be modified.
* `mutator` _(Function)_ : A function that accepts the old value and returns the new one to set.

#### Returns
_(Object)_: The modified object graph.
