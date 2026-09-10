/**
 * @module astronomy/astronomy
 */

import {
  create_calendar_date,
  normalize_calendar_date,
} from '../calendar';
import { get_sun_ecliptic_longitude as get_sun_ecliptic_longitude_from_adapter } from './sowngwala_adapter';

const DAY_MS = 24 * 60 * 60 * 1000;
const TOLERANCE_MS = 1000;

const normalize_longitude = longitude => {
  const value = longitude % 360;
  return value < 0 ? value + 360 : value;
};

const get_continuous_longitude = (value, previous) => {
  let longitude = normalize_longitude(value);

  while (longitude < previous) {
    longitude += 360;
  }

  return longitude;
};

/**
 * Returns the Sun's ecliptic longitude.
 *
 * @param {*} value
 * @returns {number}
 */
export const get_sun_ecliptic_longitude = value =>
  get_sun_ecliptic_longitude_from_adapter(value);

/**
 * Returns a solar-term target longitude.
 *
 * @param {number} index
 * @returns {number}
 */
export const get_solar_term_target_longitude = index =>
  normalize_longitude(315 + index * 15);

/**
 * Searches a longitude boundary.
 *
 * @param {*} start
 * @param {*} end
 * @param {number} target_longitude
 * @returns {CalendarDate}
 */
export const search_longitude_boundary = (
  start,
  end,
  target_longitude
) => {
  const start_date = normalize_calendar_date(start);
  const end_date = normalize_calendar_date(end);

  if (start_date.timestamp >= end_date.timestamp) {
    throw new TypeError('Invalid search range.');
  }

  const start_longitude = normalize_longitude(
    get_sun_ecliptic_longitude(start_date)
  );
  const target = normalize_longitude(target_longitude);
  const search_target =
    target < start_longitude ? target + 360 : target;

  let left = start_date.timestamp;
  let left_longitude = start_longitude;
  let right = left;

  for (
    let cursor = left + DAY_MS;
    cursor <= end_date.timestamp;
    cursor += DAY_MS
  ) {
    const current_longitude = get_continuous_longitude(
      get_sun_ecliptic_longitude(new Date(cursor)),
      left_longitude
    );

    if (current_longitude >= search_target) {
      right = cursor;
      break;
    }

    left = cursor;
    left_longitude = current_longitude;
  }

  if (right === left) {
    throw new Error('Boundary not found.');
  }

  while (right - left > TOLERANCE_MS) {
    const middle = Math.floor((left + right) / 2);
    const middle_longitude = get_continuous_longitude(
      get_sun_ecliptic_longitude(new Date(middle)),
      left_longitude
    );

    if (middle_longitude >= search_target) {
      right = middle;
    } else {
      left = middle;
      left_longitude = middle_longitude;
    }
  }

  return create_calendar_date(new Date(right));
};
