import {arrayReduce} from './util';

const findMax = arrayReduce(() => 0)<number>((acc, ii) => Math.max(acc, ii));

describe(`example arrayReduce`, () => {
  it(`finds max`, () => expect(findMax([1, 4, 3, 2])).toBe(4));
});
