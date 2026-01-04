import {arrayForInclude, arrayJoin} from '../array/util';
import {add, compose, flip, mult, not} from '../fp';
import {str, strPadLeftWithZero2, strPadLeftWithZero4} from '../str';
import {DateDiffLevel, dateZero, IsoWeekday, msDay, msHour, msMinute, msMonths, msSecond, msWeek, msYears, Weekday} from './const';

const joinDate = arrayJoin('-');
const joinDateTime = arrayJoin('T');
const joinTime = arrayJoin(':');
const joinIsoYearWeek = arrayJoin('-W');

export const isWeekendDay = arrayForInclude([Weekday.Saturday, Weekday.Sunday]);
export const isNotWeekendDay = compose(not, isWeekendDay);

/** Mo-Su: 1-7 **CAUTION** not standard JS `Date.getDay`, see {@link isWeekendDay} */
export const isIsoWeekendDay = arrayForInclude([IsoWeekday.Saturday, IsoWeekday.Sunday]);
/** Mo-Su: 1-7 **CAUTION** not standard JS `Date.getDay`, see {@link isNotWeekendDay} */
export const isNotIsoWeekendDay = compose(not, isIsoWeekendDay);

/** checks instance and additionally the actual time value */
export const isValidDate = (val: unknown): val is Date => val instanceof Date && !isNaN(val as never);

export const msToSeconds = (ms: number) => ms / msSecond;

/**
 * parses as `Date` instance
 *
 * **CAUTION**: stringified dates without timezone are created as if value came from local timezone
 * @example
 * ```
 *   // when e.g. in German timezone this leads to a different behavior than standard new Date()
 *   asDate('2000-01-01').toISOString();   // > '1999-12-31T23:00:00.000Z'
 *   new Date('2000-01-01').toISOString(); // > '2000-01-01T00:00:00.000Z'
 * ```
 **/
export function asDate(val: Date | string | number): Date;
export function asDate(val: null): null;
export function asDate(val: Date | string | number | null): Date | null;
export function asDate(val: Date | string | number | null): Date | null {
  if (val instanceof Date) {
    return val;
  }

  if (typeof val === 'number') {
    return new Date(val);
  }

  if (typeof val === 'string') {
    // !!! without 'T' new Date(val) creates it assuming "UTC" but we assume "local timezone"
    return new Date(val.includes('T') ? val : `${val}T00:00:00.000`);
  }

  return null;
}

export const asDateNonNull = (val: Exclude<Parameters<typeof asDate>[0], null>) => asDate(val);

export const dateIsUtcWeekWorkDay = (val: Date) => isNotWeekendDay(val.getUTCDay());
export const dateIsLocalWeekWorkDay = (val: Date) => isNotWeekendDay(val.getDay());

export const isUtcWeekWorkDay = compose(dateIsUtcWeekWorkDay, asDateNonNull);
export const isLocalWeekWorkDay = compose(dateIsLocalWeekWorkDay, asDateNonNull);

/** to UTC/ISO string */
export const dateToIso = (val: Date) => val.toISOString();

/** 1st of month: 1 */
export const dateToUtcDate = (val: Date) => val.getUTCDate();

/** 1st of month: "01" */
export const dateToUtcDateString = compose(strPadLeftWithZero2, str, dateToUtcDate);

/** 1st of month: 1 */
export const dateToLocalDate = (val: Date) => val.getDate();

/** 1st of month: "01" */
export const dateToLocalDateString = compose(strPadLeftWithZero2, str, dateToLocalDate);

/** Jan-Feb: 1-12 */
export const dateToUtcMonth = (val: Date) => val.getUTCMonth() + 1;

/** Jan: "01" */
export const dateToUtcMonthString = compose(strPadLeftWithZero2, str, dateToUtcMonth);

/** Jan-Feb: 1-12 */
export const dateToLocalMonth = (val: Date) => val.getMonth() + 1;

/** Jan: "01" */
export const dateToLocalMonthString = compose(strPadLeftWithZero2, str, dateToLocalMonth);

export const dateToUtcYear = (val: Date) => val.getUTCFullYear();

/** year 920: "0920" */
export const dateToUtcYearString = compose(strPadLeftWithZero4, str, dateToUtcYear);

export const dateToLocalYear = (val: Date) => val.getFullYear();

/** year 920: "0920" */
export const dateToLocalYearString = compose(strPadLeftWithZero4, str, dateToLocalYear);

/** yyyy-mm-dd */
export const dateToUtcDatePart = (val: Date) => joinDate([dateToUtcYearString(val), dateToUtcMonthString(val), dateToUtcDateString(val)]);

/**
 * `yyyy-mm-dd`
 *
 * Note that this format is suited for string comparison, e.g. `dateToLocalDatePart(date1) > dateToLocalDatePart(date2)`
 * tests if `date1` is later than `date2`.
 */
export const dateToLocalDatePart = (val: Date) =>
  joinDate([dateToLocalYearString(val), dateToLocalMonthString(val), dateToLocalDateString(val)]);

export const dateToUtcHours = (val: Date) => val.getUTCHours();

/** 5 AM: "05" */
export const dateToUtcHoursString = compose(strPadLeftWithZero2, str, dateToUtcHours);

export const dateToLocalHours = (val: Date) => val.getHours();

/** 5 AM: "05" */
export const dateToLocalHoursString = compose(strPadLeftWithZero2, str, dateToLocalHours);

export const dateToUtcMinutes = (val: Date) => val.getUTCMinutes();

/** 00:05: "05" */
export const dateToUtcMinutesString = compose(strPadLeftWithZero2, str, dateToUtcMinutes);

export const dateToLocalMinutes = (val: Date) => val.getMinutes();

/** 00:05: "05" */
export const dateToLocalMinutesString = compose(strPadLeftWithZero2, str, dateToLocalMinutes);

export const dateToUtcSeconds = (val: Date) => val.getUTCSeconds();

/** 00:00:05: "05" */
export const dateToUtcSecondsString = compose(strPadLeftWithZero2, str, dateToUtcSeconds);

export const dateToLocalSeconds = (val: Date) => val.getSeconds();

/** 00:00:05: "05" */
export const dateToLocalSecondsString = compose(strPadLeftWithZero2, str, dateToLocalSeconds);

/** hh:mm */
export const dateToUtcHhMmPart = (val: Date) => joinTime([dateToUtcHoursString(val), dateToUtcMinutesString(val)]);

/** hh:mm */
export const dateToLocalHhMmPart = (val: Date) => joinTime([dateToLocalHoursString(val), dateToLocalMinutesString(val)]);

/** hh:mm:ss */
export const dateToUtcTimePart = (val: Date) => joinTime([dateToUtcHhMmPart(val), dateToUtcSeconds(val)]);

/** hh:mm:ss */
export const dateToLocalTimePart = (val: Date) => joinTime([dateToLocalHhMmPart(val), dateToLocalSeconds(val)]);

/** yyyy-mm-ddThh:mm:ss */
export const dateToUtcDateTime = (val: Date) => joinDateTime([dateToUtcDatePart(val), dateToUtcTimePart(val)]);

/** yyyy-mm-ddThh:mm:ss */
export const dateToLocalDateTime = (val: Date) => joinDateTime([dateToLocalDatePart(val), dateToLocalTimePart(val)]);

/** date as javascript milliseconds value */
export const dateToValue = (val: Date) => val.getTime();

/** date-like as javascript milliseconds value */
export const asTimeValue = compose(dateToValue, asDateNonNull);

/** cuts out the yyyy-mm-dd part */
export const isoToDatePart = (val: string) => val.substring(0, 'yyyy-mm-dd'.length);

/** cuts out the hh:mm part */
export const isoToHhMmPart = (val: string) => val.substring('yyyy-mm-ddT'.length, 'yyyy-mm-ddThh:mm'.length);

export const addMs = (ms: number) => compose(asDateNonNull, add(ms), asTimeValue);
export const addSeconds = compose(addMs, mult(msSecond));
export const addMinutes = compose(addMs, mult(msMinute));
export const addHours = compose(addMs, mult(msHour));

export const addUtcDays = (days: number) => (val: Date) => {
  const newDate = dateCopy(val);
  newDate.setUTCDate(newDate.getUTCDate() + days);
  return newDate;
};

export const addDays = (days: number) => (val: Date) => {
  const newDate = dateCopy(val);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};

export const addWeeks = compose(addDays, mult(7));
export const addUtcWeeks = compose(addUtcDays, mult(7));

export const addUtcMonths = (months: number) => (val: Date) => {
  const newDate = dateCopy(val);
  newDate.setUTCMonth(newDate.getUTCMonth() + months);
  return newDate;
};

export const addLocalMonths = (months: number) => (val: Date) => {
  const newDate = dateCopy(val);
  newDate.setMonth(newDate.getMonth() + months);
  return newDate;
};

export const addUtcYears = (years: number) => (val: Date) => {
  const newDate = dateCopy(val);
  newDate.setUTCFullYear(newDate.getUTCFullYear() + years);
  return newDate;
};

export const addLocalYears = (years: number) => (val: Date) => {
  const newDate = dateCopy(val);
  newDate.setFullYear(newDate.getFullYear() + years);
  return newDate;
};

export function dateStartOfUtcSecond(val: Date) {
  const date = dateCopy(val);
  date.setUTCMilliseconds(0);
  return date;
}

export function dateStartOfLocalSecond(val: Date) {
  const date = dateCopy(val);
  date.setMilliseconds(0);
  return date;
}

export function dateStartOfUtcMinute(val: Date) {
  const date = dateCopy(val);
  date.setUTCSeconds(0, 0);
  return date;
}

export function dateStartOfLocalMinute(val: Date) {
  const date = dateCopy(val);
  date.setSeconds(0, 0);
  return date;
}

export function dateStartOfUtcHour(val: Date) {
  const date = dateCopy(val);
  date.setUTCMinutes(0, 0, 0);
  return date;
}

export function dateStartOfLocalHour(val: Date) {
  const date = dateCopy(val);
  date.setMinutes(0, 0, 0);
  return date;
}

export function dateStartOfUtcDay(val: Date) {
  const date = dateCopy(val);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

export function dateStartOfLocalDay(val: Date) {
  const date = dateCopy(val);
  date.setHours(0, 0, 0, 0);
  return date;
}

/** week starts with Sunday (0) */
export function dateStartOfUtcWeek(val: Date) {
  const date = addDays(val.getUTCDay() ? Weekday.Sunday - val.getUTCDay() : 0)(val);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

/** week starts with Sunday (0) */
export function dateStartOfLocalWeek(val: Date) {
  const date = addDays(val.getDay() ? Weekday.Sunday - val.getDay() : 0)(val);
  date.setHours(0, 0, 0, 0);
  return date;
}

/** week starts with Monday (1) */
export function dateStartOfUtcWorkWeek(val: Date) {
  const date = addDays(val.getUTCDay() ? Weekday.Monday - val.getUTCDay() : -6)(val);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

/** week starts with Monday (1) */
export function dateStartOfLocalWorkWeek(val: Date) {
  const date = addDays(val.getDay() ? Weekday.Monday - val.getDay() : -6)(val);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function dateStartOfUtcMonth(val: Date) {
  const date = dateCopy(val);
  date.setUTCDate(1);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

export function dateStartOfLocalMonth(val: Date) {
  const date = dateCopy(val);
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function dateStartOfUtcQuarter(val: Date) {
  const date = dateCopy(val);
  date.setUTCMonth(Math.floor(date.getUTCMonth() / 3) * 3, 1);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

export function dateStartOfLocalQuarter(val: Date) {
  const date = dateCopy(val);
  date.setMonth(Math.floor(date.getMonth() / 3) * 3, 1);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function dateStartOfUtcHalfYear(val: Date) {
  const date = dateCopy(val);
  date.setUTCMonth(Math.floor(date.getUTCMonth() / 6) * 6, 1);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

export function dateStartOfLocalHalfYear(val: Date) {
  const date = dateCopy(val);
  date.setMonth(Math.floor(date.getMonth() / 6) * 6, 1);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function dateStartOfUtcYear(val: Date) {
  const date = dateCopy(val);
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

export function dateStartOfLocalYear(val: Date) {
  const date = dateCopy(val);
  date.setMonth(0, 1);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function dateToLocalIsoYearWeek(val: Date): [year: number, week: number] {
  const date = new Date(val.getTime());

  const diffToMonday = (date.getDay() + 6) % 7;
  // goto Thursday
  date.setDate(date.getDate() - diffToMonday + 3);
  // try to prevent possible summer/winter time issues
  date.setHours(12, 0, 0, 0);
  const msThursday = date.getTime();
  // goto 1st January
  date.setMonth(0, 1);
  // goto first Thursday of the year (which is definition of first iso week)
  if (date.getDay() !== Weekday.Thursday.valueOf()) {
    date.setMonth(0, 1 + ((Weekday.Thursday - date.getDay() + 7) % 7));
  }

  const week = 1 + Math.ceil((msThursday - date.getTime()) / msWeek);
  const year = week >= 52 && val.getMonth() < 1 ? val.getFullYear() - 1 : val.getFullYear();

  return [year, week];
}
export const dateToLocalIsoWeek = (val: Date) => dateToLocalIsoYearWeek(val)[1];
export const dateToLocalIsoYear = (val: Date) => dateToLocalIsoYearWeek(val)[0];

/** `2000-W01` ISO format */
export function dateToLocalIsoWeekString(val: Date) {
  const yearWeek = dateToLocalIsoYearWeek(val);
  return joinIsoYearWeek([strPadLeftWithZero4(String(yearWeek[0])), strPadLeftWithZero2(String(yearWeek[1]))]);
}

/** Moves the `reference` point Date to start of `week` ISO week number. */
export const dateMoveToStartOfLocalIsoWeek = (reference: Date) => (week: number) =>
  dateStartOfLocalWorkWeek(addWeeks(week - dateToLocalIsoWeek(reference))(reference));

export const dateStartOfLocalIsoYearWeek = (isoYearWeek: [year: number, week: number]) =>
  dateMoveToStartOfLocalIsoWeek(asDate(`${isoYearWeek[0]}-01-15`))(isoYearWeek[1]);

export const dateToLocalWeekday = (val: Date) => val.getDay();
export const dateToUtcWeekday = (val: Date) => val.getUTCDay();

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

export const dateDurationMs = compose(flip(dateDiffMs)(dateZero), asDateNonNull);
export const dateDurationLevel = (level: DateDiffLevel) => compose(dateDiffMsDurationLevel(level), dateDurationMs);
export const dateDurationSeconds = compose(flip(dateDiffSeconds)(dateZero), asDateNonNull);
export const dateDurationMinutes = compose(flip(dateDiffMinutes)(dateZero), asDateNonNull);
export const dateDurationHours = compose(flip(dateDiffHours)(dateZero), asDateNonNull);
export const dateDurationDays = compose(flip(dateDiffDays)(dateZero), asDateNonNull);
export const dateDurationWeeks = compose(flip(dateDiffWeeks)(dateZero), asDateNonNull);
export const dateDurationMonths = compose(flip(dateDiffMonths)(dateZero), asDateNonNull);
export const dateDurationYears = compose(flip(dateDiffYears)(dateZero), asDateNonNull);

/** Mo-Su: 1-7 **CAUTION** not standard JS `Date.getDay`, see {@link dateToLocalWeekday} */
export const dateToLocalIsoWeekday = (val: Date) => (val.getDay() === 0 ? 7 : val.getDay());
/** Mo-Su: 1-7 **CAUTION** not standard JS `Date.getDay`, see {@link dateToUtcWeekday} */
export const dateToUtcIsoWeekday = (val: Date) => (val.getUTCDay() === 0 ? 7 : val.getUTCDay());

/** Mo-Su: 1-7 **CAUTION** not standard JS `Date.getDay`, see {@link dateIsUtcWeekWorkDay} */
export const dateIsUtcIsoWeekWorkDay = (val: Date) => isNotIsoWeekendDay(dateToUtcIsoWeekday(val) as IsoWeekday);

/** Mo-Su: 1-7 **CAUTION** not standard JS `Date.getDay`, see {@link dateIsLocalWeekWorkDay} */
export const dateIsLocalIsoWeekWorkDay = (val: Date) => isNotIsoWeekendDay(dateToLocalIsoWeekday(val) as IsoWeekday);

/** Mo-Su: 1-7 **CAUTION** not standard JS `Date.getDay`, see {@link isUtcWeekWorkDay} */
export const isUtcIsoWeekWorkDay = compose(dateIsUtcIsoWeekWorkDay, asDateNonNull);
/** Mo-Su: 1-7 **CAUTION** not standard JS `Date.getDay`, see {@link isLocalWeekWorkDay} */
export const isLocalIsoWeekWorkDay = compose(dateIsLocalIsoWeekWorkDay, asDateNonNull);

export const dateEndOfUtcSecond = compose(addMs(-1), addSeconds(1), dateStartOfUtcSecond);
export const dateEndOfUtcMinute = compose(addMs(-1), addMinutes(1), dateStartOfUtcMinute);
export const dateEndOfUtcHour = compose(addMs(-1), addHours(1), dateStartOfUtcHour);
export const dateEndOfUtcDay = compose(addMs(-1), addDays(1), dateStartOfUtcDay);
export const dateEndOfUtcWeek = compose(addMs(-1), addWeeks(1), dateStartOfUtcWeek);
export const dateEndOfUtcWorkWeek = compose(addMs(-1), addWeeks(1), dateStartOfUtcWorkWeek);
export const dateEndOfUtcMonth = compose(addMs(-1), addUtcMonths(1), dateStartOfUtcMonth);
export const dateEndOfUtcQuarter = compose(addMs(-1), addUtcMonths(3), dateStartOfUtcQuarter);
export const dateEndOfUtcHalfYear = compose(addMs(-1), addUtcMonths(6), dateStartOfUtcHalfYear);
export const dateEndOfUtcYear = compose(addMs(-1), addUtcYears(1), dateStartOfUtcYear);

export const dateEndOfLocalSecond = compose(addMs(-1), addSeconds(1), dateStartOfLocalSecond);
export const dateEndOfLocalMinute = compose(addMs(-1), addMinutes(1), dateStartOfLocalMinute);
export const dateEndOfLocalHour = compose(addMs(-1), addHours(1), dateStartOfLocalHour);
export const dateEndOfLocalDay = compose(addMs(-1), addDays(1), dateStartOfLocalDay);
export const dateEndOfLocalWeek = compose(addMs(-1), addWeeks(1), dateStartOfLocalWeek);
export const dateEndOfLocalWorkWeek = compose(addMs(-1), addWeeks(1), dateStartOfLocalWorkWeek);
export const dateEndOfLocalMonth = compose(addMs(-1), addLocalMonths(1), dateStartOfLocalMonth);
export const dateEndOfLocalQuarter = compose(addMs(-1), addLocalMonths(3), dateStartOfLocalQuarter);
export const dateEndOfLocalHalfYear = compose(addMs(-1), addLocalMonths(6), dateStartOfLocalHalfYear);
export const dateEndOfLocalYear = compose(addMs(-1), addLocalYears(1), dateStartOfLocalYear);

export const dateCopy = compose(asDateNonNull, asTimeValue);
export const asIsoString = compose(dateToIso, asDateNonNull);
export const asIsoDatePart = compose(isoToDatePart, asIsoString);

export const asUtcDatePart = compose(dateToUtcDatePart, asDateNonNull);
export const asUtcDateTime = compose(dateToUtcDateTime, asDateNonNull);
export const asUtcHhMmPart = compose(dateToUtcHhMmPart, asDateNonNull);
export const asUtcTimePart = compose(dateToUtcTimePart, asDateNonNull);

export const asLocalDatePart = compose(dateToLocalDatePart, asDateNonNull);
export const asLocalDateTime = compose(dateToLocalDateTime, asDateNonNull);
export const asLocalHhMmPart = compose(dateToLocalHhMmPart, asDateNonNull);
export const asLocalTimePart = compose(dateToLocalTimePart, asDateNonNull);

export const asLocalWeekday = compose(dateToLocalWeekday, asDateNonNull);
export const asUtcWeekday = compose(dateToUtcWeekday, asDateNonNull);

export const asLocalIsoYearWeek = compose(dateToLocalIsoYearWeek, asDateNonNull);
export const asLocalIsoWeek = compose(dateToLocalIsoWeek, asDateNonNull);
export const asLocalIsoYear = compose(dateToLocalIsoYear, asDateNonNull);
/** `2000-W01` ISO format */
export const asLocalIsoWeekString = compose(dateToLocalIsoWeekString, asDateNonNull);

/** Mo-Su: 1-7 **CAUTION** not standard JS `Date.getDay`, see {@link asLocalWeekday} */
export const asLocalIsoWeekday = compose(dateToLocalIsoWeekday, asDateNonNull);
/** Mo-Su: 1-7 **CAUTION** not standard JS `Date.getDay`, see {@link asUtcWeekday} */
export const asUtcIsoWeekday = compose(dateToUtcIsoWeekday, asDateNonNull);
