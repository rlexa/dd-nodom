import {compose} from './compose';

describe(`fp compose`, () => {
  const returnSelf = <T>(arg: T) => arg;
  const plusOne = (nr: number) => nr + 1;
  const stringify = (arg: unknown) => String(arg);

  it(`returns function`, () => expect(typeof compose(null as never)).toBe('function'));

  it(`throws on undefined`, () => {
    expect(() => compose(returnSelf, undefined as never, returnSelf)(123)).toThrow(
      new Error('Found a non-function (undefined: undefined) at 1.'),
    );
  });

  it(`throws on null`, () => {
    expect(() => compose(returnSelf, null as never, returnSelf)(123)).toThrow(new Error('Found a non-function (object: null) at 1.'));
  });

  it(`applies 1 fn`, () => expect(compose(plusOne)(1)).toBe(2));
  it(`applies 2 fns`, () => expect(compose(stringify, plusOne)(1)).toBe('2'));
  it(`applies 3 fns`, () => expect(compose(stringify, plusOne, plusOne)(1)).toBe('3'));
});
