import {asIso, asIsoDatePart, asIsoHhMmPart, asLocalDatePart, asUtcHhMmPart} from './stringify';

describe('date stringify', () => {
  describe(`asIsoDate`, () => {
    it(`transforms`, () => expect(asIso(1234)).toBe('1970-01-01T00:00:01.234Z'));
  });

  describe(`asIsoDatePart`, () => {
    it(`transforms`, () => expect(asIsoDatePart(1234)).toBe('1970-01-01'));
  });

  describe(`asIsoHhMmPart`, () => {
    it(`transforms`, () => expect(asIsoHhMmPart('2000-01-02T11:22:33.444Z')).toBe('11:22'));
  });

  describe(`asLocalDatePart`, () => {
    it(`transforms`, () => expect(asLocalDatePart('2025-01-01')).toBe('2025-01-01'));
  });

  describe(`asUtcHhMmPart`, () => {
    it(`transforms`, () => expect(asUtcHhMmPart(1234)).toBe('00:00'));
  });
});
