/**
 * @module purple_white/methods/houkan/_shared
 */

import { normalize_calendar_date } from '../../../calendar';
import { get_branch } from '../../../branch';

import {
  get_sexagen_by_index,
  get_sexagen_definition,
} from '../../../sexagen';

import {
  get_solar_term,
  get_solar_term_for_date,
  get_solar_term_index,
  get_solar_term_start,
} from '../../../solar_term';

import { create_purple_white_flight } from '../../core/movement/flight';
import { create_purple_white_result } from '../../core/utils/purple_white';
import { get_purple_white_star } from '../../core/nine_stars/star';

const HOUR_MS = 2 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;
const DAY_REFERENCE = Date.UTC(2000, 0, 7);

const YANG_DUN_TERMS = Object.freeze([
  'dongzhi',
  'yushui',
  'guyu',
]);

const YIN_DUN_TERMS = Object.freeze([
  'xiazhi',
  'chushu',
  'shuangjiang',
]);

const HOURLY_GROUPS = Object.freeze({
  upper: Object.freeze(['zi', 'wu', 'mao', 'you']),
  middle: Object.freeze(['yin', 'shen', 'si', 'hai']),
  lower: Object.freeze(['chen', 'xu', 'chou', 'wei']),
});

const STARTING_STARS = Object.freeze({
  yang: Object.freeze({ upper: 1, middle: 7, lower: 4 }),
  yin: Object.freeze({ upper: 9, middle: 3, lower: 6 }),
});

const get_traditional_day_date = date => {
  const normalized = normalize_calendar_date(date);
  const day = new Date(normalized.timestamp);

  if (normalized.hour >= 23)
    day.setUTCDate(day.getUTCDate() + 1);

  return new Date(
    Date.UTC(
      day.getUTCFullYear(),
      day.getUTCMonth(),
      day.getUTCDate()
    )
  );
};

/**
 * Returns the sexagenary day
 * (日干支) using the repository's
 * UTC date adapter.
 * 2000-01-07 is the implementation
 * reference treated as "甲子".
 *
 * @param {*} date
 * @returns {Object}
 */
export const get_houkan_day_sexagen = date => {
  const day = get_traditional_day_date(date);
  const offset = Math.floor(
    (day.getTime() - DAY_REFERENCE) / DAY_MS
  );
  const sexagen = get_sexagen_by_index(offset);

  return {
    sexagen,
    ...get_sexagen_definition(sexagen),
    traditional_day: day,
  };
};

/**
 * Returns the traditional double-hour
 * branch (時支). "子時" begins at 23:00.
 *
 * @param {*} date
 * @returns {Branch}
 */
export const get_houkan_hour_branch = date => {
  const hour = normalize_calendar_date(date).hour;
  return get_branch(Math.floor(((hour + 1) % 24) / 2));
};

/**
 * Determines the latest supported
 * Yin/Yang Dun (陰陽遁) boundary.
 *
 * @param {*} date
 * @returns {Object}
 */
export const determine_houkan_dun = date => {
  const normalized = normalize_calendar_date(date);

  const detected =
    get_solar_term_for_date(normalized).solar_term;

  const detected_index = get_solar_term_index(detected);

  const terms = [...YANG_DUN_TERMS, ...YIN_DUN_TERMS];

  const candidates = terms.map(solar_term => {
    const index = get_solar_term_index(solar_term);

    const year =
      index > detected_index
        ? normalized.year - 1
        : normalized.year;

    const date = get_solar_term_start(
      solar_term,
      year
    ).date;

    return { solar_term, date };
  });

  const applicable = candidates
    .filter(
      item => item.date.timestamp <= normalized.timestamp
    )
    .sort(
      (left, right) =>
        left.date.timestamp - right.date.timestamp
    )
    .at(-1);

  if (!applicable)
    throw new Error(
      'Unable to determine Houkan Dun boundary.'
    );

  return {
    ...applicable,
    dun: YANG_DUN_TERMS.includes(applicable.solar_term)
      ? 'yang'
      : 'yin',
  };
};

/**
 * Classifies an hourly branch into
 * the confirmed Three Yuan (三元) groups.
 *
 * @param {Branch} branch
 * @returns {string}
 */
export const determine_houkan_hourly_san_yuan = branch => {
  const san_yuan = Object.entries(HOURLY_GROUPS).find(
    ([, branches]) => branches.includes(branch)
  )?.[0];

  if (!san_yuan)
    throw new TypeError('Invalid hourly branch.');

  return san_yuan;
};

/**
 * Returns the confirmed hourly
 * origin star (時家起始星).
 *
 * @param {string} dun
 * @param {string} san_yuan
 * @returns {PurpleWhiteStar}
 */
export const get_houkan_hourly_starting_star = (
  dun,
  san_yuan
) => {
  const number = STARTING_STARS[dun]?.[san_yuan];
  if (!number)
    throw new TypeError('Invalid Houkan hourly origin.');
  return get_purple_white_star(number);
};

const get_day_start = day => day.getTime() - HOUR_MS / 2;

/**
 * Determines the latest "甲己"-day
 * (甲己日) "子"-hour (子時) origin
 * without
 * selecting a future boundary
 * or using an arbitrary search window.
 *
 * @param {*} date
 * @returns {Object}
 */
export const determine_houkan_hourly_origin = date => {
  const normalized = normalize_calendar_date(date);
  const day = get_houkan_day_sexagen(normalized);
  const days_from_jia_ji = day.index % 5;

  const origin_day = new Date(
    day.traditional_day.getTime()
  );

  origin_day.setUTCDate(
    origin_day.getUTCDate() - days_from_jia_ji
  );

  const start = get_day_start(origin_day);

  const elapsed = normalized.timestamp - start;
  if (elapsed < 0)
    throw new Error(
      'Houkan hourly origin begins in the future.'
    );

  return {
    start: new Date(start),
    origin_day,
    elapsed_hours: Math.floor(elapsed / HOUR_MS),
    day_sexagen: day,
  };
};

/**
 * Creates the shared Purple-White
 * flight (紫白飛泊) result.
 *
 * @param {number} star_number
 * @param {string} dun
 * @returns {PurpleWhiteResult}
 */
export const create_houkan_result = (star_number, dun) => {
  const direction = dun === 'yang' ? 'forward' : 'reverse';
  const star = get_purple_white_star(star_number);

  const flight = create_purple_white_flight(
    star,
    'center',
    direction
  );

  return create_purple_white_result({
    star,
    palace: 'center',
    direction,
    flight,
  });
};

/**
 * Determines the active actual
 * solar-term (節氣) boundary for
 * monthly logic.
 *
 * @param {*} date
 * @returns {Object}
 */
export const determine_houkan_monthly_period = date => {
  const normalized = normalize_calendar_date(date);

  const detected =
    get_solar_term_for_date(normalized).solar_term;

  const index = get_solar_term_index(detected);

  let solar_term = detected;
  let year = normalized.year;
  let boundary = get_solar_term_start(
    solar_term,
    year
  ).date;

  if (boundary.timestamp > normalized.timestamp) {
    solar_term = get_solar_term(index - 1);
    if (index === 0) year -= 1;
    boundary = get_solar_term_start(solar_term, year).date;
  }

  return { solar_term, boundary, date: normalized };
};

export const HOUKAN_HOURLY_GROUPS = HOURLY_GROUPS;
export const HOUKAN_STARTING_STARS = STARTING_STARS;

export const HOUKAN_SOLAR_TERM_PERIODS = Object.freeze({
  yang: YANG_DUN_TERMS,
  yin: YIN_DUN_TERMS,
});
