import {jsonCopy} from './util';

describe('util', () => {
  test('jsonCopy', () => {
    expect(jsonCopy(12)).toBe(12);
    expect(jsonCopy(true)).toBe(true);
    expect(jsonCopy('hi')).toBe('hi');
    expect(jsonCopy([1, 'a', true])).toStrictEqual([1, 'a', true]);
    expect(jsonCopy({a: 12})).toStrictEqual({a: 12});
  });
});
