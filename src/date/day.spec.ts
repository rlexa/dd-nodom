import {msDay, Weekday} from './const';
import {isLocalIsoWeekWorkDay, isUtcWeekWorkDay} from './day';

describe(`date day`, () => {
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
