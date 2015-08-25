import expect from 'expect';
import { set } from '../src';

const state = {
  nested: {a: 1, b: 2}
};

describe('Set', () => {
  describe('two levels', () => {
    it('should change', () => {
      const state2  = set(state, ['nested', 'b'], 20);

      expect(state2).toEqual({
        nested: {a: 1, b: 20}
      });
    });
  });
});
