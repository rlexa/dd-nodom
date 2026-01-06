import {
  addLocalDays,
  addLocalHours,
  addLocalMinutes,
  addLocalMs,
  addLocalSeconds,
  addLocalWeeks,
  addUtcDays,
  addUtcMonths,
  addUtcWeeks,
  addUtcYears,
} from './mutate';
import {asDate} from './parse';

describe('date mutate', () => {
  describe(`addDays`, () => {
    it(`adds`, () => expect(addLocalDays(1)(asDate('2000-01-01'))).toStrictEqual(asDate('2000-01-02')));

    it(`subs`, () => expect(addLocalDays(-1)(asDate('2000-01-02'))).toStrictEqual(asDate('2000-01-01')));

    it(`adds UTC`, () => expect(addUtcDays(1)(asDate('2000-01-01T00:00:00.000Z'))).toStrictEqual(asDate('2000-01-02T00:00:00.000Z')));

    it(`subs UTC`, () => expect(addUtcDays(-1)(asDate('2000-01-02T00:00:00.000Z'))).toStrictEqual(asDate('2000-01-01T00:00:00.000Z')));
  });

  describe(`addHours`, () => {
    it(`adds`, () => expect(addLocalHours(1)(asDate('2000-01-01T00:00:00'))).toStrictEqual(asDate('2000-01-01T01:00:00')));
    it(`subs`, () => expect(addLocalHours(-1)(asDate('2000-01-01T01:00:00'))).toStrictEqual(asDate('2000-01-01T00:00:00')));
  });

  describe(`addMinutes`, () => {
    it(`adds`, () => expect(addLocalMinutes(1)(asDate('2000-01-01T00:00:00'))).toStrictEqual(asDate('2000-01-01T00:01:00')));
    it(`subs`, () => expect(addLocalMinutes(-1)(asDate('2000-01-01T00:01:00'))).toStrictEqual(asDate('2000-01-01T00:00:00')));
  });

  describe(`addMs`, () => {
    it(`adds`, () => expect(addLocalMs(1)(asDate('2000-01-01T00:00:00.000'))).toStrictEqual(asDate('2000-01-01T00:00:00.001')));
    it(`subs`, () => expect(addLocalMs(-1)(asDate('2000-01-01T00:00:00.001'))).toStrictEqual(asDate('2000-01-01T00:00:00.000')));
  });

  describe(`addSeconds`, () => {
    it(`adds`, () => expect(addLocalSeconds(1)(asDate('2000-01-01T00:00:00'))).toStrictEqual(asDate('2000-01-01T00:00:01')));
    it(`subs`, () => expect(addLocalSeconds(-1)(asDate('2000-01-01T00:00:01'))).toStrictEqual(asDate('2000-01-01T00:00:00')));
  });

  describe(`addWeeks`, () => {
    it(`adds`, () => expect(addLocalWeeks(1)(asDate('2000-01-01'))).toStrictEqual(asDate('2000-01-08')));

    it(`subs`, () => expect(addLocalWeeks(-1)(asDate('2000-01-08'))).toStrictEqual(asDate('2000-01-01')));

    it(`adds UTC`, () => expect(addUtcWeeks(1)(asDate('2000-01-01T00:00:00.000Z'))).toStrictEqual(asDate('2000-01-08T00:00:00.000Z')));

    it(`subs UTC`, () => expect(addUtcWeeks(-1)(asDate('2000-01-08T00:00:00.000Z'))).toStrictEqual(asDate('2000-01-01T00:00:00.000Z')));
  });

  describe(`addUtcMonths`, () => {
    it(`adds`, () => expect(addUtcMonths(1)(asDate('2000-01-01'))).toStrictEqual(asDate('2000-02-01')));
    it(`subs`, () => expect(addUtcMonths(-1)(asDate('2000-02-01'))).toStrictEqual(asDate('2000-01-01')));
  });

  describe(`addUtcYears`, () => {
    it(`adds`, () => expect(addUtcYears(1)(asDate('2000-01-01'))).toStrictEqual(asDate('2001-01-01')));
    it(`subs`, () => expect(addUtcYears(-1)(asDate('2001-01-01'))).toStrictEqual(asDate('2000-01-01')));
  });
});
