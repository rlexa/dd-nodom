export const abs = (arg: number) => Math.abs(arg);

/** (a) => (b) => a + b */
export const add =
  (arg0: number) =>
  (arg1: number): number =>
    arg0 + arg1;

export const ceil = (arg: number) => Math.ceil(arg);

/** (a) => (b) => a / b */
export const div =
  (arg0: number) =>
  (arg1: number): number =>
    arg0 / arg1;

export const floor = (arg: number) => Math.floor(arg);

export const max = (args: number[]) => Math.max(...args);

export const min = (args: number[]) => Math.min(...args);

/** (a) => (b) => a * b */
export const mult =
  (arg0: number) =>
  (arg1: number): number =>
    arg0 * arg1;

export const round = (arg: number) => Math.round(arg);

/** (a) => (b) => a - b */
export const sub =
  (arg0: number) =>
  (arg1: number): number =>
    arg0 - arg1;
