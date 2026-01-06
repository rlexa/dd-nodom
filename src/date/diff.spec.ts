import {DateDiffLevel} from './const';
import {
  dateDiffDays,
  dateDiffHours,
  dateDiffMinutes,
  dateDiffMonths,
  dateDiffMs,
  dateDiffMsDurationLevel,
  dateDiffSeconds,
  dateDiffWeeks,
  dateDiffYears,
} from './diff';
import {asDate} from './parse';

describe('date diff', () => {
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

      it(`${from} - ${to} = ${ms}ms`, () => expect(dateDiffMs(asDate(from))(asDate(to))).toBe(ms));
      it(`${from} - ${to} = ${seconds}s`, () => expect(dateDiffSeconds(asDate(from))(asDate(to))).toBe(seconds));
      it(`${from} - ${to} = ${minutes}m`, () => expect(dateDiffMinutes(asDate(from))(asDate(to))).toBe(minutes));
      it(`${from} - ${to} = ${hours}h`, () => expect(dateDiffHours(asDate(from))(asDate(to))).toBe(hours));
      it(`${from} - ${to} = ${days}d`, () => expect(dateDiffDays(asDate(from))(asDate(to))).toBe(days));
      it(`${from} - ${to} = ${weeks}w`, () => expect(dateDiffWeeks(asDate(from))(asDate(to))).toBe(weeks));
      it(`${from} - ${to} = ${months}mo`, () => expect(dateDiffMonths(asDate(from))(asDate(to))).toBe(months));
      it(`${from} - ${to} = ${years}y`, () => expect(dateDiffYears(asDate(from))(asDate(to))).toBe(years));

      levels.forEach(({level, result}) => {
        const negateNumbers = (obj: object) =>
          Object.entries(obj).reduce((acc, [key, val]) => ({...acc, [key]: typeof val === 'number' ? -val : val}), {});

        it(`${from} - ${to} => returns level "${level}"`, () => {
          expect(dateDiffMsDurationLevel(level)(dateDiffMs(asDate(from))(asDate(to)))).toStrictEqual(result);

          expect(dateDiffMsDurationLevel(level)(dateDiffMs(asDate(to))(asDate(from)))).toStrictEqual(negateNumbers(result));
        });
      });
    });
  });
});
