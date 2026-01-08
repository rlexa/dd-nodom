import {compose} from '../fp';
import {arrayExtractDistinctValuesOfKey, arraySort} from './util';

type Person = {name: string; surname: string};
const extractPersonNames = arrayExtractDistinctValuesOfKey<Person, 'name'>('name');
const extractSortedPersonNames = compose(arraySort(), extractPersonNames);

describe(`example arrayExtractDistinctValuesOfKey`, () => {
  it(`extracts names`, () =>
    expect(
      extractSortedPersonNames([
        {name: 'Bob', surname: 'Bobson'},
        {name: 'Al', surname: 'Alson'},
        {name: 'Al', surname: 'Bobson'},
      ]),
    ).toStrictEqual(['Al', 'Bob']));
});
