import {compose} from '../fp/compose';
import {strPadLeftWithZero2} from '../str/util';
import {asDateNonNull} from './parse';

export const dateToLocalMinutes = (val: Date) => val.getMinutes();
/** 00:05: `"05"` */
export const dateToLocalMinutesString = compose(strPadLeftWithZero2, dateToLocalMinutes);
/** 00:05: `"05"` */
export const asLocalMinutesString = compose(dateToLocalMinutesString, asDateNonNull);

export const dateToUtcMinutes = (val: Date) => val.getUTCMinutes();
/** 00:05: `"05"` */
export const dateToUtcMinutesString = compose(strPadLeftWithZero2, dateToUtcMinutes);
/** 00:05: `"05"` */
export const asUtcMinutesString = compose(dateToUtcMinutesString, asDateNonNull);
