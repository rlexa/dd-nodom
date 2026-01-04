import {arrayFilterNotEmpty, arrayJoin, arrayReduce} from '../array';
import {compose, flip} from '../fp';
import {avgDaysPerMonth, avgDaysPerYear, DateDiffLevel, dateZero, msDay} from './const';
import {asDateNonNull} from './date';
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
  removeDateDiffLevels,
} from './diff';

type AllKeysOfType<T> = T extends T ? keyof T : never;

export const dateDurationMs = compose(flip(dateDiffMs)(dateZero), asDateNonNull);
export const dateDurationLevel = (level: DateDiffLevel) => compose(dateDiffMsDurationLevel(level), dateDurationMs);
export const dateDurationSeconds = compose(flip(dateDiffSeconds)(dateZero), asDateNonNull);
export const dateDurationMinutes = compose(flip(dateDiffMinutes)(dateZero), asDateNonNull);
export const dateDurationHours = compose(flip(dateDiffHours)(dateZero), asDateNonNull);
export const dateDurationDays = compose(flip(dateDiffDays)(dateZero), asDateNonNull);
export const dateDurationWeeks = compose(flip(dateDiffWeeks)(dateZero), asDateNonNull);
export const dateDurationMonths = compose(flip(dateDiffMonths)(dateZero), asDateNonNull);
export const dateDurationYears = compose(flip(dateDiffYears)(dateZero), asDateNonNull);

export type LocalizeFormatDurationStyle = 'long' | 'short' | 'narrow' | 'digital';
export type LocalizeFormatDurationValue =
  | {years: number}
  | {months: number}
  | {weeks: number}
  | {days: number}
  | {hours: number}
  | {minutes: number}
  | {seconds: number}
  | {milliseconds: number}
  | {microseconds: number}
  | {nanoseconds: number};
export const formatStyledLocalizedDuration =
  (style: LocalizeFormatDurationStyle) => (locale: string) => (duration: LocalizeFormatDurationValue) => {
    // TODO all browsers have it really, wait for TS to catch up and make this simpler

    const fnFallback = compose(
      arrayJoin(', '),
      arrayFilterNotEmpty<string>,
      arrayReduce<string[]>(() => [])((acc, [key, val]) => [...acc, `${val} ${key}`]),
      (arg: typeof duration) => Object.entries(arg),
    );

    try {
      if ('DurationFormat' in Intl && (Intl as any).DurationFormat.supportedLocalesOf([locale])) {
        return new (Intl as any).DurationFormat(locale, {style}).format(duration) as string;
      }
    } catch {
      // fallthrough
    }

    return fnFallback(duration);
  };

export const formatDigitalLocaleDuration = formatStyledLocalizedDuration('digital');
export const formatLongLocaleDuration = formatStyledLocalizedDuration('long');
export const formatNarrowLocaleDuration = formatStyledLocalizedDuration('narrow');
export const formatShortLocaleDuration = formatStyledLocalizedDuration('short');

const diffLevelToFormatKey: Record<DateDiffLevel, AllKeysOfType<LocalizeFormatDurationValue>> = {
  days: 'days',
  hours: 'hours',
  minutes: 'minutes',
  months: 'months',
  ms: 'milliseconds',
  seconds: 'seconds',
  weeks: 'weeks',
  years: 'years',
};

const diffLevelsToRoundedLevel = (level: DateDiffLevel) => (from: ReturnType<ReturnType<typeof dateDiffMsDurationLevel>>) => {
  switch (level) {
    case 'days':
      return (from[level] ?? 0) + ((from.hours ?? 0) >= 12 ? 1 : 0);
    case 'hours':
      return (from[level] ?? 0) + ((from.minutes ?? 0) >= 30 ? 1 : 0);
    case 'minutes':
      return (from[level] ?? 0) + ((from.seconds ?? 0) >= 30 ? 1 : 0);
    case 'months':
      return (from[level] ?? 0) + ((from.days ?? 0) >= avgDaysPerMonth / 2 ? 1 : 0);
    case 'ms':
      return from[level];
    case 'seconds':
      return (from[level] ?? 0) + (from.ms >= 500 ? 1 : 0);
    case 'weeks':
      return (from[level] ?? 0) + ((from.days ?? 0) >= 3.5 ? 1 : 0);
    case 'years':
      return (from[level] ?? 0) + ((from.days ?? 0) >= avgDaysPerYear / 2 ? 1 : 0);
    default:
      return 0;
  }
};

export const formatStyledLocalizedShortestDuration = (style: LocalizeFormatDurationStyle) => (locale: string) => (msDuration: number) => {
  const localize = formatStyledLocalizedDuration(style)(locale);

  msDuration = Math.abs(msDuration);

  const msYearEstimated = msDay * avgDaysPerYear;
  const years = msDuration / msYearEstimated;
  if (years >= 1) {
    return localize({years: Math.round(years)});
  }

  const msMonthEstimated = msDay * avgDaysPerMonth;
  const months = msDuration / msMonthEstimated;
  if (months >= 1) {
    return localize({months: Math.round(months)});
  }

  const toExactLevels = dateDiffMsDurationLevel('years');
  const rest = toExactLevels(msDuration);
  const ordered: (keyof Omit<ReturnType<typeof toExactLevels>, 'level'>)[] = [
    'years',
    'months',
    'weeks',
    'days',
    'hours',
    'minutes',
    'seconds',
    'ms',
  ];
  const level = ordered.find((key) => rest[key]);
  if (!level) {
    return localize({milliseconds: msDuration});
  }

  const value = diffLevelsToRoundedLevel(level)(rest);
  return localize({[diffLevelToFormatKey[level]]: value} as LocalizeFormatDurationValue);
};

/** shortcut for years..hours duration representation */
export const formatStyledDurationUpToHours = (style: LocalizeFormatDurationStyle) => (locale: string) =>
  compose(
    formatStyledLocalizedDuration(style)(locale),
    removeDateDiffLevels(['minutes', 'seconds', 'ms']),
    dateDiffMsDurationLevel('years'),
  );

/** shortcut for years..hours duration representation */
export const formatDigitalDurationUpToHours = formatStyledDurationUpToHours('digital');
/** shortcut for years..hours duration representation */
export const formatLongDurationUpToHours = formatStyledDurationUpToHours('long');
/** shortcut for years..hours duration representation */
export const formatNarrowDurationUpToHours = formatStyledDurationUpToHours('narrow');
/** shortcut for years..hours duration representation */
export const formatShortDurationUpToHours = formatStyledDurationUpToHours('short');
