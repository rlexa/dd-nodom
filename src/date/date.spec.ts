import {DateDiffLevel, msDay, msHour, msMinute, msSecond, msWeek, Weekday} from './const';
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
  asLocalIsoWeek,
  asLocalIsoWeekString,
  asLocalIsoYear,
  asLocalIsoYearWeek,
  asTimeValue,
  asUtcHhMmPart,
  dateCopy,
  dateDiffDays,
  dateDiffHours,
  dateDiffMinutes,
  dateDiffMonths,
  dateDiffMs,
  dateDiffMsDurationLevel,
  dateDiffSeconds,
  dateDiffWeeks,
  dateDiffYears,
  dateDurationDays,
  dateDurationHours,
  dateDurationLevel,
  dateDurationMinutes,
  dateDurationMs,
  dateDurationSeconds,
  dateDurationWeeks,
  dateEndOfUtcDay,
  dateEndOfUtcHalfYear,
  dateEndOfUtcHour,
  dateEndOfUtcMinute,
  dateEndOfUtcMonth,
  dateEndOfUtcQuarter,
  dateEndOfUtcSecond,
  dateEndOfUtcWorkWeek,
  dateEndOfUtcYear,
  dateMoveToStartOfLocalIsoWeek,
  dateStartOfLocalIsoYearWeek,
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
  test(`has main ms values`, () => {
    expect(msSecond).toBe(1000);
    expect(msMinute).toBe(1000 * 60);
    expect(msHour).toBe(1000 * 60 * 60);
    expect(msDay).toBe(1000 * 60 * 60 * 24);
    expect(msWeek).toBe(1000 * 60 * 60 * 24 * 7);
  });

  describe(`addDays`, () => {
    test(`adds`, () => expect(addDays(1)(asDate('2000-01-01'))).toStrictEqual(asDate('2000-01-02')));

    test(`subs`, () => expect(addDays(-1)(asDate('2000-01-02'))).toStrictEqual(asDate('2000-01-01')));

    test(`adds UTC`, () => expect(addUtcDays(1)(asDate('2000-01-01T00:00:00.000Z'))).toStrictEqual(asDate('2000-01-02T00:00:00.000Z')));

    test(`subs UTC`, () => expect(addUtcDays(-1)(asDate('2000-01-02T00:00:00.000Z'))).toStrictEqual(asDate('2000-01-01T00:00:00.000Z')));
  });

  describe(`addHours`, () => {
    test(`adds`, () => expect(addHours(1)(asDate('2000-01-01T00:00:00'))).toStrictEqual(asDate('2000-01-01T01:00:00')));
    test(`subs`, () => expect(addHours(-1)(asDate('2000-01-01T01:00:00'))).toStrictEqual(asDate('2000-01-01T00:00:00')));
  });

  describe(`addMinutes`, () => {
    test(`adds`, () => expect(addMinutes(1)(asDate('2000-01-01T00:00:00'))).toStrictEqual(asDate('2000-01-01T00:01:00')));
    test(`subs`, () => expect(addMinutes(-1)(asDate('2000-01-01T00:01:00'))).toStrictEqual(asDate('2000-01-01T00:00:00')));
  });

  describe(`addMs`, () => {
    test(`adds`, () => expect(addMs(1)(asDate('2000-01-01T00:00:00.000'))).toStrictEqual(asDate('2000-01-01T00:00:00.001')));
    test(`subs`, () => expect(addMs(-1)(asDate('2000-01-01T00:00:00.001'))).toStrictEqual(asDate('2000-01-01T00:00:00.000')));
  });

  describe(`addSeconds`, () => {
    test(`adds`, () => expect(addSeconds(1)(asDate('2000-01-01T00:00:00'))).toStrictEqual(asDate('2000-01-01T00:00:01')));
    test(`subs`, () => expect(addSeconds(-1)(asDate('2000-01-01T00:00:01'))).toStrictEqual(asDate('2000-01-01T00:00:00')));
  });

  describe(`addWeeks`, () => {
    test(`adds`, () => expect(addWeeks(1)(asDate('2000-01-01'))).toStrictEqual(asDate('2000-01-08')));

    test(`subs`, () => expect(addWeeks(-1)(asDate('2000-01-08'))).toStrictEqual(asDate('2000-01-01')));

    test(`adds UTC`, () => expect(addUtcWeeks(1)(asDate('2000-01-01T00:00:00.000Z'))).toStrictEqual(asDate('2000-01-08T00:00:00.000Z')));

    test(`subs UTC`, () => expect(addUtcWeeks(-1)(asDate('2000-01-08T00:00:00.000Z'))).toStrictEqual(asDate('2000-01-01T00:00:00.000Z')));
  });

  describe(`addUtcMonths`, () => {
    test(`adds`, () => expect(addUtcMonths(1)(asDate('2000-01-01'))).toStrictEqual(asDate('2000-02-01')));
    test(`subs`, () => expect(addUtcMonths(-1)(asDate('2000-02-01'))).toStrictEqual(asDate('2000-01-01')));
  });

  describe(`addUtcYears`, () => {
    test(`adds`, () => expect(addUtcYears(1)(asDate('2000-01-01'))).toStrictEqual(asDate('2001-01-01')));
    test(`subs`, () => expect(addUtcYears(-1)(asDate('2001-01-01'))).toStrictEqual(asDate('2000-01-01')));
  });

  describe(`asDate`, () => {
    test(`transforms null to null`, () => expect(asDate(null)).toBeNull());

    test(`transforms date to self`, () => {
      const date = new Date(123);
      expect(asDate(date)).toBe(date);
    });

    test(`transforms 123 to date`, () => expect(asDate(123)).toStrictEqual(new Date(123)));

    test(`transforms '2000-01-01T12:00:00Z' as is`, () =>
      expect(asDate('2000-01-01T12:00:00Z')).toStrictEqual(new Date('2000-01-01T12:00:00Z')));

    test(`transforms '2000-01-01' to date assumed as local timezone`, () => {
      const date = new Date('2000-01-01');
      expect(asDate('2000-01-01')).toStrictEqual(new Date(date.getTime() + date.getTimezoneOffset() * 60_000));
    });
  });

  describe(`asIsoDate`, () => {
    test(`transforms e.g. ms to iso`, () => expect(asIsoString(1234)).toBe('1970-01-01T00:00:01.234Z'));
  });

  describe(`asIsoDatePart`, () => {
    test(`transforms e.g. ms to date part`, () => expect(asIsoDatePart(1234)).toBe('1970-01-01'));
  });

  describe(`asIsoYearWeek/IsoYear/IsoWeek, asLocalIsoWeekString`, () => {
    const fromTo = [
      {from: '2005-01-02', week: 53, year: 2004, iso: '2004-W53'},
      {from: '2005-12-31', week: 52, year: 2005, iso: '2005-W52'},
      {from: '2006-01-01', week: 52, year: 2005, iso: '2005-W52'},
      {from: '2006-01-02', week: 1, year: 2006, iso: '2006-W01'},
      {from: '2007-01-01', week: 1, year: 2007, iso: '2007-W01'},
      {from: '2010-01-03', week: 53, year: 2009, iso: '2009-W53'},
      {from: '2023-01-01', week: 52, year: 2022, iso: '2022-W52'},
      {from: '2023-01-08', week: 1, year: 2023, iso: '2023-W01'},
      {from: '2024-01-07', week: 1, year: 2024, iso: '2024-W01'},
    ];

    fromTo.forEach(({from, year, week, iso}) => {
      test(`transforms ${from} to year:week = ${year}:${week}`, () => expect(asLocalIsoYearWeek(from)).toStrictEqual([year, week]));

      test(`transforms ${from} to week = ${week}`, () => expect(asLocalIsoWeek(from)).toBe(week));

      test(`transforms ${from} to year = ${year}`, () => expect(asLocalIsoYear(from)).toBe(year));

      test(`stringifies ${from} to iso = "${iso}"`, () => expect(asLocalIsoWeekString(from)).toBe(iso));
    });
  });

  describe(`asLocalDatePart`, () => {
    test(`transforms`, () => expect(asLocalDatePart('2025-01-01')).toBe('2025-01-01'));
  });

  describe(`asTimeValue`, () => {
    test(`transforms e.g. string to ms`, () => expect(asTimeValue('1970-01-01T00:00:01.234Z')).toBe(1234));
  });

  describe(`asUtcHhMmPart`, () => {
    test(`transforms e.g. ms to date part`, () => expect(asUtcHhMmPart(1234)).toBe('00:00'));
  });

  describe(`dateCopy`, () => {
    test(`transforms date to copy`, () => expect(dateCopy(new Date(1))).toStrictEqual(new Date(1)));
  });

  describe(`dateDiff`, () => {
    const diffs: {
      from: string;
      to: string;
      ms: number;
      levels: {level: DateDiffLevel; result: ReturnType<ReturnType<typeof dateDiffMsDurationLevel>>}[];
    }[] = [
      {
        from: '2000-01-01T12:00:00.123Z',
        to: '2000-01-01T12:00:00.000Z',
        ms: 123,
        levels: [
          {level: 'ms', result: {level: 'ms', ms: 123}},
          {level: 'seconds', result: {level: 'seconds', ms: 123, seconds: 0}},
          {level: 'minutes', result: {level: 'minutes', ms: 123, seconds: 0, minutes: 0}},
          {level: 'hours', result: {level: 'hours', ms: 123, seconds: 0, minutes: 0, hours: 0}},
          {level: 'days', result: {level: 'days', ms: 123, seconds: 0, minutes: 0, hours: 0, days: 0}},
          {level: 'weeks', result: {level: 'weeks', ms: 123, seconds: 0, minutes: 0, hours: 0, days: 0, weeks: 0}},
          {
            level: 'months',
            result: {level: 'months', ms: 123, seconds: 0, minutes: 0, hours: 0, days: 0, weeks: 0, months: 0},
          },
          {
            level: 'years',
            result: {
              level: 'years',
              ms: 123,
              seconds: 0,
              minutes: 0,
              hours: 0,
              days: 0,
              weeks: 0,
              months: 0,
              years: 0,
            },
          },
        ],
      },
      {
        from: '2000-12-31T23:59:59.999Z',
        to: '2000-01-01T00:00:00.000Z',
        ms: 31_622_399_999,
        levels: [
          {level: 'ms', result: {level: 'ms', ms: 31_622_399_999}},
          {level: 'seconds', result: {level: 'seconds', ms: 999, seconds: 31_622_399}},
          {level: 'minutes', result: {level: 'minutes', ms: 999, seconds: 59, minutes: 527_039}},
          {level: 'hours', result: {level: 'hours', ms: 999, seconds: 59, minutes: 59, hours: 8783}},
          {level: 'days', result: {level: 'days', ms: 999, seconds: 59, minutes: 59, hours: 23, days: 365}},
          {
            level: 'weeks',
            result: {level: 'weeks', ms: 999, seconds: 59, minutes: 59, hours: 23, days: 1, weeks: 52},
          },
          {
            level: 'months',
            // avg comes into play, no more exact numbers
            result: {level: 'months', ms: 999, seconds: 47, minutes: 10, hours: 18, days: 0, weeks: 0, months: 12},
          },
          {
            level: 'years',
            // avg comes into play, no more exact numbers
            result: {
              level: 'years',
              ms: 999,
              seconds: 59,
              minutes: 59,
              hours: 17,
              days: 0,
              weeks: 0,
              months: 0,
              years: 1,
            },
          },
        ],
      },
    ];

    diffs.forEach(({from, to, ms, levels}) => {
      const seconds = levels.find((ii) => ii.level === 'seconds')!.result.seconds;
      const minutes = levels.find((ii) => ii.level === 'minutes')!.result.minutes;
      const hours = levels.find((ii) => ii.level === 'hours')!.result.hours;
      const days = levels.find((ii) => ii.level === 'days')!.result.days;
      const weeks = levels.find((ii) => ii.level === 'weeks')!.result.weeks;
      const months = levels.find((ii) => ii.level === 'months')!.result.months;
      const years = levels.find((ii) => ii.level === 'years')!.result.years;

      test(`${from} - ${to} = ${ms}ms`, () => expect(dateDiffMs(asDate(from))(asDate(to))).toBe(ms));
      test(`${from} - ${to} = ${seconds}s`, () => expect(dateDiffSeconds(asDate(from))(asDate(to))).toBe(seconds));
      test(`${from} - ${to} = ${minutes}m`, () => expect(dateDiffMinutes(asDate(from))(asDate(to))).toBe(minutes));
      test(`${from} - ${to} = ${hours}h`, () => expect(dateDiffHours(asDate(from))(asDate(to))).toBe(hours));
      test(`${from} - ${to} = ${days}d`, () => expect(dateDiffDays(asDate(from))(asDate(to))).toBe(days));
      test(`${from} - ${to} = ${weeks}w`, () => expect(dateDiffWeeks(asDate(from))(asDate(to))).toBe(weeks));
      test(`${from} - ${to} = ${months}mo`, () => expect(dateDiffMonths(asDate(from))(asDate(to))).toBe(months));
      test(`${from} - ${to} = ${years}y`, () => expect(dateDiffYears(asDate(from))(asDate(to))).toBe(years));

      levels.forEach(({level, result}) => {
        const negateNumbers = (obj: object) =>
          Object.entries(obj).reduce((acc, [key, val]) => ({...acc, [key]: typeof val === 'number' ? -val : val}), {});

        test(`${from} - ${to} => returns level "${level}"`, () => {
          expect(dateDiffMsDurationLevel(level)(dateDiffMs(asDate(from))(asDate(to)))).toStrictEqual(result);

          expect(dateDiffMsDurationLevel(level)(dateDiffMs(asDate(to))(asDate(from)))).toStrictEqual(negateNumbers(result));
        });
      });
    });
  });

  describe(`dateEndOfUtc...`, () => {
    test(`transforms with dateEndOfUtcSecond`, () =>
      expect(dateEndOfUtcSecond(new Date(`2000-01-01T00:00:00.123Z`))).toStrictEqual(new Date(`2000-01-01T00:00:00.999Z`)));

    test(`transforms with dateEndOfUtcMinute`, () =>
      expect(dateEndOfUtcMinute(new Date(`2000-01-01T00:00:12.123Z`))).toStrictEqual(new Date(`2000-01-01T00:00:59.999Z`)));

    test(`transforms with dateEndOfUtcHour`, () =>
      expect(dateEndOfUtcHour(new Date(`2000-01-01T00:12:12.123Z`))).toStrictEqual(new Date(`2000-01-01T00:59:59.999Z`)));

    test(`transforms with dateEndOfUtcDay`, () =>
      expect(dateEndOfUtcDay(new Date(`2000-01-01T12:12:12.123Z`))).toStrictEqual(new Date(`2000-01-01T23:59:59.999Z`)));

    test(`transforms with dateEndOfUtcWorkWeek`, () => {
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

    test(`transforms with dateEndOfUtcMonth`, () => {
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

    test(`transforms with dateEndOfUtcHalfYear`, () => {
      expect(dateEndOfUtcHalfYear(new Date(`2000-03-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-06-30T23:59:59.999Z`));
      expect(dateEndOfUtcHalfYear(new Date(`2000-09-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-12-31T23:59:59.999Z`));
    });

    test(`transforms with dateEndOfUtcQuarter`, () => {
      expect(dateEndOfUtcQuarter(new Date(`2000-02-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-03-31T23:59:59.999Z`));
      expect(dateEndOfUtcQuarter(new Date(`2000-05-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-06-30T23:59:59.999Z`));
      expect(dateEndOfUtcQuarter(new Date(`2000-08-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-09-30T23:59:59.999Z`));
      expect(dateEndOfUtcQuarter(new Date(`2000-11-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-12-31T23:59:59.999Z`));
    });

    test(`transforms with dateEndOfUtcYear`, () =>
      expect(dateEndOfUtcYear(new Date(`2000-11-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-12-31T23:59:59.999Z`)));
  });

  describe(`dateDuration`, () => {
    const diffs: {
      durationMs: number;
      levels: {level: DateDiffLevel; result: ReturnType<ReturnType<typeof dateDurationLevel>>}[];
    }[] = [
      {
        durationMs: 123,
        levels: [
          {level: 'ms', result: {level: 'ms', ms: 123}},
          {level: 'seconds', result: {level: 'seconds', ms: 123, seconds: 0}},
          {level: 'minutes', result: {level: 'minutes', ms: 123, seconds: 0, minutes: 0}},
          {level: 'hours', result: {level: 'hours', ms: 123, seconds: 0, minutes: 0, hours: 0}},
          {level: 'days', result: {level: 'days', ms: 123, seconds: 0, minutes: 0, hours: 0, days: 0}},
          {level: 'weeks', result: {level: 'weeks', ms: 123, seconds: 0, minutes: 0, hours: 0, days: 0, weeks: 0}},
        ],
      },
      {
        durationMs: 52 * msWeek + 6 * msDay + 23 * msHour + 59 * msMinute + 58 * msSecond + 999,
        levels: [
          {level: 'ms', result: {level: 'ms', ms: ((((52 * 7 + 6) * 24 + 23) * 60 + 59) * 60 + 58) * 1000 + 999}},
          {
            level: 'seconds',
            result: {level: 'seconds', ms: 999, seconds: (((52 * 7 + 6) * 24 + 23) * 60 + 59) * 60 + 58},
          },
          {
            level: 'minutes',
            result: {level: 'minutes', ms: 999, seconds: 58, minutes: ((52 * 7 + 6) * 24 + 23) * 60 + 59},
          },
          {
            level: 'hours',
            result: {level: 'hours', ms: 999, seconds: 58, minutes: 59, hours: (52 * 7 + 6) * 24 + 23},
          },
          {level: 'days', result: {level: 'days', ms: 999, seconds: 58, minutes: 59, hours: 23, days: 52 * 7 + 6}},
          {
            level: 'weeks',
            result: {level: 'weeks', ms: 999, seconds: 58, minutes: 59, hours: 23, days: 6, weeks: 52},
          },
        ],
      },
    ];

    diffs.forEach(({durationMs, levels}) => {
      const seconds = levels.find((ii) => ii.level === 'seconds')!.result.seconds;
      const minutes = levels.find((ii) => ii.level === 'minutes')!.result.minutes;
      const hours = levels.find((ii) => ii.level === 'hours')!.result.hours;
      const days = levels.find((ii) => ii.level === 'days')!.result.days;
      const weeks = levels.find((ii) => ii.level === 'weeks')!.result.weeks;

      test(`${durationMs}ms => ${durationMs}ms`, () => expect(dateDurationMs(durationMs)).toBe(durationMs));
      test(`${durationMs}ms => ${seconds}m`, () => expect(dateDurationSeconds(durationMs)).toBe(seconds));
      test(`${durationMs}ms => ${minutes}m`, () => expect(dateDurationMinutes(durationMs)).toBe(minutes));
      test(`${durationMs}ms => ${hours}h`, () => expect(dateDurationHours(durationMs)).toBe(hours));
      test(`${durationMs}ms => ${days}h`, () => expect(dateDurationDays(durationMs)).toBe(days));
      test(`${durationMs}ms => ${weeks}h`, () => expect(dateDurationWeeks(durationMs)).toBe(weeks));

      levels.forEach(({level, result}) => {
        test(`${durationMs}ms => returns level "${level}"`, () => expect(dateDurationLevel(level)(durationMs)).toStrictEqual(result));
      });
    });

    test(`floors positive e.g. seconds value`, () => expect(dateDurationSeconds(msSecond + 123)).toBe(1));
    test(`floors negative e.g. seconds value`, () => expect(dateDurationSeconds(-msSecond - 123)).toBe(-1));
  });

  describe(`dateMoveToStartOfLocalIsoWeek`, () => {
    test(`moves down`, () => expect(dateMoveToStartOfLocalIsoWeek(asDate('2025-07-17'))(28)).toStrictEqual(asDate('2025-07-07')));

    test(`moves up`, () => expect(dateMoveToStartOfLocalIsoWeek(asDate('2025-07-17'))(32)).toStrictEqual(asDate('2025-08-04')));
  });

  describe(`dateStartOfLocalIsoYearWeek`, () => {
    test(`transforms first`, () => expect(dateStartOfLocalIsoYearWeek([2025, 1])).toStrictEqual(asDate('2024-12-30')));
    test(`transforms some`, () => expect(dateStartOfLocalIsoYearWeek([2025, 33])).toStrictEqual(asDate('2025-08-11')));
    test(`transforms last`, () => expect(dateStartOfLocalIsoYearWeek([2025, 52])).toStrictEqual(asDate('2025-12-22')));
  });

  describe(`dateStartOfUtc...`, () => {
    test(`transforms with dateStartOfUtcSecond`, () =>
      expect(dateStartOfUtcSecond(new Date(`2000-01-01T00:00:00.123Z`))).toStrictEqual(new Date(`2000-01-01T00:00:00.000Z`)));

    test(`transforms with dateStartOfUtcMinute`, () =>
      expect(dateStartOfUtcMinute(new Date(`2000-01-01T00:00:12.123Z`))).toStrictEqual(new Date(`2000-01-01T00:00:00.000Z`)));

    test(`transforms with dateStartOfUtcHour`, () =>
      expect(dateStartOfUtcHour(new Date(`2000-01-01T00:12:12.123Z`))).toStrictEqual(new Date(`2000-01-01T00:00:00.000Z`)));

    test(`transforms with dateStartOfUtcDay`, () =>
      expect(dateStartOfUtcDay(new Date(`2000-01-01T12:12:12.123Z`))).toStrictEqual(new Date(`2000-01-01T00:00:00.000Z`)));

    test(`transforms with dateStartOfUtcWeek`, () => {
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

    test(`transforms with dateStartOfUtcWorkWeek`, () => {
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

    test(`transforms with dateStartOfUtcMonth`, () =>
      expect(dateStartOfUtcMonth(new Date(`2000-01-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-01-01T00:00:00.000Z`)));

    test(`transforms with dateStartOfUtcQuarter`, () => {
      expect(dateStartOfUtcQuarter(new Date(`2000-02-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-01-01T00:00:00.000Z`));
      expect(dateStartOfUtcQuarter(new Date(`2000-05-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-04-01T00:00:00.000Z`));
      expect(dateStartOfUtcQuarter(new Date(`2000-08-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-07-01T00:00:00.000Z`));
      expect(dateStartOfUtcQuarter(new Date(`2000-11-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-10-01T00:00:00.000Z`));
    });

    test(`transforms with dateStartOfUtcHalfYear`, () => {
      expect(dateStartOfUtcHalfYear(new Date(`2000-03-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-01-01T00:00:00.000Z`));
      expect(dateStartOfUtcHalfYear(new Date(`2000-09-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-07-01T00:00:00.000Z`));
    });

    test(`transforms with dateStartOfUtcYear`, () =>
      expect(dateStartOfUtcYear(new Date(`2000-12-12T12:12:12.123Z`))).toStrictEqual(new Date(`2000-01-01T00:00:00.000Z`)));
  });

  describe(`dateTo...Weekday`, () => {
    describe(`dateToIsoWeekday`, () => {
      test('resolves Monday as 1', () => expect(dateToLocalIsoWeekday(asDate('2025-06-30'))).toBe(1));
      test('resolves Sunday as 7', () => expect(dateToLocalIsoWeekday(asDate('2025-06-29'))).toBe(7));
    });

    describe(`dateToUtcIsoWeekday`, () => {
      test('resolves Monday as 1', () => expect(dateToUtcIsoWeekday(asDate('2025-06-30T14:00:00.000Z'))).toBe(1));
      test('resolves Sunday as 7', () => expect(dateToUtcIsoWeekday(asDate('2025-06-29T14:00:00.000Z'))).toBe(7));
    });
  });

  describe(`isLocalIsoWeekWorkDay`, () => {
    test('friday work day', () => expect(isLocalIsoWeekWorkDay('2025-07-04')).toBe(true));
    test('saturday not work day', () => expect(isLocalIsoWeekWorkDay('2025-07-05')).toBe(false));
    test('sunday not work day', () => expect(isLocalIsoWeekWorkDay('2025-07-06')).toBe(false));
    test('monday work day', () => expect(isLocalIsoWeekWorkDay('2025-07-07')).toBe(true));
  });

  describe(`isUtcWeekWorkDay`, () => {
    test(`transforms correctly`, () =>
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
    test(`returns hh:mm for valid`, () => expect(isoToHhMmPart('2000-01-02T11:22.333Z')).toBe('11:22'));
  });

  describe(`isValidDate`, () => {
    test(`validates date`, () => expect(isValidDate(new Date(Date.now()))).toBe(true));
    test(`invalidates date`, () => expect(isValidDate(new Date('nope'))).toBe(false));
    test(`invalidates non-date`, () => expect(isValidDate(true)).toBe(false));
    test(`invalidates undefined`, () => expect(isValidDate(undefined)).toBe(false));
    test(`invalidates null`, () => expect(isValidDate(null)).toBe(false));
  });
});
