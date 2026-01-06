import {compose} from '../fp/compose';
import {strPadLeftWithZero2} from '../str/util';
import {asDateNonNull} from './parse';

/** Jan-Feb: 1-12 */
export const dateToLocalMonth = (val: Date) => val.getMonth() + 1;
/** Jan: `"01"` */
export const dateToLocalMonthString = compose(strPadLeftWithZero2, dateToLocalMonth);
/** Jan: `"01"` */
export const asLocalMonthString = compose(dateToLocalMonthString, asDateNonNull);

/** Jan-Feb: 1-12 */
export const dateToUtcMonth = (val: Date) => val.getUTCMonth() + 1;
/** Jan: `"01"` */
export const dateToUtcMonthString = compose(strPadLeftWithZero2, dateToUtcMonth);
/** Jan: `"01"` */
export const asUtcMonthString = compose(dateToUtcMonthString, asDateNonNull);
