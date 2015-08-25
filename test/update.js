import expect from 'expect';
import { update } from '../src';

const state = {
  index : 1,
  nested: {a: 1, b: 2},
  array : [2, 4, 6, 8]
};

describe('Update', () => {
  describe('one level', () => {
    it('should change', () => {
      const state2  = update(state, ['index'], value => value * 10);

      expect(state2).toEqual({
        index : 10,
        nested: {a: 1, b: 2},
        array : [2, 4, 6, 8]
      });
    });
  });

  describe('two levels', () => {
    it('should change', () => {
      const state2  = update(state, ['nested', 'b'], value => value * 10);

      expect(state2).toEqual({
        index : 1,
        nested: {a: 1, b: 20},
        array : [2, 4, 6, 8]
      });
    });
  });

  describe('array', () => {
    it('should change', () => {
      const state2  = update(state, ['array', 2], value => value * 10);

      expect(state2).toEqual({
        index : 1,
        nested: {a: 1, b: 2},
        array : [2, 4, 60, 8]
      });
    });
  });
});
