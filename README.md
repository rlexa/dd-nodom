# dd-nodom

Util library (no DOM code).

- [/array](#array)
- [/common](#common)
- [/date](#date)
- [/fp](#fp)
- [/str](#str)

## /array

Array utilities (mostly based on partial application).

- `arrayConcat`
- `arrayEach`, `arrayForEach`
- `arrayEvery`, `arrayForEvery`
- `arrayExtractDistinctValuesOfKey`
- `arrayFilterNotEmpty`
- `arrayFilter`, `arrayForFilter`
- `arrayFind`, `arrayForFind`
- `arrayFlat`
- `arrayIncludes`, `arrayForInclude`
- `arrayJoin`, `arrayForJoin`
- `arrayMap`, `arrayForMap`
- `arrayReduce`, `arrayForReduce`
- `arrayRemove`, `arrayForRemove`
- `arraySome`, `arrayForSome`
- `arraySortByKey`
- `arraySort`, `arrayForSort`
- `arrayUnique`

## /common

Simple utilities.

- `isNullUndefined` - type guard
- `jsonCopy`
- `jsonDiff`
- `jsonEqual`
- `notNullUndefined` - type guard

## /date

Date utilities (mostly based on partial application).

## /fp

Functional programming utilities.

- `add` - mathematical
- `coalesce`
- `compose` right-to-left function composition
- `curry` - `(a, b) => r` ~> `(a) => (b) => r`
- `findOrDefault`
- `flip` - `(a) => (b) => r` ~> `(b) => (a) => r`
- `mult` - mathematical
- `not`

## /str

String utilities (mostly based on partial application).

- `strCompareAlphanumeric`
- `strCompare`
- `strIncludes`, `strForIncludes`
- `strLower`, `strLowerLocale`
- `strNonNull` - stringify (always a string result)
- `strPadLeft`, `strPadLeftWithZero`, `strPadLeftWithZero2`, `strPadLeftWithZero3`, `strPadLeftWithZero4`
- `strSplit`, `strForSplit`
- `strTrim`
- `strUpper`, `strUpperLocale`
- `str` - stringify
