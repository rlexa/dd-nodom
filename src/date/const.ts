/** Standard JS `Date.getDay` */
export enum Weekday {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

/** Mo-Su: 1-7 **CAUTION** not standard JS `Date.getDay`, see {@link Weekday} */
export enum IsoWeekday {
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
  Sunday = 7,
}

export type DateDiffLevel = 'ms' | 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'years';

/** wikipedia good-enough average */
export const avgDaysPerMonth = 30.436_875;
/** wikipedia good-enough average */
export const avgDaysPerYear = 365.25;

export const msSecond = 1000;
export const msMinute = 60 * msSecond;
export const msHour = 60 * msMinute;
export const msDay = 24 * msHour;
export const msWeek = 7 * msDay;
export const msMonth = avgDaysPerMonth * msDay;
export const msYear = avgDaysPerYear * msDay;

export const dateZero = new Date(0);

/** offset between local client timezone and UTC */
export const msLocalTimezoneToUtc = new Date().getTimezoneOffset() * msMinute;
