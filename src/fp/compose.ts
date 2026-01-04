/**
 * @returns a function which applies functions from right to left.
 *
 * @example
 * ```
 * const double = (nr: number) => nr * 2;
 * const increment = (nr: number) => nr + 1;
 * const stringify = (arg: unknown) => String(arg);
 *
 * const incrementDoubleStringify = compose(stringify, double, increment);
 * incrementDoubleStringify(1); // => '4'
 * incrementDoubleStringify(3); // => '8'
 * ```
 */
export function compose<R, T0>(fn0: (arg: T0) => R): (arg: T0) => R;
export function compose<R, T0, T1>(fn1: (arg: T1) => R, fn0: (arg: T0) => T1): (arg: T0) => R;
export function compose<R, T0, T1, T2>(fn2: (arg: T2) => R, fn1: (arg: T1) => T2, fn0: (arg: T0) => T1): (arg: T0) => R;
export function compose<R, T0, T1, T2, T3>(
  fn3: (arg: T3) => R,
  fn2: (arg: T2) => T3,
  fn1: (arg: T1) => T2,
  fn0: (arg: T0) => T1,
): (arg: T0) => R;
export function compose<R, T0, T1, T2, T3, T4>(
  fn4: (arg: T4) => R,
  fn3: (arg: T3) => T4,
  fn2: (arg: T2) => T3,
  fn1: (arg: T1) => T2,
  fn0: (arg: T0) => T1,
): (arg: T0) => R;
export function compose<R, T0, T1, T2, T3, T4, T5>(
  fn5: (arg: T5) => R,
  fn4: (arg: T4) => T5,
  fn3: (arg: T3) => T4,
  fn2: (arg: T2) => T3,
  fn1: (arg: T1) => T2,
  fn0: (arg: T0) => T1,
): (arg: T0) => R;
export function compose<R, T0, T1, T2, T3, T4, T5, T6>(
  fn6: (arg: T6) => R,
  fn5: (arg: T5) => T6,
  fn4: (arg: T4) => T5,
  fn3: (arg: T3) => T4,
  fn2: (arg: T2) => T3,
  fn1: (arg: T1) => T2,
  fn0: (arg: T0) => T1,
): (arg: T0) => R;
export function compose<R, T0, T1, T2, T3, T4, T5, T6, T7>(
  fn7: (arg: T7) => R,
  fn6: (arg: T6) => T7,
  fn5: (arg: T5) => T6,
  fn4: (arg: T4) => T5,
  fn3: (arg: T3) => T4,
  fn2: (arg: T2) => T3,
  fn1: (arg: T1) => T2,
  fn0: (arg: T0) => T1,
): (arg: T0) => R;
export function compose<R, T0, T1, T2, T3, T4, T5, T6, T7, T8>(
  fn8: (arg: T8) => R,
  fn7: (arg: T7) => T8,
  fn6: (arg: T6) => T7,
  fn5: (arg: T5) => T6,
  fn4: (arg: T4) => T5,
  fn3: (arg: T3) => T4,
  fn2: (arg: T2) => T3,
  fn1: (arg: T1) => T2,
  fn0: (arg: T0) => T1,
): (arg: T0) => R;
export function compose<R, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9>(
  fn9: (arg: T9) => R,
  fn8: (arg: T8) => T9,
  fn7: (arg: T7) => T8,
  fn6: (arg: T6) => T7,
  fn5: (arg: T5) => T6,
  fn4: (arg: T4) => T5,
  fn3: (arg: T3) => T4,
  fn2: (arg: T2) => T3,
  fn1: (arg: T1) => T2,
  fn0: (arg: T0) => T1,
): (arg: T0) => R;

export function compose(...fns: ((arg: unknown) => unknown)[]) {
  return (arg0: unknown): unknown =>
    fns.reduceRight((acc, fn, index) => {
      if ('function' !== typeof fn) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        throw new Error(`Found a non-function (${typeof fn}: ${fn as any}) at ${index}.`);
      }
      return fn(acc);
    }, arg0);
}
