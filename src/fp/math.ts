/** (a) => (b) => a + b */
export const add =
  (arg0: number) =>
  (arg1: number): number =>
    arg0 + arg1;

/** (a) => (b) => a * b */
export const mult =
  (arg0: number) =>
  (arg1: number): number =>
    arg0 * arg1;
