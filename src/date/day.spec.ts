import {msDay, Weekday} from './const';
import {isUtcWeekWorkDay} from './day';

describe(`date day`, () => {
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
