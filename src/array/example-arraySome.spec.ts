import {arraySome} from './util';

const even = (value: number) => !(value % 2);
const hasEven = arraySome(even);

describe(`example arraySome`, () => {
  it(`transforms`, () => {
    expect(hasEven([1, 3, 5])).toBe(false);
    expect(hasEven([1, 3, 4])).toBe(true);
  });
});
