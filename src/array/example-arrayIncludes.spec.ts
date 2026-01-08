import {arrayIncludes} from './util';

const hasZero = arrayIncludes(0);

describe(`example arrayIncludes`, () => {
  it(`checks`, () => {
    expect(hasZero([1, 2, 3])).toBe(false);
    expect(hasZero([0, 1, 2])).toBe(true);
  });
});
