import {arrayFilterNotEmpty, arrayMap, arraySort, arrayUnique} from '../array';
import {compose} from '../fp';
import {strCompareAlphanumeric, strSplit, strTrim} from '../str';

const vocabularize = compose(arraySort(strCompareAlphanumeric), arrayUnique, arrayFilterNotEmpty<string>, arrayMap(strTrim), strSplit(' '));

describe(`example compose`, () => {
  it(`joins`, () =>
    expect(vocabularize('  apple melon     berry apple   pumpkin   banana ')).toStrictEqual([
      'apple',
      'banana',
      'berry',
      'melon',
      'pumpkin',
    ]));
});
