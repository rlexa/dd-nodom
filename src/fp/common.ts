/**
 * ```
 * coalesce(3)(1) ~> 1
 * coalesce(3)(undefined) ~> 3
 * ```
 **/
export const coalesce =
  <T>(fallback: T) =>
  (val: T | null | undefined) =>
    val ?? fallback;

/**
 * ```
 * (a, b) => r ~~> (a) => (b) => r
 * ```
 **/
export const curry =
  <R, T0, T1>(fn: (arg0: T0, arg1: T1) => R) =>
  (arg0: T0) =>
  (arg1: T1) =>
    fn(arg0, arg1);

/**
 * Finds first non-null returned value or default returned value
 *
 * ```
 * const nrToStr = (nr: number) => `#${nr}`
 * const onEven = (nr: number) => (!(nr % 2) ? 'even' : null);
 * const onOdd = (nr: number) => (!(nr % 2) ? null : 'odd');
 * const findNrStringifier = findOrDefault(nrToStr);
 *
 * findNrStringifier([])(3); // '#3'
 * findNrStringifier([onEven])(3); // '#3'
 * findNrStringifier([onEven])(2); // 'even'
 * findNrStringifier([onEven, onOdd])(3); // 'odd'
 * ```
 *
 **/
export const findOrDefault =
  <T, R>(defaultValueGetter: (param: T) => R) =>
  (checks: ((param: T) => R | null)[]) =>
  (param: T) =>
    checks.reduce<R | null>((acc, check) => acc ?? check(param), null) ?? defaultValueGetter(param);

/**
 * ```
 * (a, b) => r ~~> (b) => (a) => r
 * ```
 **/
export const flip =
  <R, T0, T1>(fn: (arg0: T0) => (arg1: T1) => R) =>
  (arg1: T1) =>
  (arg0: T0) =>
    fn(arg0)(arg1);

export const not = <T>(val: T) => !val;
