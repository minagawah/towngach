import { create_cycle } from '../lib/cycle';
import { BRANCHES, get_branch } from '../branch';
import { STEMS, get_stem } from '../stem';

/**
 * One member of the sexagenary cycle.
 *
 * @typedef {string} Sexagen
 */

/**
 * A stem-and-branch pairing
 * (干支 / can chi).
 *
 * @typedef {Object} SexagenDefinition
 */

/**
 * The sixty sexagenary members.
 *
 * @constant {Array.<Sexagen>}
 */
export const SEXAGEN_DEFINITIONS = [];

for (let index = 0; index < 60; index += 1) {
  const stem = get_stem(index % STEMS.length);
  const branch = get_branch(index % BRANCHES.length);
  const sexagen = `${stem}_${branch}`;

  SEXAGEN_DEFINITIONS.push(
    Object.freeze({
      sexagen,
      stem,
      branch,
      index,
    })
  );
}

export const SEXAGEN = Object.freeze(
  SEXAGEN_DEFINITIONS.map(item => item.sexagen)
);

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
 * Returns the sexagenary index.
 *
 * @typedef {function} get_sexagen_index
 * @param {Sexagen} sexagen
 * @returns {number}
 */
export const get_sexagen_index = sexagen =>
  sexagen_cycle.index_of(sexagen);

/**
 * Returns a sexagenary member from stem
 * and branch (干支 / can chi).
 *
 * @typedef {function}
 * @name get_sexagen_by_stem_and_branch
 * @param {Stem} stem
 * @param {Branch} branch
 * @returns {Sexagen}
 */
export const get_sexagen_by_stem_and_branch = (
  stem,
  branch
) => {
  const found = SEXAGEN_DEFINITIONS.find(
    item => item.stem === stem && item.branch === branch
  );

  if (!found) {
    throw new TypeError('Invalid sexagen pair.');
  }

  return found.sexagen;
};

/**
 * Returns the Heavenly Stem for a sexagen.
 *
 * @typedef {function}
 * @name get_sexagen_stem
 * @param {Sexagen} sexagen
 * @returns {Stem}
 */
export const get_sexagen_stem = sexagen => {
  const found = SEXAGEN_DEFINITIONS.find(
    item => item.sexagen === sexagen
  );

  if (!found) {
    throw new TypeError('Invalid sexagen.');
  }

  return found.stem;
};

/**
 * Returns the Earthly Branch for a sexagen.
 *
 * @typedef {function}
 * @name get_sexagen_branch
 * @param {Sexagen} sexagen
 * @returns {Branch}
 */
export const get_sexagen_branch = sexagen => {
  const found = SEXAGEN_DEFINITIONS.find(
    item => item.sexagen === sexagen
  );

  if (!found) {
    throw new TypeError('Invalid sexagen.');
  }

  return found.branch;
};

/**
 * Checks whether a value is sexagenary.
 *
 * @typedef {function} is_sexagen
 * @param {*} value
 * @returns {boolean}
 */
export const is_sexagen = value => sexagen_cycle.is(value);

/**
 * Shifts a sexagenary member.
 *
 * @typedef {function} shift_sexagen
 * @param {Sexagen} sexagen
 * @param {number} offset
 * @returns {Sexagen}
 */
export const shift_sexagen = (sexagen, offset) =>
  sexagen_cycle.shift(sexagen, offset);
