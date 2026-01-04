import {flip} from '../fp/common';
import {strCompareAlphanumeric} from '../str/util';

export const arrayConcat =
  <T>(left: T[]) =>
  (right: T[]) => [...left, ...right];

export const arrayEach =
  <T, R>(fnEach: (ii: T, index: number, all: T[]) => R) =>
  (val: T[]) => {
    val.forEach(fnEach);
  };
export const arrayForEach = flip(arrayEach);

export const arrayEvery =
  <T>(fnEvery: (ii: T, index: number, all: T[]) => boolean) =>
  (val: T[]) =>
    val.length > 0 && val.every(fnEvery);
export const arrayForEvery = flip(arrayEvery);

export const arrayFind =
  <T>(fnFind: (ii: T, index: number, all: T[]) => boolean) =>
  (val: T[]) =>
    val.find(fnFind);
export const arrayForFind = flip(arrayFind);

/** flattens 1 level */
export const arrayFlat = <T>(val: T[][]) => val.flat();

export const arrayFilter =
  <T>(fnFilter: (ii: T, index: number, all: T[]) => boolean) =>
  (val: T[]) =>
    val.filter(fnFilter);
export const arrayForFilter = flip(arrayFilter);

export const arrayIncludes =
  <T>(search: T) =>
  (val: T[]) =>
    val.includes(search);
export const arrayForInclude = flip(arrayIncludes);

export const arrayJoin =
  (separator: string) =>
  <T>(val: T[]) =>
    val.join(separator);
export const arrayForJoin = flip(arrayJoin);

export const arrayMap =
  <T, R>(fnMap: (ii: T, index: number, all: T[]) => R) =>
  (val: T[]) =>
    val.map(fnMap);
export const arrayForMap = flip(arrayMap);

/**
 * `init` is a factory function for starting accumulator value
 * (is a function to prevent by-reference problems)
 **/
export const arrayReduce =
  <R>(init: () => R) =>
  <T>(fnReduce: (acc: R, ii: T, index: number, all: T[]) => R) =>
  (val: T[]) =>
    val.reduce(fnReduce, init());

/** removes value from array if it exists */
export const arrayRemove =
  <T>(value: T) =>
  (val: T[]) =>
    val.includes(value) ? val.filter((ii) => ii !== value) : val;
export const arrayForRemove = flip(arrayRemove);

export const arraySome =
  <T>(fnSome: (ii: T, index: number, all: T[]) => boolean) =>
  (val: T[]) =>
    val.some(fnSome);
export const arrayForSome = flip(arraySome);

export const arraySort =
  <T>(fnCompare?: (aa: T, bb: T) => number) =>
  (val: T[]) =>
    [...val].sort(fnCompare);
export const arrayForSort = flip(arraySort);

export const arrayFilterNotEmpty = <T>(items: (T | undefined | null | '')[]) =>
  arrayFilter<T | undefined | null | ''>((ii) => ii !== undefined && ii !== null && ii !== '')(items) as T[];

/** Extracts `key` of every object in array and reduces to distinct array. */
export const arrayExtractDistinctValuesOfKey = <T, K extends keyof T>(key: K) =>
  arrayReduce<T[K][]>(() => [])((acc, ii: T) => (acc.includes(ii[key]) ? acc : [...acc, ii[key]]));

/** Removes duplicates. */
export const arrayUnique = <T>(items: T[]) => [...new Set(items)];

export function arraySortByKey<T>(vals: T[], ...keys: (keyof T)[]): T[];
export function arraySortByKey<T>(vals: (T | null | undefined)[], ...keys: (keyof T)[]): (T | null | undefined)[];
export function arraySortByKey<T>(vals: T[] | null | undefined, ...keys: (keyof T)[]): T[] | null | undefined;
export function arraySortByKey<T>(
  vals: (T | null | undefined)[] | null | undefined,
  ...keys: (keyof T)[]
): (T | null | undefined)[] | null | undefined;
export function arraySortByKey<T>(vals: (T | null | undefined)[] | null | undefined, ...keys: (keyof T)[]) {
  return !vals
    ? vals
    : [...vals].sort((aa, bb) => keys.reduce((acc, key) => (!acc ? strCompareAlphanumeric('' + aa?.[key], '' + bb?.[key]) : acc), 0));
}
