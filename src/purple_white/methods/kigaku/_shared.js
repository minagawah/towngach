/**
 * Shared calculations for modern Kigaku and
 * Mizuno-style Kigaku.
 *
 * @module purple_white/methods/kigaku/_shared
 */

/**
 * Normalized Towngach calendar date.
 * @typedef {import('../../../calendar').CalendarDate} CalendarDate
 */

/**
 * Solar Term identifier.
 * @typedef {import('../../../solar_term').SolarTerm} SolarTerm
 */

/**
 * Sexagenary definition.
 * @typedef {import('../../../sexagen').SexagenDefinition} SexagenDefinition
 */

/**
 * Purple-White star identifier.
 * @typedef {import('../../core/nine_stars/star').PurpleWhiteStar} PurpleWhiteStar
 */

/**
 * Purple-White calculation result.
 * @typedef {import('../../core/utils/purple_white').PurpleWhiteResult} PurpleWhiteResult
 */

import { normalize_calendar_date } from '../../../calendar';
import {
  get_solar_term_start,
  get_solar_terms,
} from '../../../solar_term';
import {
  get_sexagen_by_index,
  get_sexagen_definition,
} from '../../../sexagen';
import { get_purple_white_star } from '../../core/nine_stars/star';
import { create_purple_white_flight } from '../../core/movement/flight';
import { create_purple_white_result } from '../../core/utils/purple_white';

const DAY_MS = 24 * 60 * 60 * 1000;
const DAY_REFERENCE = Date.UTC(2000, 0, 7);

export const MONTH_TERMS = Object.freeze([
  'li_chun',
  'jing_zhe',
  'qing_ming',
  'li_xia',
  'mang_zhong',
  'xiao_shu',
  'li_qiu',
  'bai_lu',
  'han_lu',
  'li_dong',
  'da_xue',
  'xiao_han',
]);

export const HOURLY_GROUPS = Object.freeze({
  group_a: Object.freeze([
    'dong_zhi',
    'jing_zhe',
    'qing_ming',
    'li_xia',
    'mang_zhong',
    'xiao_shu',
  ]),
  group_b: Object.freeze([
    'li_chun',
    'chun_fen',
    'gu_yu',
    'da_shu',
    'li_qiu',
    'bai_lu',
  ]),
  group_c: Object.freeze([
    'yu_shui',
    'xiao_man',
    'xia_zhi',
    'chu_shu',
    'qiu_fen',
    'shuang_jiang',
    'xiao_xue',
    'da_xue',
  ]),
});

const get_boundary_candidates = (solar_term, year) =>
  [year - 1, year, year + 1].map(
    candidate_year =>
      get_solar_term_start(solar_term, candidate_year).date
  );

/**
 * Returns the latest astronomical boundary.
 *
 * @function get_latest_boundary
 * @param {*} date Date-like value.
 * @param {Array.<SolarTerm>} solar_terms Boundary terms.
 * @returns {{solar_term: SolarTerm, date: CalendarDate}}
 */
export const get_latest_boundary = (date, solar_terms) => {
  const normalized = normalize_calendar_date(date);
  return solar_terms
    .flatMap(solar_term =>
      get_boundary_candidates(
        solar_term,
        normalized.year
      ).map(boundary => ({ solar_term, date: boundary }))
    )
    .filter(
      item => item.date.timestamp <= normalized.timestamp
    )
    .sort(
      (left, right) =>
        left.date.timestamp - right.date.timestamp
    )
    .at(-1);
};

/**
 * Returns the latest Solar Term boundary.
 *
 * @function get_latest_solar_term
 * @param {*} date Date-like value.
 * @returns {{solar_term: SolarTerm, date: CalendarDate}}
 */
export const get_latest_solar_term = date =>
  get_latest_boundary(date, get_solar_terms());

/**
 * Returns the year selected by the Beginning of Spring boundary.
 *
 * @function get_effective_year
 * @param {*} date Date-like value.
 * @returns {number} Effective year.
 */
export const get_effective_year = date =>
  get_latest_boundary(date, ['li_chun']).date.year;

/**
 * Returns the reverse annual star number.
 *
 * @function get_year_star_number
 * @param {number} year Effective year.
 * @returns {number} Star number from one through nine.
 */
export const get_year_star_number = year => {
  const number = 11 - (year % 9);
  return number > 0 ? number : number + 9;
};

/**
 * Returns the reverse monthly star number.
 *
 * @function get_month_star_number
 * @param {*} date Date-like value.
 * @param {number} effective_year Effective year.
 * @returns {number} Star number from one through nine.
 */
export const get_month_star_number = (
  date,
  effective_year
) => {
  const boundary = get_latest_boundary(date, MONTH_TERMS);
  const month_index = MONTH_TERMS.indexOf(
    boundary.solar_term
  );
  const branch_index =
    (((effective_year + 8) % 12) + 12) % 12;
  const starting_star = [0, 3, 6, 9].includes(branch_index)
    ? 8
    : [2, 5, 8, 11].includes(branch_index)
      ? 5
      : 2;

  return (
    ((((starting_star - 1 - month_index) % 9) + 9) % 9) + 1
  );
};

/**
 * Returns the traditional day date.
 *
 * @function get_traditional_day
 * @param {*} date Date-like value.
 * @returns {Date} UTC date at the traditional day start.
 */
export const get_traditional_day = date => {
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
 * Returns the zero-based sexagenary-day index.
 *
 * @function get_day_index
 * @param {*} date Date-like value.
 * @returns {number} Index from zero through 59.
 */
export const get_day_index = date => {
  const traditional_day = get_traditional_day(date);
  const offset = Math.floor(
    (traditional_day.getTime() - DAY_REFERENCE) / DAY_MS
  );
  return ((offset % 60) + 60) % 60;
};

/**
 * Returns sexagenary-day metadata.
 *
 * @function get_day_sexagen
 * @param {*} date Date-like value.
 * @returns {SexagenDefinition} Sexagenary-day metadata.
 */
export const get_day_sexagen = date => {
  const index = get_day_index(date);
  const sexagen = get_sexagen_by_index(index);
  return {
    index,
    sexagen,
    ...get_sexagen_definition(sexagen),
  };
};

/**
 * Returns the traditional double-hour index.
 *
 * @function get_time_index
 * @param {*} date Date-like value.
 * @returns {number} Index from zero through 11.
 */
export const get_time_index = date => {
  const hour = normalize_calendar_date(date).hour;
  return Math.floor(((hour + 1) % 24) / 2);
};

/**
 * Creates a shared Purple-White method result.
 *
 * @function get_result
 * @param {string} method Method identifier.
 * @param {string} period Calculation period.
 * @param {number} star_number Star number.
 * @param {string} mode Yin/Yang mode.
 * @param {Object} [metadata] Method-specific metadata.
 * @returns {PurpleWhiteResult} Normalized result.
 */
export const get_result = (
  method,
  period,
  star_number,
  mode,
  metadata = {}
) => {
  const star = get_purple_white_star(star_number);
  const direction = mode === 'yang' ? 'forward' : 'reverse';
  return create_purple_white_result({
    method,
    period,
    star,
    palace: 'center',
    direction,
    flight: create_purple_white_flight(
      star,
      'center',
      direction
    ),
    mode,
    ...metadata,
  });
};

/**
 * Returns the Mizuno hourly Solar Term group.
 *
 * @function get_solar_term_group
 * @param {SolarTerm} solar_term Solar Term identifier.
 * @returns {string} Group identifier.
 */
export const get_solar_term_group = solar_term =>
  Object.entries(HOURLY_GROUPS).find(([, terms]) =>
    terms.includes(solar_term)
  )?.[0] || 'group_c';
