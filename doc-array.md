[back](./README.md)

# dd-nodom/array

Array utilities (mostly based on partial application i.e. instead of `arrayConcat(arg0, arg0)` the definition is `arrayConcat(arg0)(arg1)` which allows for partially preparing a function with an argument).

_FYI_ All functions are based on immutability.

| name                                                                  | definition                     | info                                                         |
| --------------------------------------------------------------------- | ------------------------------ | ------------------------------------------------------------ |
| `arrayConcat`                                                         | `[] => [] => []`               | concatenates 2 arrays into a new one                         |
| `arrayEach`                                                           | `fn => [] => void`             | executes `fn: (item, index, all) => R` for each item         |
| `arrayForEach`                                                        | `[] => fn => void`             | flipped `arrayEach`                                          |
| `arrayEvery`                                                          | `fn => [] => boolean`          | `true` if every item is: `fn: (item, index, all) => boolean` |
| `arrayForEvery`                                                       | `[] => fn => boolean`          | flipped `arrayEvery`                                         |
| [`arrayExtractDistinctValuesOfKey`](#arrayextractdistinctvaluesofkey) | `key => [] => []`              | returns distinct values of a certain key from all items      |
| `arrayFilterNotEmpty`                                                 | `[] => []`                     | filters out empty values `null`, `undefined`, `""`           |
| `arrayFilter`                                                         | `fn => [] => []`               | filters items via `fn: (item, index, all) => boolean`        |
| `arrayForFilter`                                                      | `[] => fn => []`               | flipped `arrayFilter`                                        |
| `arrayFind`                                                           | `fn => [] => (T \| undefined)` | finds item via `fn: (item, index, all) => boolean`           |
| `arrayForFind`                                                        | `[] => fn => (T \| undefined)` | flipped `arrayFind`                                          |
| `arrayFlat`                                                           | `([][]) => []`                 | flattens array one level deep                                |
| [`arrayIncludes`](#arrayincludes)                                     | `value => [] => boolean`       | `true` if `value` is in the array                            |
| [`arrayForInclude`](#arrayforinclude)                                 | `[] => value => boolean`       | flipped `arrayIncludes`                                      |
| [`arrayJoin`](#arrayjoin)                                             | `separator => [] => string`    | joins array items into a string using the `separator`        |
| `arrayForJoin`                                                        | `[] => separator => string`    | flipped `arrayJoin`                                          |
| `arrayMap`                                                            | `fn => [] => []`               | maps items via `fn: (item, index, all) => itemNew`           |
| `arrayForMap`                                                         | `[] => fn => []`               | flipped `arrayMap`                                           |
| [`arrayReduce`](#arrayreduce)                                         | `fnInit => fn => [] => acc`    | reduces array via `fn: (acc, item, index, all) => accNew`    |
| `arrayRemove`                                                         | `value => [] => []`            | removes all occurrences of `value`                           |
| `arrayForRemove`                                                      | `[] => value => []`            | flipped `arrayRemove`                                        |
| `arraySome`                                                           | `fn => [] => boolean`          | `true` if some item is: `fn: (item, index, all) => boolean`  |
| `arrayForSome`                                                        | `[] => fn => boolean`          | flipped `arraySome`                                          |
| [`arraySortByKey`](#arraysortbykey)                                   | `(...keys) => [] => []`        | sorts array objects by keys (e.g. by `surname`, `name`)      |
| `arraySort`                                                           | `fn => [] => []`               | sorts array via (optional) `fn: (itemA, itemB) => number`    |
| `arrayForSort`                                                        | `[] => fn => []`               | flipped `arraySort`                                          |
| `arrayUnique`                                                         | `[] => []`                     | removes duplicates                                           |

## Examples

### arrayExtractDistinctValuesOfKey

```typescript
type Person = {name: string; surname: string};
const extractPersonNames = arrayExtractDistinctValuesOfKey<Person, 'name'>('name');
const extractSortedPersonNames = compose(arraySort(), extractPersonNames);

extractSortedPersonNames([
  {name: 'Bob', surname: 'Bobson'},
  {name: 'Al', surname: 'Alson'},
  {name: 'Al', surname: 'Bobson'},
]); // -> ['Al', 'Bob']
```

### arrayForInclude

```typescript
export enum ValidColor {
  BLUE = 'blue',
  GREEN = 'green',
  RED = 'red',
}
const isValidColor = arrayForInclude(Object.values(ValidColor) as string[]);

isValidColor(ValidColor.BLUE); // -> true
isValidColor('yellow'); // -> false
```

### arrayIncludes

```typescript
const hasZero = arrayIncludes(0);
hasZero([1, 2, 3]); // -> false
hasZero([0, 1, 2]); // -> true
```

### arrayJoin

```typescript
const joinSentences = arrayJoin(' ')<string>;
const joinSections = arrayJoin('\n')<string>;
const makeArticle = compose(joinSections, arrayMap(joinSentences));

const text1 = ['Hello world!', 'Nice clouds.'];
const text2 = ['Bye world!', 'Stay green.'];

makeArticle([text1, text2]); // -> 'Hello world! Nice clouds.\nBye world! Stay green.'
```

### arrayReduce

```typescript
const findMax = arrayReduce(() => 0)<number>((acc, ii) => Math.max(acc, ii));
findMax([1, 4, 3, 2]); // -> 4
```

### arraySortByKey

```typescript
type Person = {name: string; surname: string};

const persons: Person[] = [
  {name: 'Bob', surname: 'Bobson'},
  {name: 'Al', surname: 'Bobson'},
  {name: 'Al', surname: 'Alson'},
];

const sortPersons = arraySortByKey<Person>('name', 'surname');

sortPersons(persons);
// -> [
//      {name: 'Al', surname: 'Alson'}
//      {name: 'Al', surname: 'Bobson'},
//      {name: 'Bob', surname: 'Bobson'}
//    ]
```
