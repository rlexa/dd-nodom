import {compose} from '../fp';
import {DateDiffLevel, msDay, msHour, msMinute, msMonths, msSecond, msWeek, msYears} from './const';
import {asTimeValue} from './date';

/** `left - right` */
export const dateDiffMs = (left: string | number | Date) => (right: string | number | Date) => asTimeValue(left) - asTimeValue(right);

const floorSigned = (val: number) => (val >= 0 ? Math.floor(val) : Math.ceil(val));
/** naive calculation of diff based on ms (no duration calculation with tz-summer/wintertime) */
export function dateDiffMsDurationLevel(level: 'years'): (msDiff: number) => {
  level: 'years';
  ms: number;
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  weeks: number;
  months: number;
  years: number;
};
export function dateDiffMsDurationLevel(level: 'months'): (msDiff: number) => {
  level: 'months';
  ms: number;
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  weeks: number;
  months: number;
};
export function dateDiffMsDurationLevel(level: 'weeks'): (msDiff: number) => {
  level: 'weeks';
  ms: number;
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  weeks: number;
};
export function dateDiffMsDurationLevel(
  level: 'days',
): (msDiff: number) => {level: 'days'; ms: number; seconds: number; minutes: number; hours: number; days: number};
export function dateDiffMsDurationLevel(
  level: 'hours',
): (msDiff: number) => {level: 'hours'; ms: number; seconds: number; minutes: number; hours: number};
export function dateDiffMsDurationLevel(
  level: 'minutes',
): (msDiff: number) => {level: 'minutes'; ms: number; seconds: number; minutes: number};
export function dateDiffMsDurationLevel(level: 'seconds'): (msDiff: number) => {level: 'seconds'; ms: number; seconds: number};
export function dateDiffMsDurationLevel(level: 'ms'): (msDiff: number) => {level: 'ms'; ms: number};
export function dateDiffMsDurationLevel(level: DateDiffLevel): (msDiff: number) => {
  level: DateDiffLevel;
  ms: number;
  seconds?: number;
  minutes?: number;
  hours?: number;
  days?: number;
  weeks?: number;
  months?: number;
  years?: number;
};
// eslint-disable-next-line max-lines-per-function
export function dateDiffMsDurationLevel(level: DateDiffLevel): (msDiff: number) => {
  level: DateDiffLevel;
  ms: number;
  seconds?: number;
  minutes?: number;
  hours?: number;
  days?: number;
  weeks?: number;
  months?: number;
  years?: number;
} {
  return (msDiff: number) => {
    switch (level) {
      case 'years': {
        const years = floorSigned(msDiff / msYears);
        const rest = dateDiffMsDurationLevel('months')(msDiff - years * msYears);
        return {...rest, level, years};
      }
      case 'months': {
        const months = floorSigned(msDiff / msMonths);
        const rest = dateDiffMsDurationLevel('weeks')(msDiff - months * msMonths);
        return {...rest, level, months};
      }
      case 'weeks': {
        const weeks = floorSigned(msDiff / msWeek);
        const rest = dateDiffMsDurationLevel('days')(msDiff - weeks * msWeek);
        return {...rest, level, weeks};
      }
      case 'days': {
        const days = floorSigned(msDiff / msDay);
        const rest = dateDiffMsDurationLevel('hours')(msDiff - days * msDay);
        return {...rest, level, days};
      }
      case 'hours': {
        const hours = floorSigned(msDiff / msHour);
        const rest = dateDiffMsDurationLevel('minutes')(msDiff - hours * msHour);
        return {...rest, level, hours};
      }
      case 'minutes': {
        const minutes = floorSigned(msDiff / msMinute);
        const rest = dateDiffMsDurationLevel('seconds')(msDiff - minutes * msMinute);
        return {...rest, level, minutes};
      }
      case 'seconds': {
        const seconds = floorSigned(msDiff / msSecond);
        const rest = dateDiffMsDurationLevel('ms')(msDiff - seconds * msSecond);
        return {...rest, level, seconds};
      }
      case 'ms':
      default:
        return {level: 'ms', ms: msDiff};
    }
  };
}

/**
 * ```
 * const durationsUpToHour = compose(
 *   removeDateDiffLevels(['minutes', 'seconds', 'ms']),
 *   dateDiffMsDurationLevel('years')
 * );
 * ```
 **/
export const removeDateDiffLevels =
  (levels: DateDiffLevel[]) =>
  <T>(val: T): T =>
    Object.fromEntries(Object.entries(val ?? {}).filter(([key]) => !levels.includes(key as DateDiffLevel))) as T;

export const dateDiffSeconds = (left: string | number | Date) =>
  compose((v) => v.seconds, dateDiffMsDurationLevel('seconds'), dateDiffMs(left));
export const dateDiffMinutes = (left: string | number | Date) =>
  compose((v) => v.minutes, dateDiffMsDurationLevel('minutes'), dateDiffMs(left));
export const dateDiffHours = (left: string | number | Date) => compose((v) => v.hours, dateDiffMsDurationLevel('hours'), dateDiffMs(left));
export const dateDiffDays = (left: string | number | Date) => compose((v) => v.days, dateDiffMsDurationLevel('days'), dateDiffMs(left));
export const dateDiffWeeks = (left: string | number | Date) => compose((v) => v.weeks, dateDiffMsDurationLevel('weeks'), dateDiffMs(left));
export const dateDiffMonths = (left: string | number | Date) =>
  compose((v) => v.months, dateDiffMsDurationLevel('months'), dateDiffMs(left));
export const dateDiffYears = (left: string | number | Date) => compose((v) => v.years, dateDiffMsDurationLevel('years'), dateDiffMs(left));
