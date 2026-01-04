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
    it(`transforms null to null`, () => expect(str(null)).toBeNull());
    it(`transforms undefined to null`, () => expect(str(null)).toBeNull());
    it(`transforms '' to self`, () => expect(str('')).toBe(''));
    it(`transforms string to self`, () => expect(str('hi')).toBe('hi'));
    it(`transforms 3 to string`, () => expect(str(3)).toBe('3'));
    it(`transforms true to string`, () => expect(str(true)).toBe('true'));
    it(`transforms {} to string`, () => expect(str({key: 'val'})).toBe('[object Object]'));
    it(`transforms [] to string`, () => expect(str([1, 2])).toBe('1,2'));
  });

  describe(`strCompare, strCompareAlphanumeric`, () => {
    it(`compares`, () => expect(strCompare('a11', 'a100')).toBe(1));
    it(`compares numeric`, () => expect(strCompareAlphanumeric('a11', 'a100')).toBe(-1));
  });

  describe(`strIncludes`, () => {
    it(`includes`, () => expect(strIncludes('the')('hi#there')).toBe(true));
    it(`includes not`, () => expect(strIncludes('nope')('hi#there')).toBe(false));
  });

  describe(`strLower, strLowerLocale`, () => {
    it(`strLower transforms`, () => expect(strLower('HELLO')).toBe('hello'));
    it(`strLowerLocale transforms`, () => expect(strLowerLocale('HELLO')).toBe('hello'));
  });

  describe(`strSplit`, () => {
    it(`splits`, () => expect(strSplit('#')('hi#there')).toStrictEqual(['hi', 'there']));
  });

  describe(`strTrim`, () => {
    it(`trims`, () => expect(strTrim(' hi there ')).toBe('hi there'));
  });

  describe(`strUpper, strUpperLocale`, () => {
    it(`strUpper transforms`, () => expect(strUpper('hello')).toBe('HELLO'));
    it(`strUpperLocale transforms`, () => expect(strUpperLocale('hello')).toBe('HELLO'));
  });
});
