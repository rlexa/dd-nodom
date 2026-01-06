import {arrayJoin} from '../array';
import {ceil, compose} from '../fp';
import {strPadLeftWithZero2, strPadLeftWithZero4} from '../str';
import {msWeek, Weekday} from './const';
import {addLocalWeeks, dateMoveToStartOfLocalWorkWeek} from './mutate';
import {asDate, asDateNonNull} from './parse';

const joinIsoYearWeek = arrayJoin('-W');

export function dateToLocalIsoYearWeek(val: Date): [year: number, week: number] {
  const date = new Date(val.getTime());

  const diffToMonday = (date.getDay() + 6) % 7;
  // must move to Thursday
  date.setDate(date.getDate() - diffToMonday + 3);
  // move to midday to (maybe) prevent summer/winter time problem
  date.setHours(12, 0, 0, 0);
  const msThursday = date.getTime();
  // move to January 1st
  date.setMonth(0, 1);
  // move to year's first Thursday (iso week starts here)
  if (date.getDay() !== Weekday.Thursday.valueOf()) {
    date.setMonth(0, 1 + ((Weekday.Thursday - date.getDay() + 7) % 7));
  }

  const week = 1 + ceil((msThursday - date.getTime()) / msWeek);
  const year = week >= 52 && val.getMonth() < 1 ? val.getFullYear() - 1 : val.getFullYear();

  return [year, week];
}
export const asLocalIsoYearWeek = compose(dateToLocalIsoYearWeek, asDateNonNull);

export const dateToLocalIsoWeek = (val: Date) => dateToLocalIsoYearWeek(val)[1];
export const asLocalIsoWeek = compose(dateToLocalIsoWeek, asDateNonNull);

export const dateToLocalIsoYear = (val: Date) => dateToLocalIsoYearWeek(val)[0];
export const asLocalIsoYear = compose(dateToLocalIsoYear, asDateNonNull);

/** `2000-W01` ISO format */
export function dateToLocalIsoWeekString(val: Date) {
  const yearWeek = dateToLocalIsoYearWeek(val);
  return joinIsoYearWeek([strPadLeftWithZero4(yearWeek[0]), strPadLeftWithZero2(yearWeek[1])]);
}
/** `2000-W01` ISO format */
export const asLocalIsoWeekString = compose(dateToLocalIsoWeekString, asDateNonNull);

/** @returns `reference` clone date moved to start of `week` (as ISO week) */
export const dateMoveToStartOfLocalIsoWeek = (reference: Date) => (week: number) =>
  dateMoveToStartOfLocalWorkWeek(addLocalWeeks(week - dateToLocalIsoWeek(reference))(reference));

export const dateStartOfLocalIsoYearWeek = (isoYearWeek: [year: number, week: number]) =>
  dateMoveToStartOfLocalIsoWeek(asDate(`${isoYearWeek[0]}-01-15`))(isoYearWeek[1]);
