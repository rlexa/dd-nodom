import {compose} from '../fp/compose';
import {strPadLeftWithZero4} from '../str/util';
import {asDateNonNull} from './parse';

export const dateToLocalYear = (val: Date) => val.getFullYear();
/** year 920: `"0920"` */
export const dateToLocalYearString = compose(strPadLeftWithZero4, dateToLocalYear);
/** year 920: `"0920"` */
export const asLocalYearString = compose(dateToLocalYearString, asDateNonNull);

export const dateToUtcYear = (val: Date) => val.getUTCFullYear();
/** year 920: `"0920"` */
export const dateToUtcYearString = compose(strPadLeftWithZero4, dateToUtcYear);
/** year 920: `"0920"` */
export const asUtcYearString = compose(dateToUtcYearString, asDateNonNull);
