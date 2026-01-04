import {add, mult} from './math';

describe(`fp math`, () => {
  describe(`add`, () => {
    it(`executes`, () => expect(add(2)(1)).toBe(3));
  });

  describe(`mult`, () => {
    it(`executes`, () => expect(mult(2)(3)).toBe(6));
  });
});
