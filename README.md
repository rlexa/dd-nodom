# dd-nodom

Util library (no DOM code).

- [/array](#array)
- [/common](#common)
- [/date](#date)
- [/fp](#fp)
- [/str](#str)

## /array

Array utilities (mostly based on partial application).

| name                               | info |
| ---------------------------------- | ---- |
| `arrayConcat`                      |      |
| `arrayEach`, `arrayForEach`        |      |
| `arrayEvery`, `arrayForEvery`      |      |
| `arrayExtractDistinctValuesOfKey`  |      |
| `arrayFilterNotEmpty`              |      |
| `arrayFilter`, `arrayForFilter`    |      |
| `arrayFind`, `arrayForFind`        |      |
| `arrayFlat`                        |      |
| `arrayIncludes`, `arrayForInclude` |      |
| `arrayJoin`, `arrayForJoin`        |      |
| `arrayMap`, `arrayForMap`          |      |
| `arrayReduce`, `arrayForReduce`    |      |
| `arrayRemove`, `arrayForRemove`    |      |
| `arraySome`, `arrayForSome`        |      |
| `arraySortByKey`                   |      |
| `arraySort`, `arrayForSort`        |      |
| `arrayUnique`                      |      |

## /common

Simple utilities.

| name               | info       |
| ------------------ | ---------- |
| `isNullUndefined`  | type guard |
| `jsonCopy`         |            |
| `jsonDiff`         |            |
| `jsonEqual`        |            |
| `notNullUndefined` | type guard |

## /date

Date utilities (mostly based on partial application).

### Util

| name            | info                    |
| --------------- | ----------------------- |
| `DateDiffLevel` | (type) diff levels      |
| `IsoWeekday`    | (enum) Mo-Su: 1-7       |
| `Weekday`       | (enum) Su-Sa: 0-6       |
| `dateZero`      | `Date` zero-ms instance |

#### ms constants

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

### Compare

| name        | info |
| ----------- | ---- |
| `dateEqual` |      |
| `dateMax`   |      |
| `dateMin`   |      |

### Diff

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

## /fp

Functional programming utilities.

| name            | info                                                                  |
| --------------- | --------------------------------------------------------------------- |
| `add`           | mathematical addition                                                 |
| `ceil`          | mathematical                                                          |
| `coalesce`      | `coalesce(a)(b)` ~> `b ?? a`                                          |
| `compose`       | right-to-left function composition                                    |
| `curry`         | `(a, b) => r` ~> `(a) => (b) => r`                                    |
| `div`           | mathematical division                                                 |
| `findOrDefault` | handler finder (returns first fn that returns not-null or default fn) |
| `flip`          | `(a) => (b) => r` ~> `(b) => (a) => r`                                |
| `floor`         | mathematical                                                          |
| `max`           | mathematical                                                          |
| `min`           | mathematical                                                          |
| `mult`          | mathematical multiplication                                           |
| `not`           | boolean                                                               |
| `round`         | mathematical                                                          |
| `sub`           | mathematical subtraction                                              |

## /str

String utilities (mostly based on partial application).

| name                                                          | info                               |
| ------------------------------------------------------------- | ---------------------------------- |
| `strCompareAlphanumeric`                                      |                                    |
| `strCompare`                                                  |                                    |
| `strIncludes`, `strForIncludes`                               |                                    |
| `strLower`, `strLowerLocale`                                  |                                    |
| `strNonNull`                                                  | stringify (always a string result) |
| `strPadLeft`, `strPadLeftWithZero`, `strPadLeftWithZero2/3/4` |                                    |
| `strSplit`, `strForSplit`                                     |                                    |
| `strTrim`                                                     |                                    |
| `strUpper`, `strUpperLocale`                                  |                                    |
| `str`                                                         | stringify                          |
