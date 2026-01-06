import {compose} from '../fp/compose';
import {strPadLeftWithZero2} from '../str/util';
import {asDateNonNull} from './parse';

export const dateToLocalSeconds = (val: Date) => val.getSeconds();
/** 00:00:05: `"05"` */
export const dateToLocalSecondsString = compose(strPadLeftWithZero2, dateToLocalSeconds);
/** 00:00:05: `"05"` */
export const asLocalSecondsString = compose(dateToLocalSecondsString, asDateNonNull);

export const dateToUtcSeconds = (val: Date) => val.getUTCSeconds();
/** 00:00:05: `"05"` */
export const dateToUtcSecondsString = compose(strPadLeftWithZero2, dateToUtcSeconds);
/** 00:00:05: `"05"` */
export const asUtcSecondsString = compose(dateToUtcSecondsString, asDateNonNull);
