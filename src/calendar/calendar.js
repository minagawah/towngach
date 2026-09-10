/**
 * A normalized calendar date used by
 * Towngach.
 *
 * Date fields represent a UTC instant. Object
 * inputs without a timezone are interpreted as UTC.
 *
 * @module calendar/calendar
 *
 * @typedef {Object} CalendarDate
 */

/**
 * A calendar range.
 *
 * @typedef {Object} CalendarRange
 */

/**
 * Creates a normalized calendar date.
 *
 * @typedef {function} create_calendar_date
 * @param {*} value
 * @returns {CalendarDate}
 */
const to_date = value => {
  if (value instanceof Date) {
    return new Date(value.getTime());
  }

  if (
    typeof value === 'number' ||
    typeof value === 'string'
  ) {
    return new Date(value);
  }

  if (value && typeof value === 'object') {
    if (value.date instanceof Date) {
      return new Date(value.date.getTime());
    }

    const year = value.year ?? 1970;
    const month = value.month ?? 1;
    const day = value.day ?? 1;
    const hour = value.hour ?? 0;
    const minute = value.minute ?? 0;
    const second = value.second ?? 0;
    const millisecond = value.millisecond ?? 0;

    return new Date(
      Date.UTC(
        year,
        month - 1,
        day,
        hour,
        minute,
        second,
        millisecond
      )
    );
  }

  return new Date(NaN);
};

/**
 * Creates a normalized calendar date.
 *
 * @typedef {function} create_calendar_date
 * @param {*} value
 * @returns {CalendarDate}
 */
export const create_calendar_date = value => {
  const date = to_date(value);

  if (Number.isNaN(date.getTime())) {
    throw new TypeError('Invalid calendar date.');
  }

  return Object.freeze({
    date,
    timestamp: date.getTime(),
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
    hour: date.getUTCHours(),
    minute: date.getUTCMinutes(),
    second: date.getUTCSeconds(),
    millisecond: date.getUTCMilliseconds(),
  });
};

/**
 * Checks whether a value is a calendar date.
 *
 * @typedef {function} is_calendar_date
 * @param {*} value
 * @returns {boolean}
 */
export const is_calendar_date = value =>
  Boolean(
    value &&
    typeof value === 'object' &&
    value.date instanceof Date &&
    Number.isFinite(value.timestamp)
  );

/**
 * Normalizes a supported calendar input.
 *
 * @typedef {function} normalize_calendar_date
 * @param {*} value
 * @returns {CalendarDate}
 */
export const normalize_calendar_date = value =>
  is_calendar_date(value)
    ? value
    : create_calendar_date(value);

/**
 * Compares two calendar dates.
 *
 * @typedef {function} compare_calendar_dates
 * @param {CalendarDate} first
 * @param {CalendarDate} second
 * @returns {number}
 */
export const compare_calendar_dates = (first, second) => {
  const left = normalize_calendar_date(first).timestamp;
  const right = normalize_calendar_date(second).timestamp;

  if (left < right) return -1;
  if (left > right) return 1;
  return 0;
};

/**
 * Checks whether a date is within a range.
 *
 * @typedef {function} is_calendar_date_in_range
 * @param {CalendarDate} date
 * @param {CalendarRange} range
 * @returns {boolean}
 */
export const is_calendar_date_in_range = (date, range) => {
  const current = normalize_calendar_date(date);
  const start = normalize_calendar_date(range.start);
  const end = normalize_calendar_date(range.end);

  return (
    compare_calendar_dates(current, start) >= 0 &&
    compare_calendar_dates(current, end) <= 0
  );
};

/**
 * Shared calendar helpers.
 *
 * @constant {Object}
 */
export const CALENDAR = Object.freeze({
  create_calendar_date,
  is_calendar_date,
  compare_calendar_dates,
  is_calendar_date_in_range,
  normalize_calendar_date,
});
