import {compose} from '../fp/compose';
import {add, mult} from '../fp/math';
import {msDay, msHour, msMinute, msSecond, Weekday} from './const';
import {asTimeValue} from './ms';
import {asDateNonNull, dateCopy} from './parse';

// #region mutate

export const dateMutate = (fn: (date: Date) => void) => (val: Date) => {
  const newDate = dateCopy(val);
  fn(newDate);
  return newDate;
};

// #endregion

// #region add

/** `addMs(ms)(date)`, immutable, **CAUTION** adds as ms value (see {@link addLocalMs}, {@link addUtcMs}) */
export const addMs = (ms: number) => compose(asDateNonNull, add(ms), asTimeValue);
/** `addLocalMs(ms)(date)`, immutable, **CAUTION** adds semantically (see {@link addMs}) */
export const addLocalMs = (ms: number) => dateMutate((date) => date.setMilliseconds(date.getMilliseconds() + ms));
/** `addUtcMs(ms)(date)`, immutable, **CAUTION** adds semantically (see {@link addMs}) */
export const addUtcMs = (ms: number) => dateMutate((date) => date.setUTCMilliseconds(date.getUTCMilliseconds() + ms));

/** `addSeconds(seconds)(date)`, immutable, **CAUTION** adds as ms value (see {@link addLocalSeconds}, {@link addUtcSeconds}) */
export const addSeconds = compose(addMs, mult(msSecond));
/** `addLocalSeconds(seconds)(date)`, immutable, **CAUTION** adds semantically (see {@link addSeconds}) */
export const addLocalSeconds = (seconds: number) => dateMutate((date) => date.setSeconds(date.getSeconds() + seconds));
/** `addUtcSeconds(seconds)(date)`, immutable, **CAUTION** adds semantically (see {@link addSeconds}) */
export const addUtcSeconds = (seconds: number) => dateMutate((date) => date.setUTCSeconds(date.getUTCSeconds() + seconds));

/** `addMinutes(minutes)(date)`, immutable, **CAUTION** adds as ms value (see {@link addLocalMinutes}, {@link addUtcMinutes}) */
export const addMinutes = compose(addMs, mult(msMinute));
/** `addLocalMinutes(minutes)(date)`, immutable, **CAUTION** adds semantically (see {@link addMinutes}) */
export const addLocalMinutes = (minutes: number) => dateMutate((date) => date.setMinutes(date.getMinutes() + minutes));
/** `addUtcMinutes(minutes)(date)`, immutable, **CAUTION** adds semantically (see {@link addMinutes}) */
export const addUtcMinutes = (minutes: number) => dateMutate((date) => date.setUTCMinutes(date.getUTCMinutes() + minutes));

/** `addHours(hours)(date)`, immutable, **CAUTION** adds as ms value (see {@link addLocalHours}, {@link addUtcHours}) */
export const addHours = compose(addMs, mult(msHour));
/** `addLocalHours(hours)(date)`, immutable, **CAUTION** adds semantically (see {@link addHours}) */
export const addLocalHours = (hours: number) => dateMutate((date) => date.setHours(date.getHours() + hours));
/** `addUtcHours(hours)(date)`, immutable, **CAUTION** adds semantically (see {@link addHours}) */
export const addUtcHours = (hours: number) => dateMutate((date) => date.setUTCHours(date.getUTCHours() + hours));

/** `addDays(days)(date)`, immutable, **CAUTION** adds as ms value (see {@link addLocalDays}, {@link addUtcDays}) */
export const addDays = compose(addMs, mult(msDay));
/** `addLocalDays(days)(date)`, immutable, **CAUTION** adds semantically (see {@link addDays}) */
export const addLocalDays = (days: number) => dateMutate((date) => date.setDate(date.getDate() + days));
/** `addUtcDays(days)(date)`, immutable, **CAUTION** adds semantically (see {@link addDays}) */
export const addUtcDays = (days: number) => dateMutate((date) => date.setUTCDate(date.getUTCDate() + days));

/** `addWeeks(weeks)(date)`, immutable, **CAUTION** adds as ms value (see {@link addLocalWeeks}, {@link addUtcWeeks}) */
export const addWeeks = compose(addDays, mult(7));
/** `addLocalWeeks(weeks)(date)`, immutable, **CAUTION** adds semantically (see {@link addWeeks}) */
export const addLocalWeeks = compose(addLocalDays, mult(7));
/** `addUtcWeeks(weeks)(date)`, immutable, **CAUTION** adds semantically (see {@link addWeeks}) */
export const addUtcWeeks = compose(addUtcDays, mult(7));

/** `addLocalMonths(months)(date)`, immutable, **CAUTION** adds semantically */
export const addLocalMonths = (months: number) => dateMutate((date) => date.setMonth(date.getMonth() + months));
/** `addUtcMonths(months)(date)`, immutable, **CAUTION** adds semantically */
export const addUtcMonths = (months: number) => dateMutate((date) => date.setUTCMonth(date.getUTCMonth() + months));

/** `addLocalYears(years)(date)`, immutable, **CAUTION** adds semantically */
export const addLocalYears = (years: number) => dateMutate((date) => date.setFullYear(date.getFullYear() + years));
/** `addUtcYears(years)(date)`, immutable, **CAUTION** adds semantically */
export const addUtcYears = (years: number) => dateMutate((date) => date.setUTCFullYear(date.getUTCFullYear() + years));

// #endregion

// #region move

export const dateMoveToStartOfLocalSecond = dateMutate((date) => date.setMilliseconds(0));
export const dateMoveToStartOfUtcSecond = dateMutate((date) => date.setUTCMilliseconds(0));

export const dateMoveToStartOfLocalMinute = dateMutate((date) => date.setSeconds(0, 0));
export const dateMoveToStartOfUtcMinute = dateMutate((date) => date.setUTCSeconds(0, 0));

export const dateMoveToStartOfLocalHour = dateMutate((date) => date.setMinutes(0, 0, 0));
export const dateMoveToStartOfUtcHour = dateMutate((date) => date.setUTCMinutes(0, 0, 0));

export const dateMoveToStartOfLocalDay = dateMutate((date) => date.setHours(0, 0, 0, 0));
export const dateMoveToStartOfUtcDay = dateMutate((date) => date.setUTCHours(0, 0, 0, 0));

/** week starts with Sunday (0) */
export function dateMoveToStartOfLocalWeek(val: Date) {
  const date = addLocalDays(val.getDay() ? Weekday.Sunday - val.getDay() : 0)(val);
  date.setHours(0, 0, 0, 0);
  return date;
}
/** week starts with Sunday (0) */
export function dateMoveToStartOfUtcWeek(val: Date) {
  const date = addUtcDays(val.getUTCDay() ? Weekday.Sunday - val.getUTCDay() : 0)(val);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

/** week starts with Monday (1) */
export function dateMoveToStartOfLocalWorkWeek(val: Date) {
  const date = addLocalDays(val.getDay() ? Weekday.Monday - val.getDay() : -6)(val);
  date.setHours(0, 0, 0, 0);
  return date;
}
/** week starts with Monday (1) */
export function dateMoveToStartOfUtcWorkWeek(val: Date) {
  const date = addUtcDays(val.getUTCDay() ? Weekday.Monday - val.getUTCDay() : -6)(val);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

export const dateMoveToStartOfLocalMonth = dateMutate((date) => {
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
});
export const dateMoveToStartOfUtcMonth = dateMutate((date) => {
  date.setUTCDate(1);
  date.setUTCHours(0, 0, 0, 0);
});

export const dateMoveToStartOfLocalQuarter = dateMutate((date) => {
  date.setMonth(Math.floor(date.getMonth() / 3) * 3, 1);
  date.setHours(0, 0, 0, 0);
});
export const dateMoveToStartOfUtcQuarter = dateMutate((date) => {
  date.setUTCMonth(Math.floor(date.getUTCMonth() / 3) * 3, 1);
  date.setUTCHours(0, 0, 0, 0);
});

export const dateMoveToStartOfLocalHalfYear = dateMutate((date) => {
  date.setMonth(Math.floor(date.getMonth() / 6) * 6, 1);
  date.setHours(0, 0, 0, 0);
});
export const dateMoveToStartOfUtcHalfYear = dateMutate((date) => {
  date.setUTCMonth(Math.floor(date.getUTCMonth() / 6) * 6, 1);
  date.setUTCHours(0, 0, 0, 0);
});

export const dateMoveToStartOfLocalYear = dateMutate((date) => {
  date.setMonth(0, 1);
  date.setHours(0, 0, 0, 0);
});
export const dateMoveToStartOfUtcYear = dateMutate((date) => {
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
});

export const dateMoveToEndOfLocalSecond = compose(addLocalMs(-1), addLocalSeconds(1), dateMoveToStartOfLocalSecond);
export const dateMoveToEndOfLocalMinute = compose(addLocalMs(-1), addLocalMinutes(1), dateMoveToStartOfLocalMinute);
export const dateMoveToEndOfLocalHour = compose(addLocalMs(-1), addLocalHours(1), dateMoveToStartOfLocalHour);
export const dateMoveToEndOfLocalDay = compose(addLocalMs(-1), addLocalDays(1), dateMoveToStartOfLocalDay);
export const dateMoveToEndOfLocalWeek = compose(addLocalMs(-1), addLocalWeeks(1), dateMoveToStartOfLocalWeek);
export const dateMoveToEndOfLocalWorkWeek = compose(addLocalMs(-1), addLocalWeeks(1), dateMoveToStartOfLocalWorkWeek);
export const dateMoveToEndOfLocalMonth = compose(addLocalMs(-1), addLocalMonths(1), dateMoveToStartOfLocalMonth);
export const dateMoveToEndOfLocalQuarter = compose(addLocalMs(-1), addLocalMonths(3), dateMoveToStartOfLocalQuarter);
export const dateMoveToEndOfLocalHalfYear = compose(addLocalMs(-1), addLocalMonths(6), dateMoveToStartOfLocalHalfYear);
export const dateMoveToEndOfLocalYear = compose(addLocalMs(-1), addLocalYears(1), dateMoveToStartOfLocalYear);

export const dateMoveToEndOfUtcSecond = compose(addUtcMs(-1), addUtcSeconds(1), dateMoveToStartOfUtcSecond);
export const dateMoveToEndOfUtcMinute = compose(addUtcMs(-1), addUtcMinutes(1), dateMoveToStartOfUtcMinute);
export const dateMoveToEndOfUtcHour = compose(addUtcMs(-1), addUtcHours(1), dateMoveToStartOfUtcHour);
export const dateMoveToEndOfUtcDay = compose(addUtcMs(-1), addUtcDays(1), dateMoveToStartOfUtcDay);
export const dateMoveToEndOfUtcWeek = compose(addUtcMs(-1), addUtcWeeks(1), dateMoveToStartOfUtcWeek);
export const dateMoveToEndOfUtcWorkWeek = compose(addUtcMs(-1), addUtcWeeks(1), dateMoveToStartOfUtcWorkWeek);
export const dateMoveToEndOfUtcMonth = compose(addUtcMs(-1), addUtcMonths(1), dateMoveToStartOfUtcMonth);
export const dateMoveToEndOfUtcQuarter = compose(addUtcMs(-1), addUtcMonths(3), dateMoveToStartOfUtcQuarter);
export const dateMoveToEndOfUtcHalfYear = compose(addUtcMs(-1), addUtcMonths(6), dateMoveToStartOfUtcHalfYear);
export const dateMoveToEndOfUtcYear = compose(addUtcMs(-1), addUtcYears(1), dateMoveToStartOfUtcYear);

// #endregion
