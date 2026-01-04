import {msDay, msHour, msMinute, msSecond, msWeek, Weekday} from './const';
import {
  addDays,
  addHours,
  addMinutes,
  addMs,
  addSeconds,
  addUtcDays,
  addUtcMonths,
  addUtcWeeks,
  addUtcYears,
  addWeeks,
  asDate,
  asIsoDatePart,
  asIsoString,
  asLocalDatePart,
  asTimeValue,
  asUtcHhMmPart,
  dateCopy,
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
  dateToLocalIsoWeekday,
  dateToUtcIsoWeekday,
  isLocalIsoWeekWorkDay,
  isoToHhMmPart,
  isUtcWeekWorkDay,
  isValidDate,
} from './date';

describe(`date`, () => {
  it(`has main ms values`, () => {
    expect(msSecond).toBe(1000);
    expect(msMinute).toBe(1000 * 60);
    expect(msHour).toBe(1000 * 60 * 60);
    expect(msDay).toBe(1000 * 60 * 60 * 24);
    expect(msWeek).toBe(1000 * 60 * 60 * 24 * 7);
  });

  describe(`addDays`, () => {
    it(`adds`, () => expect(addDays(1)(asDate('2000-01-01'))).toStrictEqual(asDate('2000-01-02')));

    it(`subs`, () => expect(addDays(-1)(asDate('2000-01-02'))).toStrictEqual(asDate('2000-01-01')));

    it(`adds UTC`, () => expect(addUtcDays(1)(asDate('2000-01-01T00:00:00.000Z'))).toStrictEqual(asDate('2000-01-02T00:00:00.000Z')));

    it(`subs UTC`, () => expect(addUtcDays(-1)(asDate('2000-01-02T00:00:00.000Z'))).toStrictEqual(asDate('2000-01-01T00:00:00.000Z')));
  });

  describe(`addHours`, () => {
    it(`adds`, () => expect(addHours(1)(asDate('2000-01-01T00:00:00'))).toStrictEqual(asDate('2000-01-01T01:00:00')));
    it(`subs`, () => expect(addHours(-1)(asDate('2000-01-01T01:00:00'))).toStrictEqual(asDate('2000-01-01T00:00:00')));
  });

  describe(`addMinutes`, () => {
    it(`adds`, () => expect(addMinutes(1)(asDate('2000-01-01T00:00:00'))).toStrictEqual(asDate('2000-01-01T00:01:00')));
    it(`subs`, () => expect(addMinutes(-1)(asDate('2000-01-01T00:01:00'))).toStrictEqual(asDate('2000-01-01T00:00:00')));
  });

  describe(`addMs`, () => {
    it(`adds`, () => expect(addMs(1)(asDate('2000-01-01T00:00:00.000'))).toStrictEqual(asDate('2000-01-01T00:00:00.001')));
    it(`subs`, () => expect(addMs(-1)(asDate('2000-01-01T00:00:00.001'))).toStrictEqual(asDate('2000-01-01T00:00:00.000')));
  });

  describe(`addSeconds`, () => {
    it(`adds`, () => expect(addSeconds(1)(asDate('2000-01-01T00:00:00'))).toStrictEqual(asDate('2000-01-01T00:00:01')));
    it(`subs`, () => expect(addSeconds(-1)(asDate('2000-01-01T00:00:01'))).toStrictEqual(asDate('2000-01-01T00:00:00')));
  });

  describe(`addWeeks`, () => {
    it(`adds`, () => expect(addWeeks(1)(asDate('2000-01-01'))).toStrictEqual(asDate('2000-01-08')));

    it(`subs`, () => expect(addWeeks(-1)(asDate('2000-01-08'))).toStrictEqual(asDate('2000-01-01')));

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

  describe(`asIsoDate`, () => {
    it(`transforms e.g. ms to iso`, () => expect(asIsoString(1234)).toBe('1970-01-01T00:00:01.234Z'));
  });

  describe(`asIsoDatePart`, () => {
    it(`transforms e.g. ms to date part`, () => expect(asIsoDatePart(1234)).toBe('1970-01-01'));
  });

  describe(`asLocalDatePart`, () => {
    it(`transforms`, () => expect(asLocalDatePart('2025-01-01')).toBe('2025-01-01'));
  });

  describe(`asTimeValue`, () => {
    it(`transforms e.g. string to ms`, () => expect(asTimeValue('1970-01-01T00:00:01.234Z')).toBe(1234));
  });

  describe(`asUtcHhMmPart`, () => {
    it(`transforms e.g. ms to date part`, () => expect(asUtcHhMmPart(1234)).toBe('00:00'));
  });

  describe(`dateCopy`, () => {
    it(`transforms date to copy`, () => expect(dateCopy(new Date(1))).toStrictEqual(new Date(1)));
  });

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

  describe(`dateTo...Weekday`, () => {
    describe(`dateToIsoWeekday`, () => {
      it('resolves Monday as 1', () => expect(dateToLocalIsoWeekday(asDate('2025-06-30'))).toBe(1));
      it('resolves Sunday as 7', () => expect(dateToLocalIsoWeekday(asDate('2025-06-29'))).toBe(7));
    });

    describe(`dateToUtcIsoWeekday`, () => {
      it('resolves Monday as 1', () => expect(dateToUtcIsoWeekday(asDate('2025-06-30T14:00:00.000Z'))).toBe(1));
      it('resolves Sunday as 7', () => expect(dateToUtcIsoWeekday(asDate('2025-06-29T14:00:00.000Z'))).toBe(7));
    });
  });

  describe(`isLocalIsoWeekWorkDay`, () => {
    it('friday work day', () => expect(isLocalIsoWeekWorkDay('2025-07-04')).toBe(true));
    it('saturday not work day', () => expect(isLocalIsoWeekWorkDay('2025-07-05')).toBe(false));
    it('sunday not work day', () => expect(isLocalIsoWeekWorkDay('2025-07-06')).toBe(false));
    it('monday work day', () => expect(isLocalIsoWeekWorkDay('2025-07-07')).toBe(true));
  });

  describe(`isUtcWeekWorkDay`, () => {
    it(`transforms correctly`, () =>
      expect(
        Object.values(Weekday).every((_, ii) => {
          const date = new Date(ii * msDay);
          return (
            isUtcWeekWorkDay(date) ===
            (date.getUTCDay() !== (Weekday.Saturday as number) && date.getUTCDay() !== (Weekday.Sunday as number))
          );
        }),
      ).toBeTruthy());
  });

  describe(`isoToHhMmPart`, () => {
    it(`returns hh:mm for valid`, () => expect(isoToHhMmPart('2000-01-02T11:22.333Z')).toBe('11:22'));
  });

  describe(`isValidDate`, () => {
    it(`validates date`, () => expect(isValidDate(new Date(Date.now()))).toBe(true));
    it(`invalidates date`, () => expect(isValidDate(new Date('nope'))).toBe(false));
    it(`invalidates non-date`, () => expect(isValidDate(true)).toBe(false));
    it(`invalidates undefined`, () => expect(isValidDate(undefined)).toBe(false));
    it(`invalidates null`, () => expect(isValidDate(null)).toBe(false));
  });
});
