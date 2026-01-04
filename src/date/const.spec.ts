import {msDay, msHour, msMinute, msSecond, msWeek} from './const';

describe(`date const`, () => {
  test(`has main ms values`, () => {
    expect(msSecond).toBe(1000);
    expect(msMinute).toBe(1000 * 60);
    expect(msHour).toBe(1000 * 60 * 60);
    expect(msDay).toBe(1000 * 60 * 60 * 24);
    expect(msWeek).toBe(1000 * 60 * 60 * 24 * 7);
  });
});
