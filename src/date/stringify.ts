import {arrayJoin} from '../array/util';
import {compose} from '../fp/compose';
import {dateToLocalDayDateString, dateToUtcDayDateString} from './day';
import {dateToLocalHoursString, dateToUtcHoursString} from './hour';
import {dateToLocalMinutesString, dateToUtcMinutesString} from './minute';
import {dateToLocalMonthString, dateToUtcMonthString} from './month';
import {asDateNonNull} from './parse';
import {dateToLocalSeconds, dateToUtcSeconds} from './second';
import {dateToLocalYearString, dateToUtcYearString} from './year';

const joinDate = arrayJoin('-');
const joinDateTime = arrayJoin('T');
const joinTime = arrayJoin(':');

/** @returns ISO format `"2000-01-01T00:00:00.000Z"` */
export const dateToIso = (val: Date) => val.toISOString();
/** @returns ISO format `"2000-01-01T00:00:00.000Z"` */
export const asIso = compose(dateToIso, asDateNonNull);

/** @returns `"yyyy-mm-dd"` */
export const dateToLocalDatePart = (val: Date) =>
  joinDate([dateToLocalYearString(val), dateToLocalMonthString(val), dateToLocalDayDateString(val)]);
/** @returns `"yyyy-mm-dd"` */
export const asLocalDatePart = compose(dateToLocalDatePart, asDateNonNull);

/** @returns `"yyyy-mm-dd"` */
export const dateToUtcDatePart = (val: Date) =>
  joinDate([dateToUtcYearString(val), dateToUtcMonthString(val), dateToUtcDayDateString(val)]);
/** @returns `"yyyy-mm-dd"` */
export const asUtcDatePart = compose(dateToUtcDatePart, asDateNonNull);

/** @returns `"hh:mm"` */
export const dateToLocalHhMmPart = (val: Date) => joinTime([dateToLocalHoursString(val), dateToLocalMinutesString(val)]);
/** @returns `"hh:mm"` */
export const asLocalHhMmPart = compose(dateToLocalHhMmPart, asDateNonNull);

/** @returns `"hh:mm"` */
export const dateToUtcHhMmPart = (val: Date) => joinTime([dateToUtcHoursString(val), dateToUtcMinutesString(val)]);
/** @returns `"hh:mm"` */
export const asUtcHhMmPart = compose(dateToUtcHhMmPart, asDateNonNull);

/** @returns `"hh:mm:ss"` */
export const dateToLocalTimePart = (val: Date) => joinTime([dateToLocalHhMmPart(val), dateToLocalSeconds(val)]);
/** @returns `"hh:mm:ss"` */
export const asLocalTimePart = compose(dateToLocalTimePart, asDateNonNull);

/** @returns `"hh:mm:ss"` */
export const dateToUtcTimePart = (val: Date) => joinTime([dateToUtcHhMmPart(val), dateToUtcSeconds(val)]);
/** @returns `"hh:mm:ss"` */
export const asUtcTimePart = compose(dateToUtcTimePart, asDateNonNull);

/** @return `"yyyy-mm-ddThh:mm:ss"` */
export const dateToLocalDateTime = (val: Date) => joinDateTime([dateToLocalDatePart(val), dateToLocalTimePart(val)]);
/** @return `"yyyy-mm-ddThh:mm:ss"` */
export const asLocalDateTime = compose(dateToLocalDateTime, asDateNonNull);

/** @return `"yyyy-mm-ddThh:mm:ss"` */
export const dateToUtcDateTime = (val: Date) => joinDateTime([dateToUtcDatePart(val), dateToUtcTimePart(val)]);
/** @return `"yyyy-mm-ddThh:mm:ss"` */
export const asUtcDateTime = compose(dateToUtcDateTime, asDateNonNull);

/** @return `"yyyy-mm-dd"` part of ISO string */
export const isoToDatePart = (val: string) => val.substring(0, 'yyyy-mm-dd'.length);
/** @return `"yyyy-mm-dd"` part of ISO */
export const dateToIsoDatePart = compose(isoToDatePart, dateToIso);
/** @return `"yyyy-mm-dd"` part of ISO */
export const asIsoDatePart = compose(dateToIsoDatePart, asDateNonNull);

/** @return `"hh:mm"` part of ISO string */
export const isoToHhMmPart = (val: string) => val.substring('yyyy-mm-ddT'.length, 'yyyy-mm-ddThh:mm'.length);
/** @return `"hh:mm"` part of ISO string */
export const dateToIsoToHhMmPart = compose(isoToHhMmPart, dateToIso);
/** @return `"hh:mm"` part of ISO string */
export const asIsoHhMmPart = compose(dateToIsoToHhMmPart, asDateNonNull);
