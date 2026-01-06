import {asDate, asDateNonNull, dateCopy, isValidDate} from './parse';

describe('date parse', () => {
  describe(`asDate`, () => {
    it(`transforms null to null`, () => expect(asDate(null)).toBeNull());

    it(`transforms date to self`, () => {
      const date = new Date(123);
      expect(asDate(date)).toBe(date);
    });

    it(`transforms 123 to date`, () => expect(asDate(123)).toStrictEqual(new Date(123)));

    it(`transforms '2000-01-01T12:00:00Z' as is`, () =>
      expect(asDate('2000-01-01T12:00:00Z')).toStrictEqual(new Date('2000-01-01T12:00:00Z')));

    it(`transforms '2000-01-01' to date assumed as local timezone`, () => {
      const date = new Date('2000-01-01');
      expect(asDate('2000-01-01')).toStrictEqual(new Date(date.getTime() + date.getTimezoneOffset() * 60_000));
    });
  });

  describe(`asDateNonNull`, () => {
    it(`throws on invalid`, () => expect(() => asDateNonNull(null as any)).toThrow());
  });

  describe(`dateCopy`, () => {
    it(`transforms date to copy`, () => expect(dateCopy(new Date(1))).toStrictEqual(new Date(1)));
  });

  describe(`isValidDate`, () => {
    it(`validates date`, () => expect(isValidDate(new Date(Date.now()))).toBe(true));
    it(`invalidates date`, () => expect(isValidDate(new Date('nope'))).toBe(false));
    it(`invalidates non-date`, () => expect(isValidDate(true)).toBe(false));
    it(`invalidates undefined`, () => expect(isValidDate(undefined)).toBe(false));
    it(`invalidates null`, () => expect(isValidDate(null)).toBe(false));
  });
});
