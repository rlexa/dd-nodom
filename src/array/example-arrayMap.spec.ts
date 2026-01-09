import {arrayMap} from './util';

type Person = {id: number; name: string; surname: string};
type ListOption<T> = {value: T; label: string};
const personToOption = (item: Person): ListOption<number> => ({value: item.id, label: `${item.name} ${item.surname}`});
const personsToOptions = arrayMap(personToOption);

describe(`example arrayMap`, () => {
  it(`transforms`, () =>
    expect(
      personsToOptions([
        {id: 1, name: 'Al', surname: 'Alson'},
        {id: 2, name: 'Bob', surname: 'Bobson'},
      ]),
    ).toStrictEqual([
      {value: 1, label: 'Al Alson'},
      {value: 2, label: 'Bob Bobson'},
    ]));
});
