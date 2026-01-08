import {arrayForInclude} from './util';

export enum ValidColor {
  BLUE = 'blue',
  GREEN = 'green',
  RED = 'red',
}
const isValidColor = arrayForInclude(Object.values(ValidColor) as string[]);

describe(`example arrayForInclude`, () => {
  it(`checks`, () => {
    expect(isValidColor(ValidColor.BLUE)).toBe(true);
    expect(isValidColor('yellow')).toBe(false);
  });
});
