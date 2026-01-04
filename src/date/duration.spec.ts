import {avgDaysPerMonth, avgDaysPerYear, DateDiffLevel, msDay, msHour, msMinute, msSecond, msWeek} from './const';
import {
  dateDurationDays,
  dateDurationHours,
  dateDurationLevel,
  dateDurationMinutes,
  dateDurationMs,
  dateDurationSeconds,
  dateDurationWeeks,
  formatShortDurationUpToHours,
  formatStyledLocalizedDuration,
  formatStyledLocalizedShortestDuration,
  LocalizeFormatDurationValue,
} from './duration';

describe(`date duration`, () => {
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

      it(`${durationMs}ms => ${durationMs}ms`, () => expect(dateDurationMs(durationMs)).toBe(durationMs));
      it(`${durationMs}ms => ${seconds}m`, () => expect(dateDurationSeconds(durationMs)).toBe(seconds));
      it(`${durationMs}ms => ${minutes}m`, () => expect(dateDurationMinutes(durationMs)).toBe(minutes));
      it(`${durationMs}ms => ${hours}h`, () => expect(dateDurationHours(durationMs)).toBe(hours));
      it(`${durationMs}ms => ${days}h`, () => expect(dateDurationDays(durationMs)).toBe(days));
      it(`${durationMs}ms => ${weeks}h`, () => expect(dateDurationWeeks(durationMs)).toBe(weeks));

      levels.forEach(({level, result}) => {
        it(`${durationMs}ms => returns level "${level}"`, () => expect(dateDurationLevel(level)(durationMs)).toStrictEqual(result));
      });
    });

    it(`floors positive e.g. seconds value`, () => expect(dateDurationSeconds(msSecond + 123)).toBe(1));
    it(`floors negative e.g. seconds value`, () => expect(dateDurationSeconds(-msSecond - 123)).toBe(-1));
  });

  describe(`formatDurationUpToHours`, () => {
    it(`transforms`, () =>
      expect(
        formatShortDurationUpToHours('de-DE')(
          msDay * avgDaysPerYear * 1 + msDay * avgDaysPerMonth * 2 + msWeek * 3 + msDay * 4 + msHour * 5 + msMinute * 6 + msSecond * 7 + 8,
        ),
      ).toBe('1 J, 2 Mon., 3 Wo., 4 Tg. und 5 Std.'));
  });

  describe(`formatStyledLocalizedDuration`, () => {
    const allDurations: LocalizeFormatDurationValue = {
      years: 1,
      months: 2,
      weeks: 3,
      days: 4,
      hours: 5,
      minutes: 6,
      seconds: 7,
      milliseconds: 8,
      microseconds: 9,
      nanoseconds: 10,
    };

    describe(`with invalid locale`, () => {
      it(`transforms all`, () =>
        expect(formatStyledLocalizedDuration('short')('nope')(allDurations)).toBe(
          '1 years, 2 months, 3 weeks, 4 days, 5 hours, 6 minutes, 7 seconds, 8 milliseconds, 9 microseconds, 10 nanoseconds',
        ));

      it(`transforms part`, () => expect(formatStyledLocalizedDuration('short')('nope')({days: 1, hours: 2})).toBe('1 days, 2 hours'));
    });

    describe(`with valid locale`, () => {
      it(`transforms all`, () =>
        expect(formatStyledLocalizedDuration('short')('de-DE')(allDurations)).toBe(
          '1 J, 2 Mon., 3 Wo., 4 Tg., 5 Std., 6 Min., 7 Sek., 8 ms, 9 μs und 10 ns',
        ));

      it(`transforms part`, () => expect(formatStyledLocalizedDuration('short')('de-DE')({days: 1, hours: 2})).toBe('1 Tg., 2 Std.'));
    });
  });

  describe(`formatStyledLocalizedShortestDuration`, () => {
    const msMonth = avgDaysPerMonth * msDay;
    const msYearEstimated = avgDaysPerYear * msDay;

    describe(`with invalid locale`, () => {
      it(`floors: years`, () =>
        expect(formatStyledLocalizedShortestDuration('short')('nope')(2 * msYearEstimated + msYearEstimated * 0.49)).toBe('2 years'));
      it(`floors: months`, () =>
        expect(formatStyledLocalizedShortestDuration('short')('nope')(2 * msMonth + msMonth * 0.49)).toBe('2 months'));
      it(`floors: weeks`, () => expect(formatStyledLocalizedShortestDuration('short')('nope')(2 * msWeek + 3 * msDay)).toBe('2 weeks'));
      it(`floors: days`, () => expect(formatStyledLocalizedShortestDuration('short')('nope')(2 * msDay + 11 * msHour)).toBe('2 days'));
      it(`floors: hours`, () => expect(formatStyledLocalizedShortestDuration('short')('nope')(2 * msHour + 29 * msMinute)).toBe('2 hours'));
      it(`floors: minutes`, () =>
        expect(formatStyledLocalizedShortestDuration('short')('nope')(2 * msMinute + 29 * msSecond)).toBe('2 minutes'));
      it(`floors: seconds`, () => expect(formatStyledLocalizedShortestDuration('short')('nope')(2 * msSecond + 499)).toBe('2 seconds'));
      it(`rounds up: years`, () =>
        expect(formatStyledLocalizedShortestDuration('short')('nope')(2 * msYearEstimated + 0.5 * msYearEstimated)).toBe('3 years'));
      it(`rounds up: months`, () =>
        expect(formatStyledLocalizedShortestDuration('short')('nope')(2 * msMonth + 0.5 * msMonth)).toBe('3 months'));
      it(`rounds up: weeks`, () => expect(formatStyledLocalizedShortestDuration('short')('nope')(2 * msWeek + 4 * msDay)).toBe('3 weeks'));
      it(`rounds up: days`, () => expect(formatStyledLocalizedShortestDuration('short')('nope')(2 * msDay + 12 * msHour)).toBe('3 days'));
      it(`rounds up: hours`, () =>
        expect(formatStyledLocalizedShortestDuration('short')('nope')(2 * msHour + 30 * msMinute)).toBe('3 hours'));
      it(`rounds up: minutes`, () =>
        expect(formatStyledLocalizedShortestDuration('short')('nope')(2 * msMinute + 30 * msSecond)).toBe('3 minutes'));
      it(`rounds up: seconds`, () => expect(formatStyledLocalizedShortestDuration('short')('nope')(2 * msSecond + 500)).toBe('3 seconds'));
      it(`ms`, () => expect(formatStyledLocalizedShortestDuration('short')('nope')(999)).toBe('999 milliseconds'));
      it(`negative ms`, () => expect(formatStyledLocalizedShortestDuration('short')('nope')(-999)).toBe('999 milliseconds'));
    });

    describe(`with valid locale`, () => {
      it(`floors: years`, () =>
        expect(formatStyledLocalizedShortestDuration('short')('de-DE')(2 * msYearEstimated + msYearEstimated * 0.49)).toBe('2 J'));
      it(`floors: months`, () =>
        expect(formatStyledLocalizedShortestDuration('short')('de-DE')(2 * msMonth + msMonth * 0.49)).toBe('2 Mon.'));
      it(`floors: weeks`, () => expect(formatStyledLocalizedShortestDuration('short')('de-DE')(2 * msWeek + 3 * msDay)).toBe('2 Wo.'));
      it(`floors: days`, () => expect(formatStyledLocalizedShortestDuration('short')('de-DE')(2 * msDay + 11 * msHour)).toBe('2 Tg.'));
      it(`floors: hours`, () => expect(formatStyledLocalizedShortestDuration('short')('de-DE')(2 * msHour + 29 * msMinute)).toBe('2 Std.'));
      it(`floors: minutes`, () =>
        expect(formatStyledLocalizedShortestDuration('short')('de-DE')(2 * msMinute + 29 * msSecond)).toBe('2 Min.'));
      it(`floors: seconds`, () => expect(formatStyledLocalizedShortestDuration('short')('de-DE')(2 * msSecond + 499)).toBe('2 Sek.'));
      it(`rounds up: years`, () =>
        expect(formatStyledLocalizedShortestDuration('short')('de-DE')(2 * msYearEstimated + 0.5 * msYearEstimated)).toBe('3 J'));
      it(`rounds up: months`, () =>
        expect(formatStyledLocalizedShortestDuration('short')('de-DE')(2 * msMonth + 0.5 * msMonth)).toBe('3 Mon.'));
      it(`rounds up: weeks`, () => expect(formatStyledLocalizedShortestDuration('short')('de-DE')(2 * msWeek + 4 * msDay)).toBe('3 Wo.'));
      it(`rounds up: days`, () => expect(formatStyledLocalizedShortestDuration('short')('de-DE')(2 * msDay + 12 * msHour)).toBe('3 Tg.'));
      it(`rounds up: hours`, () =>
        expect(formatStyledLocalizedShortestDuration('short')('de-DE')(2 * msHour + 30 * msMinute)).toBe('3 Std.'));
      it(`rounds up: minutes`, () =>
        expect(formatStyledLocalizedShortestDuration('short')('de-DE')(2 * msMinute + 30 * msSecond)).toBe('3 Min.'));
      it(`rounds up: seconds`, () => expect(formatStyledLocalizedShortestDuration('short')('de-DE')(2 * msSecond + 500)).toBe('3 Sek.'));
      it(`ms`, () => expect(formatStyledLocalizedShortestDuration('short')('de-DE')(999)).toBe('999 ms'));
      it(`negative ms`, () => expect(formatStyledLocalizedShortestDuration('short')('de-DE')(-999)).toBe('999 ms'));
    });
  });
});
