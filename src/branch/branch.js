import { create_cycle } from '../lib/cycle';

/**
 * Represents one of the Twelve Earthly
 * Branches (十二地支 / thập nhị địa chi).
 *
 * @typedef {string} Branch
 */

/**
 * The twelve branch names in canonical
 * cyclic order.
 *
 * @constant {Array.<Branch>}
 */
export const BRANCHES = Object.freeze([
  'zi',
  'chou',
  'yin',
  'mao',
  'chen',
  'si',
  'wu',
  'wei',
  'shen',
  'you',
  'xu',
  'hai',
]);

/**
 * Stable metadata for each Earthly Branch.
 *
 * @constant {Array.<Object>}
 */
export const BRANCH_DEFINITIONS = Object.freeze(
  BRANCHES.map((branch, index) =>
    Object.freeze({
      branch,
      index,
      polarity: index % 2 === 0 ? 'yang' : 'yin',
    })
  )
);

const branch_cycle = create_cycle(BRANCHES);

/**
 * The first Earthly Branch.
 *
 * @constant {Branch}
 */
export const BRANCH = BRANCHES[0];

/**
 * Returns all Twelve Earthly Branches.
 *
 * @typedef {function} get_branches
 * @returns {Array.<Branch>}
 */
export const get_branches = () => branch_cycle.get_all();

/**
 * Returns the branch at a cyclic index.
 *
 * @typedef {function} get_branch
 * @param {number} index
 * @returns {Branch}
 */
export const get_branch = index => branch_cycle.get(index);

/**
 * Returns the canonical branch index.
 *
 * @typedef {function} get_branch_index
 * @param {Branch} branch
 * @returns {number}
 */
export const get_branch_index = branch =>
  branch_cycle.index_of(branch);

/**
 * Returns stable metadata for an Earthly Branch.
 *
 * @typedef {function} get_branch_definition
 * @param {Branch} branch
 * @returns {Object}
 */
export const get_branch_definition = branch => {
  const definition = BRANCH_DEFINITIONS.find(
    item => item.branch === branch
  );

  if (!definition) {
    throw new TypeError('Invalid branch.');
  }

  return definition;
};

/**
 * Checks whether a value is a branch.
 *
 * @typedef {function} is_branch
 * @param {*} value
 * @returns {boolean}
 */
export const is_branch = value => branch_cycle.is(value);

/**
 * Shifts a branch through the cycle.
 *
 * @typedef {function} shift_branch
 * @param {Branch} branch
 * @param {number} offset
 * @returns {Branch}
 */
export const shift_branch = (branch, offset) =>
  branch_cycle.shift(branch, offset);
