import {arrayJoin} from '../array/util';
import {add, compose, mult} from '../fp';
import {msHour, msMinute, msSecond, Weekday} from './const';
import {dateToLocalDayDateString, dateToUtcDayDateString} from './day';
import {dateToLocalHoursString, dateToUtcHoursString} from './hour';
import {dateToLocalMinutesString, dateToUtcMinutesString} from './minute';
import {dateToLocalMonthString, dateToUtcMonthString} from './month';
import {asDateNonNull, dateCopy} from './parse';
import {dateToLocalSeconds, dateToUtcSeconds} from './second';
import {dateToLocalYearString, dateToUtcYearString} from './year';

const joinDate = arrayJoin('-');
const joinDateTime = arrayJoin('T');
const joinTime = arrayJoin(':');

/** @returns ISO format `"2000-01-01T00:00:00.000Z"` */
export const dateToIso = (val: Date) => val.toISOString();
/** @returns ISO format `"2000-01-01T00:00:00.000Z"` */
export const asIso = compose(dateToIso, asDateNonNull);

/** @returns date javascript milliseconds value */
export const dateToTimeValue = (val: Date) => val.getTime();
/** @returns date javascript milliseconds value */
export const asTimeValue = compose(dateToTimeValue, asDateNonNull);

/** @returns `"yyyy-mm-dd"` */
export const dateToLocalDatePart = (val: Date) =>
  joinDate([dateToLocalYearString(val), dateToLocalMonthString(val), dateToLocalDayDateString(val)]);
/** @returns `"yyyy-mm-dd"` */
export const asLocalDatePart = compose(dateToLocalDatePart, asDateNonNull);

/** @returns `"yyyy-mm-dd"` */
export const dateToUtcDatePart = (val: Date) =>
  joinDate([dateToUtcYearString(val), dateToUtcMonthString(val), dateToUtcDayDateString(val)]);
/** @returns `"yyyy-mm-dd"` */
export const asUtcDatePart = compose(dateToUtcDatePart, asDateNonNull);

/** @returns `"hh:mm"` */
export const dateToLocalHhMmPart = (val: Date) => joinTime([dateToLocalHoursString(val), dateToLocalMinutesString(val)]);
/** @returns `"hh:mm"` */
export const asLocalHhMmPart = compose(dateToLocalHhMmPart, asDateNonNull);

/** @returns `"hh:mm"` */
export const dateToUtcHhMmPart = (val: Date) => joinTime([dateToUtcHoursString(val), dateToUtcMinutesString(val)]);
/** @returns `"hh:mm"` */
export const asUtcHhMmPart = compose(dateToUtcHhMmPart, asDateNonNull);

/** @returns `"hh:mm:ss"` */
export const dateToLocalTimePart = (val: Date) => joinTime([dateToLocalHhMmPart(val), dateToLocalSeconds(val)]);
/** @returns `"hh:mm:ss"` */
export const asLocalTimePart = compose(dateToLocalTimePart, asDateNonNull);

/** @returns `"hh:mm:ss"` */
export const dateToUtcTimePart = (val: Date) => joinTime([dateToUtcHhMmPart(val), dateToUtcSeconds(val)]);
/** @returns `"hh:mm:ss"` */
export const asUtcTimePart = compose(dateToUtcTimePart, asDateNonNull);

/** @return `"yyyy-mm-ddThh:mm:ss"` */
export const dateToLocalDateTime = (val: Date) => joinDateTime([dateToLocalDatePart(val), dateToLocalTimePart(val)]);
/** @return `"yyyy-mm-ddThh:mm:ss"` */
export const asLocalDateTime = compose(dateToLocalDateTime, asDateNonNull);

/** @return `"yyyy-mm-ddThh:mm:ss"` */
export const dateToUtcDateTime = (val: Date) => joinDateTime([dateToUtcDatePart(val), dateToUtcTimePart(val)]);
/** @return `"yyyy-mm-ddThh:mm:ss"` */
export const asUtcDateTime = compose(dateToUtcDateTime, asDateNonNull);

/** @return `"yyyy-mm-dd"` part of ISO string */
export const isoToDatePart = (val: string) => val.substring(0, 'yyyy-mm-dd'.length);
/** @return `"yyyy-mm-dd"` part of ISO */
export const dateToIsoDatePart = compose(isoToDatePart, dateToIso);
/** @return `"yyyy-mm-dd"` part of ISO */
export const asIsoDatePart = compose(dateToIsoDatePart, asDateNonNull);

/** @return `"hh:mm"` part of ISO string */
export const isoToHhMmPart = (val: string) => val.substring('yyyy-mm-ddT'.length, 'yyyy-mm-ddThh:mm'.length);
/** @return `"hh:mm"` part of ISO string */
export const dateToIsoToHhMmPart = compose(isoToHhMmPart, dateToIso);
/** @return `"hh:mm"` part of ISO string */
export const asIsoHhMmPart = compose(dateToIsoToHhMmPart, asDateNonNull);

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

/** Mo-Su: 1-7 **CAUTION** not standard JS `Date.getDay`, see {@link asLocalWeekday} */
export const asLocalIsoWeekday = compose(dateToLocalIsoWeekday, asDateNonNull);
/** Mo-Su: 1-7 **CAUTION** not standard JS `Date.getDay`, see {@link asUtcWeekday} */
export const asUtcIsoWeekday = compose(dateToUtcIsoWeekday, asDateNonNull);
