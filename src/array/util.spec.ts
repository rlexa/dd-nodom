import {
  arrayConcat,
  arrayEach,
  arrayEvery,
  arrayExtractDistinctValuesOfKey,
  arrayFilter,
  arrayFilterNotEmpty,
  arrayFind,
  arrayFlat,
  arrayIncludes,
  arrayJoin,
  arrayMap,
  arrayReduce,
  arrayRemove,
  arraySome,
  arraySort,
  arraySortByKey,
  arrayUnique,
} from './util';

describe(`array-util`, () => {
  describe(`arrayConcat`, () => {
    test(`concats`, () => expect(arrayConcat([1, 2])([3, 4])).toStrictEqual([1, 2, 3, 4]));
  });

  describe(`arrayEach`, () => {
    test(`maps`, () => {
      let result = '';
      arrayEach((ii: string, index, all) => (result += `#${ii} - ${index} - ${all.length}`))(['a', 'b']);
      expect(result).toBe('#a - 0 - 2#b - 1 - 2');
    });
  });

  describe(`arrayEvery`, () => {
    test(`everys when all true`, () => expect(arrayEvery((ii) => ii === 'a' || ii === 'b')(['a', 'b'])).toBe(true));
    test(`everys when some true`, () => expect(arrayEvery((ii) => ii === 'a')(['a', 'b'])).toBe(false));
    test(`everys when all false`, () => expect(arrayEvery((ii) => ii === 'x')(['a', 'b'])).toBe(false));
    test(`returns false on empty`, () => expect(arrayEvery((ii) => ii === 'x')([])).toBe(false));
  });

  describe(`arrayExtractDistinctValuesOfKey`, () => {
    interface Test {
      key: number;
    }

    test(`filters`, () =>
      expect(arrayExtractDistinctValuesOfKey<Test, 'key'>('key')([{key: 1}, {key: 2}, {key: 1}])).toStrictEqual([1, 2]));
  });

  describe(`arrayFind`, () => {
    test(`finds`, () => expect(arrayFind<number>((ii) => ii > 2)([1, 2, 3, 4])).toBe(3));
  });

  describe(`arrayFlat`, () => {
    test(`flattens with depth`, () => expect(arrayFlat([[1], [2]])).toStrictEqual([1, 2]));
  });

  describe(`arrayFilter`, () => {
    test(`filters`, () => expect(arrayFilter<number>((ii) => ii < 3)([1, 2, 3, 4])).toStrictEqual([1, 2]));
  });

  describe(`arrayFilterNotEmpty`, () => {
    test(`filters`, () => expect(arrayFilterNotEmpty([1, undefined, 2, null, 3, ''])).toStrictEqual([1, 2, 3]));
  });

  describe(`arrayIncludes`, () => {
    test(`includes`, () => expect(arrayIncludes('#')(['a', 'b', '#'])).toBe(true));
    test(`includes not`, () => expect(arrayIncludes('#')(['a', 'b'])).toBe(false));
  });

  describe(`arrayJoin`, () => {
    test(`joins`, () => expect(arrayJoin('#')(['a', 'b'])).toBe('a#b'));
  });

  describe(`arrayMap`, () => {
    test(`maps`, () =>
      expect(arrayMap((ii: string, index, all) => `${ii} - ${index} - ${all.length}`)(['a', 'b'])).toStrictEqual([
        'a - 0 - 2',
        'b - 1 - 2',
      ]));
  });

  describe(`arrayReduce`, () => {
    test(`reduces`, () =>
      expect(arrayReduce(() => ':')((acc, ii: string, index, all) => acc + `#${ii} - ${index} - ${all.length}`)(['a', 'b'])).toBe(
        ':#a - 0 - 2#b - 1 - 2',
      ));

    test(`reduces into a not-reused object`, () => {
      const partial = arrayReduce(() => ({}));
      const result1 = partial<string>((acc, ii, index) => Object.assign(acc, {[ii]: index}))(['a', 'b']);
      const result2 = partial<string>((acc, ii, index) => Object.assign(acc, {[ii]: index + 2}))(['c', 'd']);
      expect(result1).toStrictEqual({a: 0, b: 1});
      expect(result2).toStrictEqual({c: 2, d: 3});
      expect(result1).not.toBe(result2);
    });
  });

  describe(`arrayRemove`, () => {
    test(`removes`, () => expect(arrayRemove(2)([1, 2, 3])).toStrictEqual([1, 3]));

    test(`ignores if doesn't exist`, () => {
      const arr = [1, 2, 3];
      expect(arrayRemove(4)(arr)).toBe(arr);
    });
  });

  describe(`arraySome`, () => {
    test(`somes when all true`, () => expect(arraySome((ii) => ii === 'a' || ii === 'b')(['a', 'b'])).toBe(true));
    test(`somes when some true`, () => expect(arraySome((ii) => ii === 'a')(['a', 'b'])).toBe(true));
    test(`somes when all false`, () => expect(arraySome((ii) => ii === 'x')(['a', 'b'])).toBe(false));
    test(`returns false on empty`, () => expect(arraySome((ii) => ii === 'x')([])).toBe(false));
  });

  describe(`arraySort`, () => {
    test(`sorts with fn`, () => expect(arraySort((aa: string, bb: string) => aa.localeCompare(bb))(['b', 'a'])).toStrictEqual(['a', 'b']));
    test(`sorts with auto-fn`, () => expect(arraySort()([2, 1])).toStrictEqual([1, 2]));
  });

  describe(`arraySortByKey`, () => {
    test('transforms null', () => expect(arraySortByKey(null, 'meh')).toBeNull());
    test('transforms undefined', () => expect(arraySortByKey(undefined, 'meh')).toBeUndefined());

    test('transforms list with labels', () =>
      expect(arraySortByKey([{key: 'b'}, {key: 'a'}], 'key')).toStrictEqual([{key: 'a'}, {key: 'b'}]));

    test('transforms list with numbers', () => expect(arraySortByKey([{key: 10}, {key: 1}], 'key')).toStrictEqual([{key: 1}, {key: 10}]));

    test('transforms list with multiple', () =>
      expect(
        arraySortByKey(
          [
            {first: 'b', last: 'c'},
            {first: 'a', last: 'b'},
            {first: 'a', last: 'a'},
          ],
          'first',
          'last',
        ),
      ).toStrictEqual([
        {first: 'a', last: 'a'},
        {first: 'a', last: 'b'},
        {first: 'b', last: 'c'},
      ]));
  });

  describe(`arrayUnique`, () => {
    test(`uniques`, () => expect(arrayUnique([1, 2, 1, 3, 2])).toStrictEqual([1, 2, 3]));
  });
});
