import expect from 'expect';
import { update } from '../src';

const state = {
  index : 1,
  nested: {a: 1, b: 2},
  array : [2, 4, 6, 8],
  deep  : {d2: {d3: {d4: {d5: {value: 1}}}}}
};

describe('Update', () => {
  describe('one level', () => {
    it('should change', () => {
      const state2 = update(state, ['index'], value => value * 10);

      expect(state2).toEqual({
        index : 10,
        nested: {a: 1, b: 2},
        array : [2, 4, 6, 8],
        deep  : {d2: {d3: {d4: {d5: {value: 1}}}}}
      });
    });
  });

  describe('two levels', () => {
    it('should change', () => {
      const state2 = update(state, ['nested', 'b'], value => value * 10);

      expect(state2).toEqual({
        index : 1,
        nested: {a: 1, b: 20},
        array : [2, 4, 6, 8],
        deep  : {d2: {d3: {d4: {d5: {value: 1}}}}}
      });
    });
  });

  describe('array', () => {
    it('should change', () => {
      const state2 = update(state, ['array', 2], value => value * 10);

      expect(state2).toEqual({
        index : 1,
        nested: {a: 1, b: 2},
        array : [2, 4, 60, 8],
        deep  : {d2: {d3: {d4: {d5: {value: 1}}}}}
      });
    });
  });

  describe('object', () => {
    it('should mutate array', () => {
      const state2 = update(state, ['array'], array => {
        return [array.length, 1, 2, 3, 4, 5];
      });

      expect(state2).toEqual({
        index : 1,
        nested: {a: 1, b: 2},
        array : [4, 1, 2, 3, 4, 5],
        deep  : {d2: {d3: {d4: {d5: {value: 1}}}}}
      });

      expect(state2.array).toNotBe(state.array);
      expect(state2.deep.d2.d3.d4.d5).toBe(state.deep.d2.d3.d4.d5);
    });
  });

  describe('deep', () => {
    it('should only change mutated and ancestors', () => {
      const state2 = update(state, 'deep.d2.d3.d4.d5.value', value => value + 1);

      expect(state2).toEqual({
        index : 1,
        nested: {a: 1, b: 2},
        array : [2, 4, 6, 8],
        deep  : {d2: {d3: {d4: {d5: {value: 2}}}}}
      });

      expect(state2.nested).toBe(state.nested);
      expect(state2.array).toBe(state.array);

      expect(state2.deep).toNotBe(state.deep);
      expect(state2.deep.d2.d3.d4.d5).toNotBe(state.deep.d2.d3.d4.d5);
    });
  });
});
