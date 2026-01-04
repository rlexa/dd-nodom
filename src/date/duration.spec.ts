import {avgDaysPerMonth, avgDaysPerYear, msDay, msHour, msMinute, msSecond, msWeek} from './const';
import {
  formatShortDurationUpToHours,
  formatStyledLocalizedDuration,
  formatStyledLocalizedShortestDuration,
  LocalizeFormatDurationValue,
} from './duration';

describe(`date duration`, () => {
  describe(`formatDurationUpToHours`, () => {
    test(`transforms`, () =>
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
      test(`transforms all`, () =>
        expect(formatStyledLocalizedDuration('short')('nope')(allDurations)).toBe(
          '1 years, 2 months, 3 weeks, 4 days, 5 hours, 6 minutes, 7 seconds, 8 milliseconds, 9 microseconds, 10 nanoseconds',
        ));

      test(`transforms part`, () => expect(formatStyledLocalizedDuration('short')('nope')({days: 1, hours: 2})).toBe('1 days, 2 hours'));
    });

    describe(`with valid locale`, () => {
      test(`transforms all`, () =>
        expect(formatStyledLocalizedDuration('short')('de-DE')(allDurations)).toBe(
          '1 J, 2 Mon., 3 Wo., 4 Tg., 5 Std., 6 Min., 7 Sek., 8 ms, 9 μs und 10 ns',
        ));

      test(`transforms part`, () => expect(formatStyledLocalizedDuration('short')('de-DE')({days: 1, hours: 2})).toBe('1 Tg., 2 Std.'));
    });
  });

  describe(`formatStyledLocalizedShortestDuration`, () => {
    const msMonth = avgDaysPerMonth * msDay;
    const msYearEstimated = avgDaysPerYear * msDay;

    describe(`with invalid locale`, () => {
      test(`floors: years`, () =>
        expect(formatStyledLocalizedShortestDuration('short')('nope')(2 * msYearEstimated + msYearEstimated * 0.49)).toBe('2 years'));
      test(`floors: months`, () =>
        expect(formatStyledLocalizedShortestDuration('short')('nope')(2 * msMonth + msMonth * 0.49)).toBe('2 months'));
      test(`floors: weeks`, () => expect(formatStyledLocalizedShortestDuration('short')('nope')(2 * msWeek + 3 * msDay)).toBe('2 weeks'));
      test(`floors: days`, () => expect(formatStyledLocalizedShortestDuration('short')('nope')(2 * msDay + 11 * msHour)).toBe('2 days'));
      test(`floors: hours`, () =>
        expect(formatStyledLocalizedShortestDuration('short')('nope')(2 * msHour + 29 * msMinute)).toBe('2 hours'));
      test(`floors: minutes`, () =>
        expect(formatStyledLocalizedShortestDuration('short')('nope')(2 * msMinute + 29 * msSecond)).toBe('2 minutes'));
      test(`floors: seconds`, () => expect(formatStyledLocalizedShortestDuration('short')('nope')(2 * msSecond + 499)).toBe('2 seconds'));
      test(`rounds up: years`, () =>
        expect(formatStyledLocalizedShortestDuration('short')('nope')(2 * msYearEstimated + 0.5 * msYearEstimated)).toBe('3 years'));
      test(`rounds up: months`, () =>
        expect(formatStyledLocalizedShortestDuration('short')('nope')(2 * msMonth + 0.5 * msMonth)).toBe('3 months'));
      test(`rounds up: weeks`, () =>
        expect(formatStyledLocalizedShortestDuration('short')('nope')(2 * msWeek + 4 * msDay)).toBe('3 weeks'));
      test(`rounds up: days`, () => expect(formatStyledLocalizedShortestDuration('short')('nope')(2 * msDay + 12 * msHour)).toBe('3 days'));
      test(`rounds up: hours`, () =>
        expect(formatStyledLocalizedShortestDuration('short')('nope')(2 * msHour + 30 * msMinute)).toBe('3 hours'));
      test(`rounds up: minutes`, () =>
        expect(formatStyledLocalizedShortestDuration('short')('nope')(2 * msMinute + 30 * msSecond)).toBe('3 minutes'));
      test(`rounds up: seconds`, () =>
        expect(formatStyledLocalizedShortestDuration('short')('nope')(2 * msSecond + 500)).toBe('3 seconds'));
      test(`ms`, () => expect(formatStyledLocalizedShortestDuration('short')('nope')(999)).toBe('999 milliseconds'));
      test(`negative ms`, () => expect(formatStyledLocalizedShortestDuration('short')('nope')(-999)).toBe('999 milliseconds'));
    });

    describe(`with valid locale`, () => {
      test(`floors: years`, () =>
        expect(formatStyledLocalizedShortestDuration('short')('de-DE')(2 * msYearEstimated + msYearEstimated * 0.49)).toBe('2 J'));
      test(`floors: months`, () =>
        expect(formatStyledLocalizedShortestDuration('short')('de-DE')(2 * msMonth + msMonth * 0.49)).toBe('2 Mon.'));
      test(`floors: weeks`, () => expect(formatStyledLocalizedShortestDuration('short')('de-DE')(2 * msWeek + 3 * msDay)).toBe('2 Wo.'));
      test(`floors: days`, () => expect(formatStyledLocalizedShortestDuration('short')('de-DE')(2 * msDay + 11 * msHour)).toBe('2 Tg.'));
      test(`floors: hours`, () =>
        expect(formatStyledLocalizedShortestDuration('short')('de-DE')(2 * msHour + 29 * msMinute)).toBe('2 Std.'));
      test(`floors: minutes`, () =>
        expect(formatStyledLocalizedShortestDuration('short')('de-DE')(2 * msMinute + 29 * msSecond)).toBe('2 Min.'));
      test(`floors: seconds`, () => expect(formatStyledLocalizedShortestDuration('short')('de-DE')(2 * msSecond + 499)).toBe('2 Sek.'));
      test(`rounds up: years`, () =>
        expect(formatStyledLocalizedShortestDuration('short')('de-DE')(2 * msYearEstimated + 0.5 * msYearEstimated)).toBe('3 J'));
      test(`rounds up: months`, () =>
        expect(formatStyledLocalizedShortestDuration('short')('de-DE')(2 * msMonth + 0.5 * msMonth)).toBe('3 Mon.'));
      test(`rounds up: weeks`, () => expect(formatStyledLocalizedShortestDuration('short')('de-DE')(2 * msWeek + 4 * msDay)).toBe('3 Wo.'));
      test(`rounds up: days`, () => expect(formatStyledLocalizedShortestDuration('short')('de-DE')(2 * msDay + 12 * msHour)).toBe('3 Tg.'));
      test(`rounds up: hours`, () =>
        expect(formatStyledLocalizedShortestDuration('short')('de-DE')(2 * msHour + 30 * msMinute)).toBe('3 Std.'));
      test(`rounds up: minutes`, () =>
        expect(formatStyledLocalizedShortestDuration('short')('de-DE')(2 * msMinute + 30 * msSecond)).toBe('3 Min.'));
      test(`rounds up: seconds`, () => expect(formatStyledLocalizedShortestDuration('short')('de-DE')(2 * msSecond + 500)).toBe('3 Sek.'));
      test(`ms`, () => expect(formatStyledLocalizedShortestDuration('short')('de-DE')(999)).toBe('999 ms'));
      test(`negative ms`, () => expect(formatStyledLocalizedShortestDuration('short')('de-DE')(-999)).toBe('999 ms'));
    });
  });
});
