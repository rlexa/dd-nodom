import {compose} from '../fp/compose';
import {add, mult} from '../fp/math';
import {msDay, msHour, msMinute, msSecond} from './const';
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
