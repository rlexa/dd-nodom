import {msDay, Weekday} from './const';
import {dateToLocalIsoWeekday, dateToUtcIsoWeekday, isLocalIsoWeekWorkDay, isUtcWeekWorkDay} from './day';
import {asDate} from './parse';

describe(`date day`, () => {
  describe(`dateTo...Weekday`, () => {
    describe(`dateToIsoWeekday`, () => {
      it('resolves Monday as 1', () => expect(dateToLocalIsoWeekday(asDate('2025-06-30'))).toBe(1));
      it('resolves Sunday as 7', () => expect(dateToLocalIsoWeekday(asDate('2025-06-29'))).toBe(7));
    });

    describe(`dateToUtcIsoWeekday`, () => {
      it('resolves Monday as 1', () => expect(dateToUtcIsoWeekday(asDate('2025-06-30T14:00:00.000Z'))).toBe(1));
      it('resolves Sunday as 7', () => expect(dateToUtcIsoWeekday(asDate('2025-06-29T14:00:00.000Z'))).toBe(7));
    });
  });

  describe(`isLocalIsoWeekWorkDay`, () => {
    it('friday work day', () => expect(isLocalIsoWeekWorkDay('2025-07-04')).toBe(true));
    it('saturday not work day', () => expect(isLocalIsoWeekWorkDay('2025-07-05')).toBe(false));
    it('sunday not work day', () => expect(isLocalIsoWeekWorkDay('2025-07-06')).toBe(false));
    it('monday work day', () => expect(isLocalIsoWeekWorkDay('2025-07-07')).toBe(true));
  });

  describe(`isUtcWeekWorkDay`, () => {
    it(`transforms correctly`, () =>
      expect(
        Object.values(Weekday).every((_, ii) => {
          const date = new Date(ii * msDay);
          return (
            isUtcWeekWorkDay(date) ===
            (date.getUTCDay() !== (Weekday.Saturday as number) && date.getUTCDay() !== (Weekday.Sunday as number))
          );
        }),
      ).toBeTruthy());
  });
});
