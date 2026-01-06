import {arrayForInclude, arrayJoin} from '../array/util';
import {add, compose, mult, not} from '../fp';
import {strPadLeftWithZero2, strPadLeftWithZero4} from '../str';
import {IsoWeekday, msHour, msMinute, msSecond, Weekday} from './const';
import {dateToLocalDayDateString, dateToUtcDayDateString} from './day';
import {asDateNonNull, dateCopy} from './parse';

const joinDate = arrayJoin('-');
const joinDateTime = arrayJoin('T');
const joinTime = arrayJoin(':');

/** @returns ISO format `"2000-01-01T00:00:00.000Z"` */
export const dateToIso = (val: Date) => val.toISOString();
/** @returns ISO format `"2000-01-01T00:00:00.000Z"` */
export const asIso = compose(dateToIso, asDateNonNull);

/** Mo-Su: 1-7 **CAUTION** not standard JS `Date.getDay`, for that see {@link isWeekendDay} */
export const isIsoWeekendDay = arrayForInclude([IsoWeekday.Saturday, IsoWeekday.Sunday]);
/** Mo-Su: 1-7 **CAUTION** not standard JS `Date.getDay`, for that see {@link isWeekWorkDay} */
export const isNotIsoWeekendDay = compose(not, isIsoWeekendDay);

/** Jan-Feb: 1-12 */
export const dateToUtcMonth = (val: Date) => val.getUTCMonth() + 1;

/** Jan: "01" */
export const dateToUtcMonthString = compose(strPadLeftWithZero2, dateToUtcMonth);

/** Jan-Feb: 1-12 */
export const dateToLocalMonth = (val: Date) => val.getMonth() + 1;

/** Jan: "01" */
export const dateToLocalMonthString = compose(strPadLeftWithZero2, dateToLocalMonth);

export const dateToUtcYear = (val: Date) => val.getUTCFullYear();

/** year 920: "0920" */
export const dateToUtcYearString = compose(strPadLeftWithZero4, dateToUtcYear);

export const dateToLocalYear = (val: Date) => val.getFullYear();

/** year 920: "0920" */
export const dateToLocalYearString = compose(strPadLeftWithZero4, dateToLocalYear);

/** yyyy-mm-dd */
export const dateToUtcDatePart = (val: Date) =>
  joinDate([dateToUtcYearString(val), dateToUtcMonthString(val), dateToUtcDayDateString(val)]);

/**
 * `yyyy-mm-dd`
 *
 * Note that this format is suited for string comparison, e.g. `dateToLocalDatePart(date1) > dateToLocalDatePart(date2)`
 * tests if `date1` is later than `date2`.
 */
export const dateToLocalDatePart = (val: Date) =>
  joinDate([dateToLocalYearString(val), dateToLocalMonthString(val), dateToLocalDayDateString(val)]);

export const dateToUtcHours = (val: Date) => val.getUTCHours();

/** 5 AM: "05" */
export const dateToUtcHoursString = compose(strPadLeftWithZero2, dateToUtcHours);

export const dateToLocalHours = (val: Date) => val.getHours();

/** 5 AM: "05" */
export const dateToLocalHoursString = compose(strPadLeftWithZero2, dateToLocalHours);

export const dateToUtcMinutes = (val: Date) => val.getUTCMinutes();

/** 00:05: "05" */
export const dateToUtcMinutesString = compose(strPadLeftWithZero2, dateToUtcMinutes);

export const dateToLocalMinutes = (val: Date) => val.getMinutes();

/** 00:05: "05" */
export const dateToLocalMinutesString = compose(strPadLeftWithZero2, dateToLocalMinutes);

export const dateToUtcSeconds = (val: Date) => val.getUTCSeconds();

/** 00:00:05: "05" */
export const dateToUtcSecondsString = compose(strPadLeftWithZero2, dateToUtcSeconds);

export const dateToLocalSeconds = (val: Date) => val.getSeconds();

/** 00:00:05: "05" */
export const dateToLocalSecondsString = compose(strPadLeftWithZero2, dateToLocalSeconds);

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

export const asIsoDatePart = compose(isoToDatePart, asIso);

export const asUtcDatePart = compose(dateToUtcDatePart, asDateNonNull);
export const asUtcDateTime = compose(dateToUtcDateTime, asDateNonNull);
export const asUtcHhMmPart = compose(dateToUtcHhMmPart, asDateNonNull);
export const asUtcTimePart = compose(dateToUtcTimePart, asDateNonNull);

export const asLocalDatePart = compose(dateToLocalDatePart, asDateNonNull);
export const asLocalDateTime = compose(dateToLocalDateTime, asDateNonNull);
export const asLocalHhMmPart = compose(dateToLocalHhMmPart, asDateNonNull);
export const asLocalTimePart = compose(dateToLocalTimePart, asDateNonNull);

/** Mo-Su: 1-7 **CAUTION** not standard JS `Date.getDay`, see {@link asLocalWeekday} */
export const asLocalIsoWeekday = compose(dateToLocalIsoWeekday, asDateNonNull);
/** Mo-Su: 1-7 **CAUTION** not standard JS `Date.getDay`, see {@link asUtcWeekday} */
export const asUtcIsoWeekday = compose(dateToUtcIsoWeekday, asDateNonNull);
