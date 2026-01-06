import {arrayMap} from '../array';
import {compose} from '../fp/compose';
import {max, min} from '../fp/math';
import {asTimeValue} from './ms';
import {asDateNonNull} from './parse';

export const dateEqual = (left: Parameters<typeof asTimeValue>[0]) => (right: Parameters<typeof asTimeValue>[0]) =>
  left === right || asTimeValue(left) === asTimeValue(right);

export const dateMax = compose(asDateNonNull, max, arrayMap(asTimeValue));
export const dateMin = compose(asDateNonNull, min, arrayMap(asTimeValue));
