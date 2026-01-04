import {
  str,
  strCompare,
  strCompareAlphanumeric,
  strIncludes,
  strLower,
  strLowerLocale,
  strSplit,
  strTrim,
  strUpper,
  strUpperLocale,
} from './util';

describe(`string-util`, () => {
  describe(`str`, () => {
    test(`transforms null to null`, () => expect(str(null)).toBeNull());
    test(`transforms undefined to null`, () => expect(str(null)).toBeNull());
    test(`transforms '' to self`, () => expect(str('')).toBe(''));
    test(`transforms string to self`, () => expect(str('hi')).toBe('hi'));
    test(`transforms 3 to string`, () => expect(str(3)).toBe('3'));
    test(`transforms true to string`, () => expect(str(true)).toBe('true'));
    test(`transforms {} to string`, () => expect(str({key: 'val'})).toBe('[object Object]'));
    test(`transforms [] to string`, () => expect(str([1, 2])).toBe('1,2'));
  });

  describe(`strCompare, strCompareAlphanumeric`, () => {
    test(`compares`, () => expect(strCompare('a11', 'a100')).toBe(1));
    test(`compares numeric`, () => expect(strCompareAlphanumeric('a11', 'a100')).toBe(-1));
  });

  describe(`strIncludes`, () => {
    test(`includes`, () => expect(strIncludes('the')('hi#there')).toBe(true));
    test(`includes not`, () => expect(strIncludes('nope')('hi#there')).toBe(false));
  });

  describe(`strLower, strLowerLocale`, () => {
    test(`strLower transforms`, () => expect(strLower('HELLO')).toBe('hello'));
    test(`strLowerLocale transforms`, () => expect(strLowerLocale('HELLO')).toBe('hello'));
  });

  describe(`strSplit`, () => {
    test(`splits`, () => expect(strSplit('#')('hi#there')).toStrictEqual(['hi', 'there']));
  });

  describe(`strTrim`, () => {
    test(`trims`, () => expect(strTrim(' hi there ')).toBe('hi there'));
  });

  describe(`strUpper, strUpperLocale`, () => {
    test(`strUpper transforms`, () => expect(strUpper('hello')).toBe('HELLO'));
    test(`strUpperLocale transforms`, () => expect(strUpperLocale('hello')).toBe('HELLO'));
  });
});
