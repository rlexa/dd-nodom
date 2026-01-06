import {compose} from '../fp/compose';
import {strPadLeftWithZero2} from '../str/util';
import {asDateNonNull} from './parse';

export const dateToLocalHours = (val: Date) => val.getHours();
/** 5: `"05"` */
export const dateToLocalHoursString = compose(strPadLeftWithZero2, dateToLocalHours);
/** 5: `"05"` */
export const asLocalHoursString = compose(dateToLocalHoursString, asDateNonNull);

export const dateToUtcHours = (val: Date) => val.getUTCHours();
/** 5: `"05"` */
export const dateToUtcHoursString = compose(strPadLeftWithZero2, dateToUtcHours);
/** 5: `"05"` */
export const asUtcHoursString = compose(dateToUtcHoursString, asDateNonNull);
