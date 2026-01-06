import {arrayForInclude} from '../array/util';
import {not} from '../fp/common';
import {compose} from '../fp/compose';
import {strPadLeftWithZero2} from '../str/util';
import {IsoWeekday, Weekday} from './const';
import {asDateNonNull} from './parse';

/** @returns day of the week, see {@link Weekday} */
export const dateToLocalWeekday = (val: Date) => val.getDay();
/** @returns day of the week, see {@link Weekday} */
export const asLocalWeekday = compose(dateToLocalWeekday, asDateNonNull);

/** @returns day of the week, see {@link Weekday} */
export const dateToUtcWeekday = (val: Date) => val.getUTCDay();
/** @returns day of the week, see {@link Weekday} */
export const asUtcWeekday = compose(dateToUtcWeekday, asDateNonNull);

/** @returns day date e.g. 1st of month: `1` */
export const dateToLocalDayDate = (val: Date) => val.getDate();
/** @returns day date e.g. 1st of month: `1` */
export const asLocalDayDate = compose(dateToLocalDayDate, asDateNonNull);
/** @returns day date string e.g. 1st of month: `"01"` */
export const dateToLocalDayDateString = compose(strPadLeftWithZero2, dateToLocalDayDate);
/** @returns day date string e.g. 1st of month: `"01"` */
export const asLocalDayDateString = compose(dateToLocalDayDateString, asDateNonNull);

/** @returns day date e.g. 1st of month: `1` */
export const dateToUtcDayDate = (val: Date) => val.getUTCDate();
/** @returns day date e.g. 1st of month: `1` */
export const asUtcDayDate = compose(dateToUtcDayDate, asDateNonNull);
/** @returns day date string e.g. 1st of month: `"01"` */
export const dateToUtcDayDateString = compose(strPadLeftWithZero2, dateToUtcDayDate);
/** @returns day date string e.g. 1st of month: `"01"` */
export const asUtcDayDateString = compose(dateToUtcDayDateString, asDateNonNull);

export const isWeekendDay = arrayForInclude([Weekday.Saturday, Weekday.Sunday]);
export const dateIsLocalWeekendDay = compose(isWeekendDay, dateToLocalWeekday);
export const isLocalWeekendDay = compose(dateIsLocalWeekendDay, asDateNonNull);
export const dateIsUtcWeekendDay = compose(isWeekendDay, dateToUtcWeekday);
export const isUtcWeekendDay = compose(dateIsUtcWeekendDay, asDateNonNull);

export const isWeekWorkDay = compose(not, isWeekendDay);
export const dateIsLocalWeekWorkDay = compose(isWeekWorkDay, dateToLocalWeekday);
export const isLocalWeekWorkDay = compose(dateIsLocalWeekWorkDay, asDateNonNull);
export const dateIsUtcWeekWorkDay = compose(isWeekWorkDay, dateToUtcWeekday);
export const isUtcWeekWorkDay = compose(dateIsUtcWeekWorkDay, asDateNonNull);

/** Mo-Su: 1-7 **CAUTION** not standard JS `Date.getDay`, for that see {@link isWeekendDay} */
export const isIsoWeekendDay = arrayForInclude([IsoWeekday.Saturday, IsoWeekday.Sunday]);
/** Mo-Su: 1-7 **CAUTION** not standard JS `Date.getDay`, for that see {@link dateIsLocalWeekendDay} */
export const dateIsLocalIsoWeekendDay = compose(isIsoWeekendDay, dateToLocalWeekday);
/** Mo-Su: 1-7 **CAUTION** not standard JS `Date.getDay`, for that see {@link isisLocalWeekendDayWeekendDay} */
export const isLocalIsoWeekendDay = compose(dateIsLocalIsoWeekendDay, asDateNonNull);
/** Mo-Su: 1-7 **CAUTION** not standard JS `Date.getDay`, for that see {@link isdateIsUtcWeekendDayWeekendDay} */
export const dateIsUtcIsoWeekendDay = compose(isIsoWeekendDay, dateToUtcWeekday);
/** Mo-Su: 1-7 **CAUTION** not standard JS `Date.getDay`, for that see {@link isUtcWeekendDay} */
export const isUtcIsoWeekendDay = compose(dateIsUtcIsoWeekendDay, asDateNonNull);

/** Mo-Su: 1-7 **CAUTION** not standard JS `Date.getDay`, for that see {@link isWeekWorkDay} */
export const isIsoWeekWorkDay = compose(not, isIsoWeekendDay);
/** Mo-Su: 1-7 **CAUTION** not standard JS `Date.getDay`, for that see {@link dateIsLocalWeekWorkDay} */
export const dateIsLocalIsoWeekWorkDay = compose(isWeekWorkDay, dateToLocalWeekday);
/** Mo-Su: 1-7 **CAUTION** not standard JS `Date.getDay`, for that see {@link isWeekWisLocalWeekWorkDayorkDay} */
export const isLocalIsoWeekWorkDay = compose(dateIsLocalWeekWorkDay, asDateNonNull);
/** Mo-Su: 1-7 **CAUTION** not standard JS `Date.getDay`, for that see {@link isdateIsUtcWeekWorkDayWeekWorkDay} */
export const dateIsUtcIsoWeekWorkDay = compose(isWeekWorkDay, dateToUtcWeekday);
/** Mo-Su: 1-7 **CAUTION** not standard JS `Date.getDay`, for that see {@link isUtcWeekWorkDay} */
export const isUtcIsoWeekWorkDay = compose(dateIsUtcWeekWorkDay, asDateNonNull);
