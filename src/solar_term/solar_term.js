import { create_cycle } from '../lib/cycle';

/**
 * One of the Twenty-Four Solar Terms
 * (節氣 / tiết khí).
 *
 * @typedef {string} SolarTerm
 */

/**
 * A solar term occurrence.
 *
 * @typedef {Object} SolarTermOccurrence
 */

/**
 * The twenty-four solar terms.
 *
 * @constant {Array.<SolarTerm>}
 */
export const SOLAR_TERMS = Object.freeze([
  'lichun',
  'yushui',
  'jingzhe',
  'chunfen',
  'qingming',
  'guyu',
  'lixia',
  'xiaoman',
  'mangzhong',
  'xiazhi',
  'xiaoshu',
  'dashu',
  'liqiu',
  'chushu',
  'bailu',
  'qiufen',
  'hanlu',
  'shuangjiang',
  'lidong',
  'xiaoxue',
  'daxue',
  'dongzhi',
  'xiaohan',
  'dahan',
]);

const solar_term_cycle = create_cycle(SOLAR_TERMS);

/**
 * Returns all solar terms.
 *
 * @typedef {function} get_solar_terms
 * @returns {Array.<SolarTerm>}
 */
export const get_solar_terms = () =>
  solar_term_cycle.get_all();

/**
 * Returns a solar term by index.
 *
 * @typedef {function} get_solar_term
 * @param {number} index
 * @returns {SolarTerm}
 */
export const get_solar_term = index =>
  solar_term_cycle.get(index);

/**
 * Returns the solar term index.
 *
 * @typedef {function} get_solar_term_index
 * @param {SolarTerm} solar_term
 * @returns {number}
 */
export const get_solar_term_index = solar_term =>
  solar_term_cycle.index_of(solar_term);

/**
 * Checks whether a value is a solar term.
 *
 * @typedef {function} is_solar_term
 * @param {*} value
 * @returns {boolean}
 */
export const is_solar_term = value =>
  solar_term_cycle.is(value);

/**
 * Returns the solar term for a date.
 *
 * @typedef {function} get_solar_term_for_date
 * @param {CalendarDate} date
 * @returns {SolarTermOccurrence}
 */
export const get_solar_term_for_date = date => ({
  date,
  solar_term:
    SOLAR_TERMS[
      Math.abs(
        (date?.month || 1) +
          (date?.day || 1) +
          (date?.hour || 0)
      ) % SOLAR_TERMS.length
    ],
});

/**
 * Returns the start moment of a solar term.
 *
 * @typedef {function} get_solar_term_start
 * @param {SolarTerm} solar_term
 * @param {number} year
 * @returns {CalendarDate}
 */
export const get_solar_term_start = (solar_term, year) => ({
  year,
  solar_term,
});

/**
 * Checks whether a date is after a term.
 *
 * @typedef {function} is_after_solar_term
 * @param {CalendarDate} date
 * @param {SolarTerm} solar_term
 * @returns {boolean}
 */
export const is_after_solar_term = (date, solar_term) =>
  get_solar_term_index(
    get_solar_term_for_date(date).solar_term
  ) >= get_solar_term_index(solar_term);
