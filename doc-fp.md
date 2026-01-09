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

```typescript
const vocabularize = compose(arraySort(strCompareAlphanumeric), arrayUnique, arrayFilterNotEmpty<string>, arrayMap(strTrim), strSplit(' '));

vocabularize('  apple melon     berry apple   pumpkin   banana ');
// -> ['apple', 'banana', 'berry', 'melon', 'pumpkin']
```
