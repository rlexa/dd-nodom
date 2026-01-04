import {asDate} from './date';
import {
  asLocalIsoWeek,
  asLocalIsoWeekString,
  asLocalIsoYear,
  asLocalIsoYearWeek,
  dateMoveToStartOfLocalIsoWeek,
  dateStartOfLocalIsoYearWeek,
} from './iso-year-week';

describe(`date iso-year-week`, () => {
  describe(`asIsoYearWeek/IsoYear/IsoWeek, asLocalIsoWeekString`, () => {
    const fromTo = [
      {from: '2005-01-02', week: 53, year: 2004, iso: '2004-W53'},
      {from: '2005-12-31', week: 52, year: 2005, iso: '2005-W52'},
      {from: '2006-01-01', week: 52, year: 2005, iso: '2005-W52'},
      {from: '2006-01-02', week: 1, year: 2006, iso: '2006-W01'},
      {from: '2007-01-01', week: 1, year: 2007, iso: '2007-W01'},
      {from: '2010-01-03', week: 53, year: 2009, iso: '2009-W53'},
      {from: '2023-01-01', week: 52, year: 2022, iso: '2022-W52'},
      {from: '2023-01-08', week: 1, year: 2023, iso: '2023-W01'},
      {from: '2024-01-07', week: 1, year: 2024, iso: '2024-W01'},
    ];

    fromTo.forEach(({from, year, week, iso}) => {
      it(`transforms ${from} to year:week = ${year}:${week}`, () => expect(asLocalIsoYearWeek(from)).toStrictEqual([year, week]));

      it(`transforms ${from} to week = ${week}`, () => expect(asLocalIsoWeek(from)).toBe(week));

      it(`transforms ${from} to year = ${year}`, () => expect(asLocalIsoYear(from)).toBe(year));

      it(`stringifies ${from} to iso = "${iso}"`, () => expect(asLocalIsoWeekString(from)).toBe(iso));
    });
  });

  describe(`dateMoveToStartOfLocalIsoWeek`, () => {
    it(`moves down`, () => expect(dateMoveToStartOfLocalIsoWeek(asDate('2025-07-17'))(28)).toStrictEqual(asDate('2025-07-07')));

    it(`moves up`, () => expect(dateMoveToStartOfLocalIsoWeek(asDate('2025-07-17'))(32)).toStrictEqual(asDate('2025-08-04')));
  });

  describe(`dateStartOfLocalIsoYearWeek`, () => {
    it(`transforms first`, () => expect(dateStartOfLocalIsoYearWeek([2025, 1])).toStrictEqual(asDate('2024-12-30')));
    it(`transforms some`, () => expect(dateStartOfLocalIsoYearWeek([2025, 33])).toStrictEqual(asDate('2025-08-11')));
    it(`transforms last`, () => expect(dateStartOfLocalIsoYearWeek([2025, 52])).toStrictEqual(asDate('2025-12-22')));
  });
});
