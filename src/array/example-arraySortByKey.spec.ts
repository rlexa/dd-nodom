import {arraySortByKey} from './util';

type Person = {name: string; surname: string};

const persons: Person[] = [
  {name: 'Bob', surname: 'Bobson'},
  {name: 'Al', surname: 'Bobson'},
  {name: 'Al', surname: 'Alson'},
];

const sortPersons = arraySortByKey<Person>('name', 'surname');

describe(`example arraySortByKey`, () => {
  it(`finds max`, () =>
    expect(sortPersons(persons)).toStrictEqual([
      {name: 'Al', surname: 'Alson'},
      {name: 'Al', surname: 'Bobson'},
      {name: 'Bob', surname: 'Bobson'},
    ]));
});
