import {isNullUndefined, jsonCopy, jsonDiff, jsonEqual, notNullUndefined} from './util';

describe('util', () => {
  it('isNullUndefined', () => {
    expect(isNullUndefined(null)).toBe(true);
    expect(isNullUndefined(undefined)).toBe(true);
    expect(isNullUndefined('')).toBe(false);
  });

  it('jsonCopy', () => {
    expect(jsonCopy(12)).toBe(12);
    expect(jsonCopy(true)).toBe(true);
    expect(jsonCopy('hi')).toBe('hi');
    expect(jsonCopy([1, 'a', true])).toStrictEqual([1, 'a', true]);
    expect(jsonCopy({a: 12})).toStrictEqual({a: 12});
  });

  it('jsonDiff', () => {
    expect(jsonDiff({a: 12}, {a: 12})).toStrictEqual({});
    expect(jsonDiff({a: 12}, {a: 13})).toStrictEqual({a: {oldValue: 12, newValue: 13}});
  });

  it('jsonEqual', () => {
    expect(jsonEqual(12, 12)).toBe(true);
    expect(jsonEqual(true, true)).toBe(true);
    expect(jsonEqual('hi', 'hi')).toBe(true);
    expect(jsonEqual([1, 'a', true], [1, 'a', true])).toBe(true);
    expect(jsonEqual({a: 12}, {a: 12})).toBe(true);
  });

  it('notNullUndefined', () => {
    expect(notNullUndefined(null)).toBe(false);
    expect(notNullUndefined(undefined)).toBe(false);
    expect(notNullUndefined('')).toBe(true);
  });
});
