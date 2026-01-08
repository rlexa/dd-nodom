[back](./README.md)

# dd-nodom/common

Simple utilities.

| name                    | info                |
| ----------------------- | ------------------- |
| `isNullUndefined`       | type guard          |
| `jsonCopy`              |                     |
| [`jsonDiff`](#jsondiff) | returns diff object |
| `jsonEqual`             |                     |
| `notNullUndefined`      | type guard          |

## Examples

### jsonDiff

```typescript
jsonDiff({a: 12}, {a: 12});
// -> {}

jsonDiff({a: 12}, {a: 13});
// -> {a: {oldValue: 12, newValue: 13}}
```
