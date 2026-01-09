import {strCompare, strCompareAlphanumeric} from '../str';
import {arraySort} from './util';

const sortStandard = arraySort(strCompare);
const sortAlphanumeric = arraySort(strCompareAlphanumeric);

const values = ['a11', 'a100'];

describe(`example arraySort`, () => {
  it(`transforms`, () => {
    expect(sortStandard(values)).toStrictEqual(['a100', 'a11']);
    expect(sortAlphanumeric(values)).toStrictEqual(['a11', 'a100']);
  });
});
