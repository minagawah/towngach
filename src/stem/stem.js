import { create_cycle } from '../lib/cycle';

/**
 * Represents one of the Ten Heavenly
 * Stems (十天干 / thập thiên can).
 *
 * @typedef {string} Stem
 */

/**
 * The ten stem names in canonical order.
 *
 * @constant {Array.<Stem>}
 */
export const STEMS = Object.freeze([
  'jia',
  'yi',
  'bing',
  'ding',
  'wu',
  'ji',
  'geng',
  'xin',
  'ren',
  'gui',
]);

const stem_cycle = create_cycle(STEMS);

/**
 * The first Heavenly Stem.
 *
 * @constant {Stem}
 */
export const STEM = STEMS[0];

/**
 * Returns all Ten Heavenly Stems.
 *
 * @typedef {function} get_stems
 * @returns {Array.<Stem>}
 */
export const get_stems = () => stem_cycle.get_all();

/**
 * Returns the stem at a cyclic index.
 *
 * @typedef {function} get_stem
 * @param {number} index
 * @returns {Stem}
 */
export const get_stem = index => stem_cycle.get(index);

/**
 * Returns the canonical stem index.
 *
 * @typedef {function} get_stem_index
 * @param {Stem} stem
 * @returns {number}
 */
export const get_stem_index = stem =>
  stem_cycle.index_of(stem);

/**
 * Checks whether a value is a stem.
 *
 * @typedef {function} is_stem
 * @param {*} value
 * @returns {boolean}
 */
export const is_stem = value => stem_cycle.is(value);

/**
 * Shifts a stem through the cycle.
 *
 * @typedef {function} shift_stem
 * @param {Stem} stem
 * @param {number} offset
 * @returns {Stem}
 */
export const shift_stem = (stem, offset) =>
  stem_cycle.shift(stem, offset);
