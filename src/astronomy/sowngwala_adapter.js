/**
 * @module astronomy/sowngwala_adapter
 */

import { chrono, sun } from 'sowngwala-js';
import { normalize_calendar_date } from '../calendar';

/**
 * Converts a Towngach date to sowngwala.
 *
 * The normalized Towngach date is an absolute UTC
 * instant. sowngwala receives the same fields as
 * a timezone-free datetime, so no local-time shift
 * is applied at this boundary.
 *
 * @param {*} value
 * @returns {Object}
 */
export const to_sowngwala_datetime = value => {
  const date = normalize_calendar_date(value);

  return chrono.NaiveDateTime.from_ymd_hmsn(
    date.year,
    date.month,
    date.day,
    date.hour,
    date.minute,
    date.second,
    date.millisecond * 1_000_000
  );
};

/**
 * Returns the Sun's ecliptic longitude.
 *
 * @param {*} value
 * @returns {number}
 */
export const get_sun_ecliptic_longitude = value => {
  const dt = to_sowngwala_datetime(value);
  const { coord } =
    sun.sun_ecliptic_from_generic_datetime(dt);

  return coord.lng;
};
