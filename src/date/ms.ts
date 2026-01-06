import {compose} from '../fp/compose';
import {strPadLeftWithZero3} from '../str/util';
import {asDateNonNull} from './parse';

export const dateToLocalMs = (val: Date) => val.getMilliseconds();
/** 00:00:00.012: `"012"` */
export const dateToLocalMsString = compose(strPadLeftWithZero3, dateToLocalMs);
/** 00:00:00.012: `"012"` */
export const asLocalMsString = compose(dateToLocalMsString, asDateNonNull);

export const dateToUtcMs = (val: Date) => val.getUTCMilliseconds();
/** 00:00:00.012: `"012"` */
export const dateToUtcMsString = compose(strPadLeftWithZero3, dateToUtcMs);
/** 00:00:00.012: `"012"` */
export const asUtcMsString = compose(dateToUtcMsString, asDateNonNull);

/** @returns date javascript milliseconds value */
export const dateToTimeValue = (val: Date) => val.getTime();
/** @returns date javascript milliseconds value */
export const asTimeValue = compose(dateToTimeValue, asDateNonNull);
