import {dateEqual, dateMax, dateMin} from './compare';

describe(`date compare`, () => {
  describe(`dateEqual`, () => {
    it(`equals`, () => expect(dateEqual('2000-01-02')('2000-01-02')).toBe(true));
    it(`equals not`, () => expect(dateEqual('2000-01-02')('2000-01-03')).toBe(false));
  });

  describe(`dateMax`, () => {
    it(`maxs`, () => expect(dateMax([new Date(3), new Date(0), new Date(123)])).toStrictEqual(new Date(123)));
  });

  describe(`dateMin`, () => {
    it(`mins`, () => expect(dateMin([new Date(3), new Date(0), new Date(123)])).toStrictEqual(new Date(0)));
  });
});
