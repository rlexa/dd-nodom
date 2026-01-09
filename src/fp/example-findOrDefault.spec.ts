import {isNullUndefined} from '../common';
import {findOrDefault} from './common';

const handleErrorCode = (err: unknown) => (typeof err !== 'number' ? null : `Error code: ${err}`);
const handleErrorObject = (err: unknown) =>
  isNullUndefined(err) || typeof err !== 'object' || !('message' in err) || typeof err.message !== 'string'
    ? null
    : `Error message: ${err.message}`;

const handleErrorFactory = findOrDefault(() => `Unknown error`);
const handleError = handleErrorFactory([handleErrorCode, handleErrorObject]);

describe(`example findOrDefault`, () => {
  it(`handles`, () => {
    expect(handleError(null)).toBe('Unknown error');
    expect(handleError(123)).toBe('Error code: 123');
    expect(handleError({message: 'Oh noez!'})).toBe('Error message: Oh noez!');
  });
});
