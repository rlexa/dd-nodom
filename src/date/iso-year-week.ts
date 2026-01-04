import {arrayJoin} from '../array';
import {compose} from '../fp';
import {strPadLeftWithZero2, strPadLeftWithZero4} from '../str';
import {msWeek, Weekday} from './const';
import {addWeeks, asDate, asDateNonNull, dateStartOfLocalWorkWeek} from './date';

const joinIsoYearWeek = arrayJoin('-W');

export function dateToLocalIsoYearWeek(val: Date): [year: number, week: number] {
  const date = new Date(val.getTime());

  const diffToMonday = (date.getDay() + 6) % 7;
  // goto Thursday
  date.setDate(date.getDate() - diffToMonday + 3);
  // try to prevent possible summer/winter time issues
  date.setHours(12, 0, 0, 0);
  const msThursday = date.getTime();
  // goto 1st January
  date.setMonth(0, 1);
  // goto first Thursday of the year (which is definition of first iso week)
  if (date.getDay() !== Weekday.Thursday.valueOf()) {
    date.setMonth(0, 1 + ((Weekday.Thursday - date.getDay() + 7) % 7));
  }

  const week = 1 + Math.ceil((msThursday - date.getTime()) / msWeek);
  const year = week >= 52 && val.getMonth() < 1 ? val.getFullYear() - 1 : val.getFullYear();

  return [year, week];
}
export const dateToLocalIsoWeek = (val: Date) => dateToLocalIsoYearWeek(val)[1];
export const dateToLocalIsoYear = (val: Date) => dateToLocalIsoYearWeek(val)[0];

/** `2000-W01` ISO format */
export function dateToLocalIsoWeekString(val: Date) {
  const yearWeek = dateToLocalIsoYearWeek(val);
  return joinIsoYearWeek([strPadLeftWithZero4(String(yearWeek[0])), strPadLeftWithZero2(String(yearWeek[1]))]);
}

/** Moves the `reference` point Date to start of `week` ISO week number. */
export const dateMoveToStartOfLocalIsoWeek = (reference: Date) => (week: number) =>
  dateStartOfLocalWorkWeek(addWeeks(week - dateToLocalIsoWeek(reference))(reference));

export const dateStartOfLocalIsoYearWeek = (isoYearWeek: [year: number, week: number]) =>
  dateMoveToStartOfLocalIsoWeek(asDate(`${isoYearWeek[0]}-01-15`))(isoYearWeek[1]);

export const asLocalIsoYearWeek = compose(dateToLocalIsoYearWeek, asDateNonNull);
export const asLocalIsoWeek = compose(dateToLocalIsoWeek, asDateNonNull);
export const asLocalIsoYear = compose(dateToLocalIsoYear, asDateNonNull);
/** `2000-W01` ISO format */
export const asLocalIsoWeekString = compose(dateToLocalIsoWeekString, asDateNonNull);
