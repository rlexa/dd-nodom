import {curry} from './common';

const extractObjectValue = <T>(object: T, key: keyof T) => object[key];
const extractor = curry(extractObjectValue);

const item = {name: 'Al', age: 30, surname: 'Alson'};

describe(`example curry`, () => {
  it(`handles`, () => {
    const getter = extractor(item);
    expect(getter('age')).toBe(30);
    expect(getter('name')).toBe('Al');
    expect(getter('surname')).toBe('Alson');
  });
});
