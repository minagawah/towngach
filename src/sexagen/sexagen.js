/**
 * @module sexagen/sexagen
 */

import { create_cycle } from '../lib/cycle';
import { BRANCHES, get_branch } from '../branch';
import { STEMS, get_stem } from '../stem';

/**
 * One member of the sexagenary cycle.
 * @typedef {string} Sexagen
 */

/**
 * A "Stem" and "Branch" pairing
 * (干支 / gan-zhi / can chi).
 *
 * @typedef {Object} SexagenDefinition
 * @property {Sexagen} sexagen - The canonical compound key (e.g. "jia_zi").
 * @property {Stem} stem - The associated Heavenly Stem.
 * @property {Branch} branch - The associated Earthly Branch.
 * @property {number} index - Position in the canonical 60-member cycle.
 */

/**
 * The sixty sexagenary members in canonical order.
 * @constant {Array.<Sexagen>}
 */
export const SEXAGEN = Object.freeze(
  Array.from(
    { length: 60 },
    (_, index) =>
      `${get_stem(index % STEMS.length)}_${get_branch(index % BRANCHES.length)}`
  )
);

/**
 * Stable metadata for each sexagenary member.
 *
 * @constant {Array.<SexagenDefinition>}
 * @example
 * {
 *   sexagen: 'jia_zi',
 *   stem: 'jia',
 *   branch: 'zi',
 *   index: 0
 * }
 */
export const SEXAGEN_DEFINITIONS = Object.freeze(
  SEXAGEN.map((sexagen, index) =>
    Object.freeze({
      sexagen,
      stem: STEMS[index % STEMS.length],
      branch: BRANCHES[index % BRANCHES.length],
      index,
    })
  )
);

/**
 * Cyclic iterator for sexagenary cycle.
 *
 * @private
 */
const sexagen_cycle = create_cycle(SEXAGEN);

/**
 * The first sexagenary member.
 *
 * @constant {Sexagen}
 */
export const SEXAGENARY_CYCLE = SEXAGEN[0];

/**
 * Returns all sexagenary members.
 *
 * @typedef {function} get_sexagen
 * @returns {Array.<Sexagen>}
 */
export const get_sexagen = () => sexagen_cycle.get_all();

/**
 * Returns a sexagenary member by index.
 *
 * @typedef {function} get_sexagen_by_index
 * @param {number} index
 * @returns {Sexagen}
 */
export const get_sexagen_by_index = index =>
  sexagen_cycle.get(index);

/**
 * Returns the canonical sexagenary index.
 *
 * @typedef {function} get_sexagen_index
 * @param {Sexagen} sexagen
 * @returns {number}
 */
export const get_sexagen_index = sexagen => {
  const index = sexagen_cycle.index_of(sexagen);
  if (index < 0) throw new TypeError('Invalid sexagen.');
  return index;
};

/**
 * Returns stable metadata for a sexagenary member.
 *
 * @typedef {function} get_sexagen_definition
 * @param {Sexagen} sexagen
 * @returns {SexagenDefinition}
 */
export const get_sexagen_definition = sexagen => {
  const definition = SEXAGEN_DEFINITIONS.find(
    item => item.sexagen === sexagen
  );

  if (!definition) {
    throw new TypeError('Invalid sexagen.');
  }

  return definition;
};

/**
 * Checks whether a value is a sexagenary member.
 *
 * @typedef {function} is_sexagen
 * @param {*} value
 * @returns {boolean}
 */
export const is_sexagen = value => sexagen_cycle.is(value);

/**
 * Shifts a sexagenary member through the cycle.
 *
 * @typedef {function} shift_sexagen
 * @param {Sexagen} sexagen
 * @param {number} offset
 * @returns {Sexagen}
 */
export const shift_sexagen = (sexagen, offset) =>
  sexagen_cycle.shift(sexagen, offset);

/**
 * Returns the Heavenly Stem for a sexagen.
 *
 * @typedef {function} get_sexagen_stem
 * @param {Sexagen} sexagen
 * @returns {Stem}
 */
export const get_sexagen_stem = sexagen => {
  const definition = get_sexagen_definition(sexagen);
  return definition.stem;
};

/**
 * Returns the Earthly Branch for a sexagen.
 *
 * @typedef {function} get_sexagen_branch
 * @param {Sexagen} sexagen
 * @returns {Branch}
 */
export const get_sexagen_branch = sexagen => {
  const definition = get_sexagen_definition(sexagen);
  return definition.branch;
};

/**
 * Returns a sexagenary member from stem and branch.
 *
 * @typedef {function} get_sexagen_by_stem_and_branch
 * @param {Stem} stem
 * @param {Branch} branch
 * @returns {Sexagen}
 */
export const get_sexagen_by_stem_and_branch = (
  stem,
  branch
) => {
  const definition = SEXAGEN_DEFINITIONS.find(
    item => item.stem === stem && item.branch === branch
  );

  if (!definition) {
    throw new TypeError('Invalid sexagen pair.');
  }

  return definition.sexagen;
};
