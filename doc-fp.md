[back](./README.md)

# dd-nodom/fp

Functional programming utilities.

| name                  | info                                                                  |
| --------------------- | --------------------------------------------------------------------- |
| `add`                 | mathematical addition                                                 |
| `ceil`                | mathematical                                                          |
| `coalesce`            | `coalesce(a)(b)` ~> `b ?? a`                                          |
| [`compose`](#compose) | right-to-left function composition                                    |
| `curry`               | `(a, b) => r` ~> `(a) => (b) => r`                                    |
| `div`                 | mathematical division                                                 |
| `findOrDefault`       | handler finder (returns first fn that returns not-null or default fn) |
| `flip`                | `(a) => (b) => r` ~> `(b) => (a) => r`                                |
| `floor`               | mathematical                                                          |
| `max`                 | mathematical                                                          |
| `min`                 | mathematical                                                          |
| `mult`                | mathematical multiplication                                           |
| `not`                 | boolean                                                               |
| `round`               | mathematical                                                          |
| `sub`                 | mathematical subtraction                                              |

## Examples

### compose

Functions composition allows to create new functionality from existing functions in a declarative point-free way.

```typescript
const toWords = compose(arrayFilterNotEmpty<string>, arrayMap(strTrim), strSplit(' '));
const vocabularize = compose(arraySort(strCompareAlphanumeric), arrayUnique, toWords);

vocabularize('  apple melon     berry apple   pumpkin   banana ');
// -> ['apple', 'banana', 'berry', 'melon', 'pumpkin']
```
