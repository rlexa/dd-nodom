import {
  dateEndOfUtcDay,
  dateEndOfUtcHalfYear,
  dateEndOfUtcHour,
  dateEndOfUtcMinute,
  dateEndOfUtcMonth,
  dateEndOfUtcQuarter,
  dateEndOfUtcSecond,
  dateEndOfUtcWorkWeek,
  dateEndOfUtcYear,
  dateStartOfUtcDay,
  dateStartOfUtcHalfYear,
  dateStartOfUtcHour,
  dateStartOfUtcMinute,
  dateStartOfUtcMonth,
  dateStartOfUtcQuarter,
  dateStartOfUtcSecond,
  dateStartOfUtcWeek,
  dateStartOfUtcWorkWeek,
  dateStartOfUtcYear,
} from './date';

describe(`date`, () => {
  describe(`dateEndOfUtc...`, () => {
    it(`transforms with dateEndOfUtcSecond`, () =>
      expect(dateEndOfUtcSecond(new Date(`2000-01-01T00:00:00.123Z`))).toStrictEqual(new Date(`2000-01-01T00:00:00.999Z`)));

    it(`transforms with dateEndOfUtcMinute`, () =>
      expect(dateEndOfUtcMinute(new Date(`2000-01-01T00:00:12.123Z`))).toStrictEqual(new Date(`2000-01-01T00:00:59.999Z`)));

    it(`transforms with dateEndOfUtcHour`, () =>
      expect(dateEndOfUtcHour(new Date(`2000-01-01T00:12:12.123Z`))).toStrictEqual(new Date(`2000-01-01T00:59:59.999Z`)));

    it(`transforms with dateEndOfUtcDay`, () =>
      expect(dateEndOfUtcDay(new Date(`2000-01-01T12:12:12.123Z`))).toStrictEqual(new Date(`2000-01-01T23:59:59.999Z`)));

    it(`transforms with dateEndOfUtcWorkWeek`, () => {
      // fyi 2022-01-24 is monday
      expect(dateEndOfUtcWorkWeek(new Date(`2022-01-24T12:12:12.123Z`))).toStrictEqual(new Date(`2022-01-30T23:59:59.999Z`));
      expect(dateEndOfUtcWorkWeek(new Date(`2022-01-25T12:12:12.123Z`))).toStrictEqual(new Date(`2022-01-30T23:59:59.999Z`));
      expect(dateEndOfUtcWorkWeek(new Date(`2022-01-26T12:12:12.123Z`))).toStrictEqual(new Date(`2022-01-30T23:59:59.999Z`));
      expect(dateEndOfUtcWorkWeek(new Date(`2022-01-27T12:12:12.123Z`))).toStrictEqual(new Date(`2022-01-30T23:59:59.999Z`));
      expect(dateEndOfUtcWorkWeek(new Date(`2022-01-28T12:12:12.123Z`))).toStrictEqual(new Date(`2022-01-30T23:59:59.999Z`));
      expect(dateEndOfUtcWorkWeek(new Date(`2022-01-29T12:12:12.123Z`))).toStrictEqual(new Date(`2022-01-30T23:59:59.999Z`));
      expect(dateEndOfUtcWorkWeek(new Date(`2022-01-30T12:12:12.123Z`))).toStrictEqual(new Date(`2022-01-30T23:59:59.999Z`));
      expect(dateEndOfUtcWorkWeek(new Date(`2022-01-31T12:12:12.123Z`))).toStrictEqual(new Date(`2022-02-06T23:59:59.999Z`));
    });

    it(`transforms with dateEndOfUtcMonth`, () => {
      expect(dateEndOfUtcMonth(new Date(`2000-01-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-01-31T23:59:59.999Z`));
      expect(dateEndOfUtcMonth(new Date(`2000-02-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-02-29T23:59:59.999Z`));
      expect(dateEndOfUtcMonth(new Date(`2000-03-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-03-31T23:59:59.999Z`));
      expect(dateEndOfUtcMonth(new Date(`2000-04-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-04-30T23:59:59.999Z`));
      expect(dateEndOfUtcMonth(new Date(`2000-05-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-05-31T23:59:59.999Z`));
      expect(dateEndOfUtcMonth(new Date(`2000-06-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-06-30T23:59:59.999Z`));
      expect(dateEndOfUtcMonth(new Date(`2000-07-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-07-31T23:59:59.999Z`));
      expect(dateEndOfUtcMonth(new Date(`2000-08-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-08-31T23:59:59.999Z`));
      expect(dateEndOfUtcMonth(new Date(`2000-09-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-09-30T23:59:59.999Z`));
      expect(dateEndOfUtcMonth(new Date(`2000-10-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-10-31T23:59:59.999Z`));
      expect(dateEndOfUtcMonth(new Date(`2000-11-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-11-30T23:59:59.999Z`));
      expect(dateEndOfUtcMonth(new Date(`2000-12-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-12-31T23:59:59.999Z`));
    });

    it(`transforms with dateEndOfUtcHalfYear`, () => {
      expect(dateEndOfUtcHalfYear(new Date(`2000-03-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-06-30T23:59:59.999Z`));
      expect(dateEndOfUtcHalfYear(new Date(`2000-09-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-12-31T23:59:59.999Z`));
    });

    it(`transforms with dateEndOfUtcQuarter`, () => {
      expect(dateEndOfUtcQuarter(new Date(`2000-02-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-03-31T23:59:59.999Z`));
      expect(dateEndOfUtcQuarter(new Date(`2000-05-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-06-30T23:59:59.999Z`));
      expect(dateEndOfUtcQuarter(new Date(`2000-08-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-09-30T23:59:59.999Z`));
      expect(dateEndOfUtcQuarter(new Date(`2000-11-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-12-31T23:59:59.999Z`));
    });

    it(`transforms with dateEndOfUtcYear`, () =>
      expect(dateEndOfUtcYear(new Date(`2000-11-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-12-31T23:59:59.999Z`)));
  });

  describe(`dateStartOfUtc...`, () => {
    it(`transforms with dateStartOfUtcSecond`, () =>
      expect(dateStartOfUtcSecond(new Date(`2000-01-01T00:00:00.123Z`))).toStrictEqual(new Date(`2000-01-01T00:00:00.000Z`)));

    it(`transforms with dateStartOfUtcMinute`, () =>
      expect(dateStartOfUtcMinute(new Date(`2000-01-01T00:00:12.123Z`))).toStrictEqual(new Date(`2000-01-01T00:00:00.000Z`)));

    it(`transforms with dateStartOfUtcHour`, () =>
      expect(dateStartOfUtcHour(new Date(`2000-01-01T00:12:12.123Z`))).toStrictEqual(new Date(`2000-01-01T00:00:00.000Z`)));

    it(`transforms with dateStartOfUtcDay`, () =>
      expect(dateStartOfUtcDay(new Date(`2000-01-01T12:12:12.123Z`))).toStrictEqual(new Date(`2000-01-01T00:00:00.000Z`)));

    it(`transforms with dateStartOfUtcWeek`, () => {
      // fyi 2022-01-23 is sunday
      const result = new Date(`2022-01-23T00:00:00.000Z`);
      const resultPlusWeek = new Date(`2022-01-30T00:00:00.000Z`);

      expect(dateStartOfUtcWeek(new Date(`2022-01-23T12:12:12.123Z`))).toStrictEqual(result);
      expect(dateStartOfUtcWeek(new Date(`2022-01-24T12:12:12.123Z`))).toStrictEqual(result);
      expect(dateStartOfUtcWeek(new Date(`2022-01-25T12:12:12.123Z`))).toStrictEqual(result);
      expect(dateStartOfUtcWeek(new Date(`2022-01-26T12:12:12.123Z`))).toStrictEqual(result);
      expect(dateStartOfUtcWeek(new Date(`2022-01-27T12:12:12.123Z`))).toStrictEqual(result);
      expect(dateStartOfUtcWeek(new Date(`2022-01-28T12:12:12.123Z`))).toStrictEqual(result);
      expect(dateStartOfUtcWeek(new Date(`2022-01-29T12:12:12.123Z`))).toStrictEqual(result);
      expect(dateStartOfUtcWeek(new Date(`2022-01-30T12:12:12.123Z`))).toStrictEqual(resultPlusWeek);
    });

    it(`transforms with dateStartOfUtcWorkWeek`, () => {
      // fyi 2022-01-24 is monday
      const result = new Date(`2022-01-24T00:00:00.000Z`);
      const resultPlusWeek = new Date(`2022-01-31T00:00:00.000Z`);

      expect(dateStartOfUtcWorkWeek(new Date(`2022-01-24T12:12:12.123Z`))).toStrictEqual(result);
      expect(dateStartOfUtcWorkWeek(new Date(`2022-01-25T12:12:12.123Z`))).toStrictEqual(result);
      expect(dateStartOfUtcWorkWeek(new Date(`2022-01-26T12:12:12.123Z`))).toStrictEqual(result);
      expect(dateStartOfUtcWorkWeek(new Date(`2022-01-27T12:12:12.123Z`))).toStrictEqual(result);
      expect(dateStartOfUtcWorkWeek(new Date(`2022-01-28T12:12:12.123Z`))).toStrictEqual(result);
      expect(dateStartOfUtcWorkWeek(new Date(`2022-01-29T12:12:12.123Z`))).toStrictEqual(result);
      expect(dateStartOfUtcWorkWeek(new Date(`2022-01-30T12:12:12.123Z`))).toStrictEqual(result);
      expect(dateStartOfUtcWorkWeek(new Date(`2022-01-31T12:12:12.123Z`))).toStrictEqual(resultPlusWeek);
    });

    it(`transforms with dateStartOfUtcMonth`, () =>
      expect(dateStartOfUtcMonth(new Date(`2000-01-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-01-01T00:00:00.000Z`)));

    it(`transforms with dateStartOfUtcQuarter`, () => {
      expect(dateStartOfUtcQuarter(new Date(`2000-02-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-01-01T00:00:00.000Z`));
      expect(dateStartOfUtcQuarter(new Date(`2000-05-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-04-01T00:00:00.000Z`));
      expect(dateStartOfUtcQuarter(new Date(`2000-08-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-07-01T00:00:00.000Z`));
      expect(dateStartOfUtcQuarter(new Date(`2000-11-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-10-01T00:00:00.000Z`));
    });

    it(`transforms with dateStartOfUtcHalfYear`, () => {
      expect(dateStartOfUtcHalfYear(new Date(`2000-03-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-01-01T00:00:00.000Z`));
      expect(dateStartOfUtcHalfYear(new Date(`2000-09-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-07-01T00:00:00.000Z`));
    });

    it(`transforms with dateStartOfUtcYear`, () =>
      expect(dateStartOfUtcYear(new Date(`2000-12-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-01-01T00:00:00.000Z`)));
  });
});
