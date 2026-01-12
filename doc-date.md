[back](./README.md)

# dd-nodom/date

Date utilities (mostly based on partial application).

## JS Date shenanigans

The JS `Date` instance is always created using the runtime's local timezone and does not retain the timezone information it was created from. It can be created from any timestamp and transformed into ISO UTC string. This may look like a big issue but in reality it is very rare that the same runtime has to deal with different timezones at once. Usually the business cases revolve around either a timestamp denoting a moment in time (e.g. the time of the moon landing) or a business time which is a different timestamp based on the timezone (e.g. New Year's Eve).

### Local-versus-UTC

Library's operators with `Local` infix return the values from the point of view of the local runtime timezone and always have an additional `Utc` variant which returns the values in UTC. For example for German time when creating a `Date` via `asDateNonNull('2000-01-01T00:00:00.000')` the util function `dateToLocalDatePart` will return `'2000-01-01'` and `dateToUtcDatePart` will return `'1999-12-31'`. In nearly all cases the `Local` variant is what you need.

### Timestamps

When dealing with timestamps the data transfer object can be either it's ms number (or Unix timestamp which is the same but less precise as it's in seconds) or it's ISO string. For example ISO `2000-01-01T00:00:00.000Z` equals to `946684800000` ms value or `946684800` Unix time value. When working with timestamps in e.g. frontend the resulting `Date` instance will present it in the local client's time and when sending the value back to the server it needs to be transformed to ISO (UTC) or to the ms value again so there is no problem there.

### Business time

For business time the timezone is actually not important because the value is denoting the time in any given timezone at evaluation time. Therefore it is best to save those values not as timestamps but as DateOnly (`2000-01-01`) or DateTimeOnly (`2000-01-01T00:00:00.000`) string values which also happen to be sortable due to the ISO format. When creating a `Date` instance with `asDate` or `asDateNonNull` the value will be transformed and presented in the local runtime timezone which is again exactly what a user would expect for business time when shown in e.g. a frontend client. On changing and saving the value make sure to remove the timezone information using e.g. `asLocalDatePart` which will transform the value to `yyyy-mm-dd` string in client's local timezone (which is what the user selected) before sending it back to the server.

### Parallel timezones

It is very rare to have to deal with multiple timezones in the same runtime (for example to show multiple clocks for trading applications). In this case the created `Date` instances need to be manually moved to the desired timezone offset. This is out of scope of this documentation (but take a look at `Intl` API).

## Building own operators

Most operators in the library are based on function composition and partial application. You can build your own operators based on the same principles. For example the operator `dateMoveToEndOfLocalYear` is implemented as:

```typescript
// const dateMoveToEndOfLocalYear: (arg: Date) => Date
export const dateMoveToEndOfLocalYear = compose(addLocalMs(-1), addLocalYears(1), dateMoveToStartOfLocalYear);
```

- `compose` builds a function which applies the handlers inside to an incoming argument from right to left:
  - from incoming date move to start of year
  - add 1 year
  - subtract a single millisecond
  - result: end of year

## Misc.

| name            | info                                                                    |
| --------------- | ----------------------------------------------------------------------- |
| `DateDiffLevel` | (type) time difference levels used in diff functions ('ms' ... 'years') |
| `IsoWeekday`    | (enum) Mo-Su: 1-7                                                       |
| `Weekday`       | (enum) Su-Sa: 0-6                                                       |
| `dateZero`      | `Date` zero-ms instance                                                 |

## Constants

| name                   | info                                            |
| ---------------------- | ----------------------------------------------- |
| `avgDaysPerMonth`      | wikipedia average                               |
| `avgDaysPerYear`       | wikipedia average                               |
| `msLocalTimezoneToUtc` | ms offset between local client timezone and UTC |
| `msSecond`             | second in ms                                    |
| `msMinute`             | minute in ms                                    |
| `msHour`               | hour in ms                                      |
| `msDay`                | day in ms                                       |
| `msWeek`               | week in ms                                      |
| `msMonth`              | month in ms (average)                           |
| `msYear`               | year in ms (average)                            |

## Parse

_FYI_ when using `compose` prefer using `asDateNonNull` over `asDate` for better type-safety i.e. handle `null` beforehand.

| name            | info                                        |
| --------------- | ------------------------------------------- |
| `isValidDate`   | checks `Date` instance and it's value       |
| `asDate`        | parses as `Date` instance or `null`         |
| `asDateNonNull` | parses as `Date` instance, throws if `null` |
| `dateCopy`      |                                             |

## Getter

_FYI_ Most operators have an additional `as`-prefixed variant which can be applied directly to a date-like value e.g. alongside `dateToIso` which is only implemented for a `Date` instance there is also `asIso` which can be applied to any date-like value.

_FYI_ see [Local-versus-UTC](#local-versus-utc) for Utc column.

| name                        | info                              | as...   | Utc     |
| --------------------------- | --------------------------------- | ------- | ------- |
| `dateToTimeValue`           | `Date` javascript ms value        | &check; |         |
| `dateToLocalMs`             | milliseconds (0-999)              |         | &check; |
| `dateToLocalMsString`       | milliseconds (`"000"`-`"999"`)    | &check; | &check; |
| `dateToLocalSeconds`        | seconds (0-59)                    |         | &check; |
| `dateToLocalSecondsString`  | seconds (`"00"`-`"59"`)           | &check; | &check; |
| `dateToLocalMinutes`        | minutes (0-59)                    |         | &check; |
| `dateToLocalMinutesString`  | minutes (`"00"`-`"59"`)           | &check; | &check; |
| `dateToLocalHours`          | hours (0-23)                      |         | &check; |
| `dateToLocalHoursString`    | hours (`"00"`-`"23"`)             | &check; | &check; |
| `dateToLocalWeekday`        | Su-Sa: 0-6                        | &check; | &check; |
| `dateToLocalDayDate`        | date of the month (1-31)          | &check; | &check; |
| `dateToLocalDayDateString`  | date of the month (`"01"`-`"31"`) | &check; | &check; |
| `isWeekendDay`              | Su-Sa: 0-6                        |         |         |
| `dateIsLocalWeekendDay`     | Su-Sa: 0-6                        | &check; | &check; |
| `isWeekWorkDay`             | Su-Sa: 0-6                        |         |         |
| `dateIsLocalWeekWorkDay`    | Su-Sa: 0-6                        | &check; | &check; |
| `dateToLocalIsoWeekday`     | Mo-Su: 1-7                        | &check; | &check; |
| `isIsoWeekWorkDay`          | Mo-Su: 1-7                        |         |         |
| `dateIsLocalIsoWeekWorkDay` | Mo-Su: 1-7                        | &check; | &check; |
| `dateToLocalMonth`          | month (1-12)                      |         |         |
| `dateToLocalMonthString`    | month (`"01"`-`"12"`)             | &check; | &check; |
| `dateToLocalYear`           | full year                         |         | &check; |
| `dateToLocalYearString`     | full year (e.g. `"0980"`)         | &check; | &check; |

## Stringify

_FYI_ Most operators have an additional `as`-prefixed variant which can be applied directly to a date-like value e.g. alongside `dateToIso` which is only implemented for a `Date` instance there is also `asIso` which can be applied to any date-like value.

_FYI_ see [Local-versus-UTC](#local-versus-utc) for Utc column.

| name                  | info                              | as...   | Utc     |
| --------------------- | --------------------------------- | ------- | ------- |
| `dateToIso`           | `"2000-01-01T00:00:00.000Z"`      | &check; |         |
| `dateToLocalDatePart` | `"yyyy-mm-dd"`                    | &check; | &check; |
| `dateToLocalHhMmPart` | `"hh:mm"`                         | &check; | &check; |
| `dateToLocalTimePart` | `"hh:mm:ss"`                      | &check; | &check; |
| `dateToLocalDateTime` | `"yyyy-mm-ddThh:mm:ss"`           | &check; | &check; |
| `isoToDatePart`       | `"yyyy-mm-dd"` part of ISO string |         |         |
| `dateToIsoDatePart`   | to ISO part `"yyyy-mm-dd"`        | &check; |         |
| `isoToHhMmPart`       | `"hh:mm"` part of ISO string      |         |         |
| `dateToIsoToHhMmPart` |                                   | &check; |

## Compare

| name        | info |
| ----------- | ---- |
| `dateEqual` |      |
| `dateMax`   |      |
| `dateMin`   |      |

## Diff

| name                      | info                            |
| ------------------------- | ------------------------------- |
| `dateDiffMs`              | signed                          |
| `dateDiffMsDurationLevel` | returns object with diff values |
| `removeDateDiffLevels`    | removes unwanted diff levels    |
| `dateDiffSeconds`         |                                 |
| `dateDiffMinutes`         |                                 |
| `dateDiffHours`           |                                 |
| `dateDiffDays`            |                                 |
| `dateDiffWeeks`           |                                 |
| `dateDiffMonths`          |                                 |
| `dateDiffYears`           |                                 |

## Duration

_FYI_ Uses `Intl` API or a non-flexible fallback.

| name                         | info                                        |
| ---------------------------- | ------------------------------------------- |
| `dateDurationLevel`          | returns object with duration values         |
| `dateDurationMs`             |                                             |
| `dateDurationSeconds`        |                                             |
| `dateDurationMinutes`        |                                             |
| `dateDurationHours`          |                                             |
| `dateDurationDays`           |                                             |
| `dateDurationWeeks`          |                                             |
| `dateDurationMonths`         |                                             |
| `dateDurationYears`          |                                             |
| `DurationFormat`             | (type) format mode                          |
| `stringifyDuration`          | see also prepared `DurationFormat` variants |
| `stringifyShortestDuration`  | see also prepared `DurationFormat` variants |
| `stringifyDurationUpToHours` | see also prepared `DurationFormat` variants |

## ISO Year Week

_FYI_ Most operators have an additional `as`-prefixed variant which can be applied directly to a date-like value e.g. alongside `dateToIso` which is only implemented for a `Date` instance there is also `asIso` which can be applied to any date-like value.

_FYI_ see [Local-versus-UTC](#local-versus-utc) for Utc column.

| name                            | info                                                | as...   | Utc |
| ------------------------------- | --------------------------------------------------- | ------- | --- |
| `dateToLocalIsoYearWeek`        | identifies `[year, week]`                           | &check; |     |
| `dateToLocalIsoWeek`            |                                                     | &check; |     |
| `dateToLocalIsoYear`            |                                                     | &check; |     |
| `dateToLocalIsoWeekString`      | `2000-W01` ISO format                               | &check; |     |
| `dateMoveToStartOfLocalIsoWeek` | using a reference `Date` moves to start of ISO week |         |     |
| `dateStartOfLocalIsoYearWeek`   | `[year, week]` to start of week as `Date`           |         |     |

## Mutate

_FYI_ All operators use immutability approach except for explicit `dateMutate` function. This function clones the given `Date` instance via allows mutation in place via callback function: `(fn: (date: Date) => void) => (val: Date) => Date`.

### Based on ms value (adds as duration)

These operators add value as duration (not usable for calendar based semantic mutations).

| name         | info |
| ------------ | ---- |
| `addMs`      |      |
| `addSeconds` |      |
| `addMinutes` |      |
| `addHours`   |      |
| `addDays`    |      |
| `addWeeks`   |      |

### Based on semantic value

These operators add calendar based value semantically (not usable for duration mutations).

_FYI_ see [Local-versus-UTC](#local-versus-utc) for Utc column.

| name              | info | Utc     |
| ----------------- | ---- | ------- |
| `addLocalMs`      |      | &check; |
| `addLocalSeconds` |      | &check; |
| `addLocalMinutes` |      | &check; |
| `addLocalHours`   |      | &check; |
| `addLocalDays`    |      | &check; |
| `addLocalWeeks`   |      | &check; |
| `addLocalMonths`  |      | &check; |
| `addLocalYears`   |      | &check; |

### Moving

_FYI_ These operators have `MoveToStart` and `MoveToEnd` infix variants.

_FYI_ see [Local-versus-UTC](#local-versus-utc) for Utc column.

| name                             | info                   | ToEnd   | Utc     |
| -------------------------------- | ---------------------- | ------- | ------- |
| `dateMoveToStartOfLocalSecond`   |                        | &check; | &check; |
| `dateMoveToStartOfLocalMinute`   |                        | &check; | &check; |
| `dateMoveToStartOfLocalHour`     |                        | &check; | &check; |
| `dateMoveToStartOfLocalDay`      |                        | &check; | &check; |
| `dateMoveToStartOfLocalWeek`     | starts with Sunday (0) | &check; | &check; |
| `dateMoveToStartOfLocalWorkWeek` | starts with Monday (1) | &check; | &check; |
| `dateMoveToStartOfLocalMonth`    |                        | &check; | &check; |
| `dateMoveToStartOfLocalQuarter`  |                        | &check; | &check; |
| `dateMoveToStartOfLocalHalfYear` |                        | &check; | &check; |
| `dateMoveToStartOfLocalYear`     |                        | &check; | &check; |
