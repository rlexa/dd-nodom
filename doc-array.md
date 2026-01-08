[back](./README.md)

# dd-nodom/array

Array utilities (mostly based on partial application i.e. instead of `arrayConcat(arg0, arg0)` the definition is `arrayConcat(arg0)(arg1)` which allows for partially preparing a function with an argument).

_FYI_ All functions are based on immutability.

| name                              | definition                         | info                                                                |
| --------------------------------- | ---------------------------------- | ------------------------------------------------------------------- |
| `arrayConcat`                     | `[] => [] => []`                   | concatenates 2 arrays into a new one                                |
| `arrayEach`                       | `fn => [] => void`                 | executes `fn: (item, index, all) => R` for each item                |
| `arrayForEach`                    | `[] => fn => void`                 | flipped `arrayEach`                                                 |
| `arrayEvery`                      | `fn => [] => boolean`              | `true` if every item satisfies: `fn: (item, index, all) => boolean` |
| `arrayForEvery`                   | `[] => fn => boolean`              | flipped `arrayEvery`                                                |
| `arrayExtractDistinctValuesOfKey` | `(key: K) => (val: T[]) => T[K][]` | returns distinct values of a certain key from all items             |
| `arrayFilterNotEmpty`             | `[] => []`                         | filters out empty values `null`, `undefined`, `""`                  |
| `arrayFilter`                     | `fn => [] => []`                   | filters items via `fn: (item, index, all) => boolean`               |
| `arrayForFilter`                  | `[] => fn => []`                   | flipped `arrayFilter`                                               |
| `arrayFind`                       | `fn => [] => (T \| undefined)`     | finds item via `fn: (item, index, all) => boolean`                  |
| `arrayForFind`                    | `[] => fn => (T \| undefined)`     | flipped `arrayFind`                                                 |
| `arrayFlat`                       | `([][]) => []`                     | flattens array one level deep                                       |
| `arrayIncludes`                   | `value => [] => boolean`           | `true` if `value` is in the array                                   |
| `arrayForInclude`                 | `[] => value => boolean`           | flipped `arrayIncludes`                                             |
| `arrayJoin`                       | `separator => [] => string`        | joins array items into a string using the `separator`               |
| `arrayForJoin`                    | `[] => separator => string`        | flipped `arrayJoin`                                                 |
| `arrayMap`                        | `fn => [] => []`                   | maps items via `fn: (item, index, all) => itemNew`                  |
| `arrayForMap`                     | `[] => fn => []`                   | flipped `arrayMap`                                                  |
| `arrayReduce`                     | `fnInit => fn => [] => acc`        | reduces array via `fn: (acc, item, index, all) => accNew`           |
| `arrayRemove`                     | `value => [] => []`                | removes all occurrences of `value`                                  |
| `arrayForRemove`                  | `[] => value => []`                | flipped `arrayRemove`                                               |
| `arraySome`                       | `fn => [] => boolean`              | `true` if some item satisfies: `fn: (item, index, all) => boolean`  |
| `arrayForSome`                    | `[] => fn => boolean`              | flipped `arraySome`                                                 |
| `arraySortByKey`                  | `([], ...keys) => []`              | sorts array objects by keys (e.g. by `surname`, `name`)             |
| `arraySort`                       | `fn => [] => []`                   | sorts array via (optional) `fn: (itemA, itemB) => number`           |
| `arrayForSort`                    | `[] => fn => []`                   | flipped `arraySort`                                                 |
| `arrayUnique`                     | `[] => []`                         | removes duplicates                                                  |
