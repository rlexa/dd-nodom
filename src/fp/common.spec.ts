import {coalesce, curry, findOrDefault, flip, not} from './common';

describe(`fp common`, () => {
  describe(`coalesce`, () => {
    test(`does not coalesce`, () => expect(coalesce(3)(1)).toBe(1));
    test(`does coalesce`, () => expect(coalesce(3)(undefined)).toBe(3));
  });

  describe(`curry`, () => {
    test(`transforms 2-arg to arg>arg`, () => expect(curry((aa: number, bb: number) => aa / bb)(6)(3)).toBe(2));
  });

  describe(`findOrDefault`, () => {
    const nrToStr = (val: number) => `#${val}`;
    const evenToStr = (val: number) => (!(val % 2) ? 'even' : null);
    const oddToStr = (val: number) => (!(val % 2) ? null : 'odd');
    const findHandlerForNr = findOrDefault(nrToStr);

    test(`finds fallback on empty`, () => expect(findHandlerForNr([])(3)).toBe('#3'));

    test(`finds fallback on no handler`, () => expect(findHandlerForNr([evenToStr])(3)).toBe('#3'));

    test(`finds handler`, () => expect(findHandlerForNr([evenToStr, oddToStr])(3)).toBe('odd'));
  });

  describe(`flip`, () => {
    test(`flips`, () => expect(flip((aa: number) => (bb: number) => aa - bb)(2)(6)).toBe(4));
  });

  describe(`not`, () => {
    test(`transforms false to true`, () => expect(not(false)).toBe(true));
    test(`transforms true to false`, () => expect(not(true)).toBe(false));
  });
});
