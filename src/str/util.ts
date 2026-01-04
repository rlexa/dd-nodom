import {isNullUndefined} from '../common/util';
import {flip} from '../fp/common';

// #region common

/** stringifies  */
export const str = (val: unknown) => (isNullUndefined(val) ? null : typeof val === 'string' ? val : String(val));
export const strNonNull = (val: unknown) => str(val) ?? '';

// #endregion
// #region compare

export const strCompare = (aa: string | null | undefined, bb: string | null | undefined) => (aa ?? '').localeCompare(bb ?? '');
export const strCompareAlphanumeric = (aa: string | null | undefined, bb: string | null | undefined) =>
  (aa ?? '').localeCompare(bb ?? '', 'en-US', {numeric: true});

// #endregion
// #region include

export const strIncludes = (token: string) => (text: string) => text.includes(token);
export const strForIncludes = flip(strIncludes);

// #endregion
// #region pad

export const strPadLeft = (padWith: string) => (max: number) => (val: string | null) => val?.padStart(max, padWith) ?? null;
export const strPadLeftWithZero = strPadLeft('0');
export const strPadLeftWithZero2 = strPadLeftWithZero(2);
export const strPadLeftWithZero4 = strPadLeftWithZero(4);

// #endregion
// #region split

export const strSplit = (separator: string) => (val: string) => val.split(separator);
export const strForSplit = flip(strSplit);

// #endregion
// #region lowe/upper

export const strLower = (val: string) => val.toLowerCase();
export const strUpper = (val: string) => val.toUpperCase();
export const strLowerLocale = (val: string) => val.toLocaleLowerCase();
export const strUpperLocale = (val: string) => val.toLocaleUpperCase();

// #endregion
// #region trim

export const strTrim = (val: string) => val.trim();

// #endregion
