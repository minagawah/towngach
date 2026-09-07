import { create_cycle } from '../lib/cycle';

/**
 * Represents one of the Nine Palaces
 * (九宮 / cửu cung).
 *
 * @typedef {string} Palace
 */

/**
 * A structural description for a palace.
 *
 * @typedef {Object} PalaceDefinition
 */

/**
 * The nine palace names in canonical order.
 *
 * @constant {Array.<Palace>}
 */
const PALACE_SEQUENCE = Object.freeze([
  'qian',
  'kun',
  'zhen',
  'xun',
  'kan',
  'li',
  'gen',
  'dui',
  'center',
]);

/**
 * The Nine Palaces in canonical order.
 *
 * @constant {Array.<Palace>}
 */
export const PALACES = Object.freeze(PALACE_SEQUENCE);

const PALACE_DEFINITIONS = Object.freeze([
  { palace: 'qian', direction: 'northwest', number: 6 },
  { palace: 'kun', direction: 'southwest', number: 2 },
  { palace: 'zhen', direction: 'east', number: 3 },
  { palace: 'xun', direction: 'southeast', number: 4 },
  { palace: 'kan', direction: 'north', number: 1 },
  { palace: 'li', direction: 'south', number: 9 },
  { palace: 'gen', direction: 'northeast', number: 8 },
  { palace: 'dui', direction: 'west', number: 7 },
  { palace: 'center', direction: 'center', number: 5 },
]);

const palace_cycle = create_cycle(PALACE_SEQUENCE);

/**
 * Returns all Nine Palaces.
 *
 * @typedef {function} get_palaces
 * @returns {Array.<Palace>}
 */
export const get_palaces = () => palace_cycle.get_all();

/**
 * Returns the palace at a cyclic index.
 *
 * @typedef {function} get_palace
 * @param {number} index
 * @returns {Palace}
 */
export const get_palace = index => palace_cycle.get(index);

/**
 * Returns the canonical palace index.
 *
 * @typedef {function} get_palace_index
 * @param {Palace} palace
 * @returns {number}
 */
export const get_palace_index = palace =>
  palace_cycle.index_of(palace);

/**
 * Checks whether a value is a palace.
 *
 * @typedef {function} is_palace
 * @param {*} value
 * @returns {boolean}
 */
export const is_palace = value => palace_cycle.is(value);

/**
 * Shifts a palace through the cycle.
 *
 * @typedef {function} shift_palace
 * @param {Palace} palace
 * @param {number} offset
 * @returns {Palace}
 */
export const shift_palace = (palace, offset) =>
  palace_cycle.shift(palace, offset);

/**
 * Returns the palace definition.
 *
 * @typedef {function} get_palace_definition
 * @param {Palace} palace
 * @returns {PalaceDefinition}
 */
export const get_palace_definition = palace => {
  const index = get_palace_index(palace);

  if (index < 0) {
    throw new TypeError('Invalid palace.');
  }

  return {
    ...PALACE_DEFINITIONS[index],
    index,
  };
};
