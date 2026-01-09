import {arrayFilterNotEmpty, arrayMap, arraySort, arrayUnique} from '../array';
import {compose} from '../fp';
import {strCompareAlphanumeric, strSplit, strTrim} from '../str';

const toWords = compose(arrayFilterNotEmpty<string>, arrayMap(strTrim), strSplit(' '));
const vocabularize = compose(arraySort(strCompareAlphanumeric), arrayUnique, toWords);

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
