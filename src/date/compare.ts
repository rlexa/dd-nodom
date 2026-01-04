import {arrayMap} from '../array';
import {compose} from '../fp';
import {asDateNonNull, asTimeValue} from './date';

export const dateEqual = (left: Parameters<typeof asTimeValue>[0]) => (right: Parameters<typeof asTimeValue>[0]) =>
  left === right || asTimeValue(left) === asTimeValue(right);

export const dateMax = compose(asDateNonNull, (mss: number[]) => Math.max(...mss), arrayMap<Date, number>(asTimeValue));
export const dateMin = compose(asDateNonNull, (mss: number[]) => Math.min(...mss), arrayMap<Date, number>(asTimeValue));
