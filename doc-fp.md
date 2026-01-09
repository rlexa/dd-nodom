[back](./README.md)

# dd-nodom/fp

Functional programming utilities.

| name                              | info                                                                  |
| --------------------------------- | --------------------------------------------------------------------- |
| `add`                             | mathematical addition                                                 |
| `ceil`                            | mathematical                                                          |
| `coalesce`                        | `coalesce(a)(b)` ~> `b ?? a`                                          |
| [`compose`](#compose)             | right-to-left function composition                                    |
| [`curry`](#curry)                 | `(a, b) => r` ~> `(a) => (b) => r`                                    |
| `div`                             | mathematical division                                                 |
| [`findOrDefault`](#findOrDefault) | handler finder (returns first fn that returns not-null or default fn) |
| `flip`                            | `(a) => (b) => r` ~> `(b) => (a) => r`                                |
| `floor`                           | mathematical                                                          |
| `max`                             | mathematical                                                          |
| `min`                             | mathematical                                                          |
| `mult`                            | mathematical multiplication                                           |
| `not`                             | boolean invert                                                        |
| `round`                           | mathematical                                                          |
| `sub`                             | mathematical subtraction                                              |

## Examples

### compose

Functions composition allows to create new functionality from existing functions in a declarative point-free way.

```typescript
const toWords = compose(arrayFilterNotEmpty<string>, arrayMap(strTrim), strSplit(' '));
const vocabularize = compose(arraySort(strCompareAlphanumeric), arrayUnique, toWords);

vocabularize('  apple melon     berry apple   pumpkin   banana ');
// -> ['apple', 'banana', 'berry', 'melon', 'pumpkin']
```

### curry

Currying breaks up a function into a series of single-argument functions, priming it for partial application.

```typescript
const extractObjectValue = <T>(object: T, key: keyof T) => object[key];
const extractor = curry(extractObjectValue);

const item = {name: 'Al', age: 30, surname: 'Alson'};

const getter = extractor(item);
getter('age'); // --> 30
getter('name'); // --> 'Al'
getter('surname'); // --> 'Alson'
```

### findOrDefault

Returns the first handler's result that is not `null` or the result of the default handler. Can be used for error handlers of specific types or anonymous data object consumers or similar.

```typescript
const handleErrorCode = (err: unknown) => (typeof err !== 'number' ? null : `Error code: ${err}`);
const handleErrorObject = (err: unknown) =>
  isNullUndefined(err) || typeof err !== 'object' || !('message' in err) || typeof err.message !== 'string'
    ? null
    : `Error message: ${err.message}`;
const handleErrorFactory = findOrDefault(() => `Unknown error`);
const handleError = handleErrorFactory([handleErrorCode, handleErrorObject]);

handleError(null);
// -> 'Unknown error'

handleError(123);
// -> 'Error code: 123'

handleError({message: 'Oh noez!'});
// -> 'Error message: Oh noez!'
```
