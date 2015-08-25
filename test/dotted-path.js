import expect from 'expect';
import { set } from '../src';

const state = {
  nested: {a: 1, b: 2},
  array : [2, 4, 6, 8]
};

describe('Nested path', () => {
  describe('to object', () => {
    it('should change', () => {
      const state2  = set(state, 'nested.b', 20);

      expect(state2).toEqual({
        nested: {a: 1, b: 20},
        array : [2, 4, 6, 8]
      });
    });
  });
});

describe('Nested path', () => {
  describe('to array', () => {
    it('should change', () => {
      const state2  = set(state, 'array.2', 60);

      expect(state2).toEqual({
        nested: {a: 1, b: 2},
        array : [2, 4, 60, 8]
      });
    });
  });
});
