import {abs, add, ceil, div, floor, max, min, mult, round, sub} from './math';

describe(`fp math`, () => {
  describe(`abs`, () => {
    it(`executes`, () => {
      expect(abs(2)).toBe(2);
      expect(abs(-2)).toBe(2);
    });
  });

  describe(`add`, () => {
    it(`executes`, () => expect(add(2)(1)).toBe(3));
  });

  describe(`ceil`, () => {
    it(`executes`, () => expect(ceil(1.5)).toBe(2));
  });

  describe(`div`, () => {
    it(`executes`, () => expect(div(4)(2)).toBe(2));
  });

  describe(`floor`, () => {
    it(`executes`, () => expect(floor(1.5)).toBe(1));
  });

  describe(`max`, () => {
    it(`executes`, () => expect(max([1, 3, 2])).toBe(3));
  });

  describe(`min`, () => {
    it(`executes`, () => expect(min([1, 3, 2])).toBe(1));
  });

  describe(`mult`, () => {
    it(`executes`, () => expect(mult(2)(3)).toBe(6));
  });

  describe(`round`, () => {
    it(`executes`, () => {
      expect(round(1.1)).toBe(1);
      expect(round(1.5)).toBe(2);
      expect(round(1.9)).toBe(2);
    });
  });

  describe(`sub`, () => {
    it(`executes`, () => expect(sub(2)(3)).toBe(-1));
  });
});
