import {compose} from '../fp';
import {Weekday} from './const';
import {
  addDays,
  addHours,
  addLocalMonths,
  addLocalYears,
  addMinutes,
  addMs,
  addSeconds,
  addUtcMonths,
  addUtcYears,
  addWeeks,
} from './mutate';
import {dateCopy} from './parse';

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
