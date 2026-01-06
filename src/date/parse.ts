import {compose} from '../fp';

/** checks `Date` instance and additionally the actual time value */
export const isValidDate = (val: unknown): val is Date => val instanceof Date && !isNaN(val as never);

/**
 * parses as `Date` instance
 *
 * **CAUTION**: stringified dates without timezone are created as if value came from local timezone
 * @example
 * ```
 *   // when e.g. in German timezone this leads to a different behavior than standard new Date()
 *   asDate('2000-01-01').toISOString();   // > '1999-12-31T23:00:00.000Z'
 *   new Date('2000-01-01').toISOString(); // > '2000-01-01T00:00:00.000Z'
 * ```
 **/
export function asDate(val: Date | string | number): Date;
export function asDate(val: null): null;
export function asDate(val: Date | string | number | null): Date | null;
export function asDate(val: Date | string | number | null): Date | null {
  if (val instanceof Date) {
    return val;
  }

  if (typeof val === 'number') {
    return new Date(val);
  }

  if (typeof val === 'string') {
    // !!! without 'T' new Date(val) creates it assuming "UTC" but we assume "local timezone"
    return new Date(val.includes('T') ? val : `${val}T00:00:00.000`);
  }

  return null;
}

/** parses date value as `Date` instance (see special rules in {@link asDate}), throws if `null` */
export function asDateNonNull(val: Exclude<Parameters<typeof asDate>[0], null>) {
  const ret = asDate(val);
  if (ret === null) {
    throw new Error(`Parsed null date should not be null.`);
  }
  return ret;
}

export const dateCopy = compose(asDateNonNull, (date) => date.getTime(), asDateNonNull);
