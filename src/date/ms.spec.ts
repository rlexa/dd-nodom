import {asTimeValue} from './ms';

describe(`date ms`, () => {
  describe(`asTimeValue`, () => {
    it(`transforms e.g. string to ms`, () => expect(asTimeValue('1970-01-01T00:00:01.234Z')).toBe(1234));
  });
});
