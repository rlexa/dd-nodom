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
  dateMoveToEndOfUtcDay,
  dateMoveToEndOfUtcHalfYear,
  dateMoveToEndOfUtcHour,
  dateMoveToEndOfUtcMinute,
  dateMoveToEndOfUtcMonth,
  dateMoveToEndOfUtcQuarter,
  dateMoveToEndOfUtcSecond,
  dateMoveToEndOfUtcWorkWeek,
  dateMoveToEndOfUtcYear,
  dateMoveToStartOfUtcDay,
  dateMoveToStartOfUtcHalfYear,
  dateMoveToStartOfUtcHour,
  dateMoveToStartOfUtcMinute,
  dateMoveToStartOfUtcMonth,
  dateMoveToStartOfUtcQuarter,
  dateMoveToStartOfUtcSecond,
  dateMoveToStartOfUtcWeek,
  dateMoveToStartOfUtcWorkWeek,
  dateMoveToStartOfUtcYear,
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

  describe(`dateMoveToEndOfUtc...`, () => {
    it(`transforms with dateMoveToEndOfUtcSecond`, () =>
      expect(dateMoveToEndOfUtcSecond(new Date(`2000-01-01T00:00:00.123Z`))).toStrictEqual(new Date(`2000-01-01T00:00:00.999Z`)));

    it(`transforms with dateMoveToEndOfUtcMinute`, () =>
      expect(dateMoveToEndOfUtcMinute(new Date(`2000-01-01T00:00:12.123Z`))).toStrictEqual(new Date(`2000-01-01T00:00:59.999Z`)));

    it(`transforms with dateMoveToEndOfUtcHour`, () =>
      expect(dateMoveToEndOfUtcHour(new Date(`2000-01-01T00:12:12.123Z`))).toStrictEqual(new Date(`2000-01-01T00:59:59.999Z`)));

    it(`transforms with dateMoveToEndOfUtcDay`, () =>
      expect(dateMoveToEndOfUtcDay(new Date(`2000-01-01T12:12:12.123Z`))).toStrictEqual(new Date(`2000-01-01T23:59:59.999Z`)));

    it(`transforms with dateMoveToEndOfUtcWorkWeek`, () => {
      // fyi 2022-01-24 is monday
      expect(dateMoveToEndOfUtcWorkWeek(new Date(`2022-01-24T12:12:12.123Z`))).toStrictEqual(new Date(`2022-01-30T23:59:59.999Z`));
      expect(dateMoveToEndOfUtcWorkWeek(new Date(`2022-01-25T12:12:12.123Z`))).toStrictEqual(new Date(`2022-01-30T23:59:59.999Z`));
      expect(dateMoveToEndOfUtcWorkWeek(new Date(`2022-01-26T12:12:12.123Z`))).toStrictEqual(new Date(`2022-01-30T23:59:59.999Z`));
      expect(dateMoveToEndOfUtcWorkWeek(new Date(`2022-01-27T12:12:12.123Z`))).toStrictEqual(new Date(`2022-01-30T23:59:59.999Z`));
      expect(dateMoveToEndOfUtcWorkWeek(new Date(`2022-01-28T12:12:12.123Z`))).toStrictEqual(new Date(`2022-01-30T23:59:59.999Z`));
      expect(dateMoveToEndOfUtcWorkWeek(new Date(`2022-01-29T12:12:12.123Z`))).toStrictEqual(new Date(`2022-01-30T23:59:59.999Z`));
      expect(dateMoveToEndOfUtcWorkWeek(new Date(`2022-01-30T12:12:12.123Z`))).toStrictEqual(new Date(`2022-01-30T23:59:59.999Z`));
      expect(dateMoveToEndOfUtcWorkWeek(new Date(`2022-01-31T12:12:12.123Z`))).toStrictEqual(new Date(`2022-02-06T23:59:59.999Z`));
    });

    it(`transforms with dateMoveToEndOfUtcMonth`, () => {
      expect(dateMoveToEndOfUtcMonth(new Date(`2000-01-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-01-31T23:59:59.999Z`));
      expect(dateMoveToEndOfUtcMonth(new Date(`2000-02-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-02-29T23:59:59.999Z`));
      expect(dateMoveToEndOfUtcMonth(new Date(`2000-03-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-03-31T23:59:59.999Z`));
      expect(dateMoveToEndOfUtcMonth(new Date(`2000-04-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-04-30T23:59:59.999Z`));
      expect(dateMoveToEndOfUtcMonth(new Date(`2000-05-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-05-31T23:59:59.999Z`));
      expect(dateMoveToEndOfUtcMonth(new Date(`2000-06-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-06-30T23:59:59.999Z`));
      expect(dateMoveToEndOfUtcMonth(new Date(`2000-07-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-07-31T23:59:59.999Z`));
      expect(dateMoveToEndOfUtcMonth(new Date(`2000-08-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-08-31T23:59:59.999Z`));
      expect(dateMoveToEndOfUtcMonth(new Date(`2000-09-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-09-30T23:59:59.999Z`));
      expect(dateMoveToEndOfUtcMonth(new Date(`2000-10-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-10-31T23:59:59.999Z`));
      expect(dateMoveToEndOfUtcMonth(new Date(`2000-11-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-11-30T23:59:59.999Z`));
      expect(dateMoveToEndOfUtcMonth(new Date(`2000-12-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-12-31T23:59:59.999Z`));
    });

    it(`transforms with dateMoveToEndOfUtcHalfYear`, () => {
      expect(dateMoveToEndOfUtcHalfYear(new Date(`2000-03-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-06-30T23:59:59.999Z`));
      expect(dateMoveToEndOfUtcHalfYear(new Date(`2000-09-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-12-31T23:59:59.999Z`));
    });

    it(`transforms with dateMoveToEndOfUtcQuarter`, () => {
      expect(dateMoveToEndOfUtcQuarter(new Date(`2000-02-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-03-31T23:59:59.999Z`));
      expect(dateMoveToEndOfUtcQuarter(new Date(`2000-05-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-06-30T23:59:59.999Z`));
      expect(dateMoveToEndOfUtcQuarter(new Date(`2000-08-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-09-30T23:59:59.999Z`));
      expect(dateMoveToEndOfUtcQuarter(new Date(`2000-11-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-12-31T23:59:59.999Z`));
    });

    it(`transforms with dateMoveToEndOfUtcYear`, () =>
      expect(dateMoveToEndOfUtcYear(new Date(`2000-11-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-12-31T23:59:59.999Z`)));
  });

  describe(`dateMoveToStartOfUtc...`, () => {
    it(`transforms with dateMoveToStartOfUtcSecond`, () =>
      expect(dateMoveToStartOfUtcSecond(new Date(`2000-01-01T00:00:00.123Z`))).toStrictEqual(new Date(`2000-01-01T00:00:00.000Z`)));

    it(`transforms with dateMoveToStartOfUtcMinute`, () =>
      expect(dateMoveToStartOfUtcMinute(new Date(`2000-01-01T00:00:12.123Z`))).toStrictEqual(new Date(`2000-01-01T00:00:00.000Z`)));

    it(`transforms with dateMoveToStartOfUtcHour`, () =>
      expect(dateMoveToStartOfUtcHour(new Date(`2000-01-01T00:12:12.123Z`))).toStrictEqual(new Date(`2000-01-01T00:00:00.000Z`)));

    it(`transforms with dateMoveToStartOfUtcDay`, () =>
      expect(dateMoveToStartOfUtcDay(new Date(`2000-01-01T12:12:12.123Z`))).toStrictEqual(new Date(`2000-01-01T00:00:00.000Z`)));

    it(`transforms with dateMoveToStartOfUtcWeek`, () => {
      // fyi 2022-01-23 is sunday
      const result = new Date(`2022-01-23T00:00:00.000Z`);
      const resultPlusWeek = new Date(`2022-01-30T00:00:00.000Z`);

      expect(dateMoveToStartOfUtcWeek(new Date(`2022-01-23T12:12:12.123Z`))).toStrictEqual(result);
      expect(dateMoveToStartOfUtcWeek(new Date(`2022-01-24T12:12:12.123Z`))).toStrictEqual(result);
      expect(dateMoveToStartOfUtcWeek(new Date(`2022-01-25T12:12:12.123Z`))).toStrictEqual(result);
      expect(dateMoveToStartOfUtcWeek(new Date(`2022-01-26T12:12:12.123Z`))).toStrictEqual(result);
      expect(dateMoveToStartOfUtcWeek(new Date(`2022-01-27T12:12:12.123Z`))).toStrictEqual(result);
      expect(dateMoveToStartOfUtcWeek(new Date(`2022-01-28T12:12:12.123Z`))).toStrictEqual(result);
      expect(dateMoveToStartOfUtcWeek(new Date(`2022-01-29T12:12:12.123Z`))).toStrictEqual(result);
      expect(dateMoveToStartOfUtcWeek(new Date(`2022-01-30T12:12:12.123Z`))).toStrictEqual(resultPlusWeek);
    });

    it(`transforms with dateMoveToStartOfUtcWorkWeek`, () => {
      // fyi 2022-01-24 is monday
      const result = new Date(`2022-01-24T00:00:00.000Z`);
      const resultPlusWeek = new Date(`2022-01-31T00:00:00.000Z`);

      expect(dateMoveToStartOfUtcWorkWeek(new Date(`2022-01-24T12:12:12.123Z`))).toStrictEqual(result);
      expect(dateMoveToStartOfUtcWorkWeek(new Date(`2022-01-25T12:12:12.123Z`))).toStrictEqual(result);
      expect(dateMoveToStartOfUtcWorkWeek(new Date(`2022-01-26T12:12:12.123Z`))).toStrictEqual(result);
      expect(dateMoveToStartOfUtcWorkWeek(new Date(`2022-01-27T12:12:12.123Z`))).toStrictEqual(result);
      expect(dateMoveToStartOfUtcWorkWeek(new Date(`2022-01-28T12:12:12.123Z`))).toStrictEqual(result);
      expect(dateMoveToStartOfUtcWorkWeek(new Date(`2022-01-29T12:12:12.123Z`))).toStrictEqual(result);
      expect(dateMoveToStartOfUtcWorkWeek(new Date(`2022-01-30T12:12:12.123Z`))).toStrictEqual(result);
      expect(dateMoveToStartOfUtcWorkWeek(new Date(`2022-01-31T12:12:12.123Z`))).toStrictEqual(resultPlusWeek);
    });

    it(`transforms with dateMoveToStartOfUtcMonth`, () =>
      expect(dateMoveToStartOfUtcMonth(new Date(`2000-01-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-01-01T00:00:00.000Z`)));

    it(`transforms with dateMoveToStartOfUtcQuarter`, () => {
      expect(dateMoveToStartOfUtcQuarter(new Date(`2000-02-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-01-01T00:00:00.000Z`));
      expect(dateMoveToStartOfUtcQuarter(new Date(`2000-05-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-04-01T00:00:00.000Z`));
      expect(dateMoveToStartOfUtcQuarter(new Date(`2000-08-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-07-01T00:00:00.000Z`));
      expect(dateMoveToStartOfUtcQuarter(new Date(`2000-11-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-10-01T00:00:00.000Z`));
    });

    it(`transforms with dateMoveToStartOfUtcHalfYear`, () => {
      expect(dateMoveToStartOfUtcHalfYear(new Date(`2000-03-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-01-01T00:00:00.000Z`));
      expect(dateMoveToStartOfUtcHalfYear(new Date(`2000-09-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-07-01T00:00:00.000Z`));
    });

    it(`transforms with dateMoveToStartOfUtcYear`, () =>
      expect(dateMoveToStartOfUtcYear(new Date(`2000-12-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-01-01T00:00:00.000Z`)));
  });
});
