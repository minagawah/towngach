/**
 * A position in the Luoshu arrangement.
 *
 * @module luoshu/luoshu
 *
 * @typedef {Object} LuoshuPosition
 */

/**
 * The Luoshu (洛書 / lạc thư) pattern
 * linked to the Nine Palaces
 * (九宮 / cửu cung).
 *
 * @typedef {Object} Luoshu
 */

/**
 * The canonical Luoshu layout
 * (洛書 / lạc thư).
 *
 * @constant {Luoshu}
 */
const LUOSHU_LAYOUT = Object.freeze([
  [4, 9, 2],
  [3, 5, 7],
  [8, 1, 6],
]);

const LUOSHU_POSITIONS = Object.freeze([
  { number: 1, palace: 'kan', row: 2, column: 1 },
  { number: 2, palace: 'kun', row: 0, column: 0 },
  { number: 3, palace: 'zhen', row: 1, column: 0 },
  { number: 4, palace: 'xun', row: 0, column: 2 },
  { number: 5, palace: 'center', row: 1, column: 1 },
  { number: 6, palace: 'qian', row: 2, column: 2 },
  { number: 7, palace: 'dui', row: 1, column: 2 },
  { number: 8, palace: 'gen', row: 2, column: 0 },
  { number: 9, palace: 'li', row: 0, column: 1 },
]);

/**
 * The Luoshu pattern.
 *
 * @constant {Luoshu}
 */
export const LUOSHU = Object.freeze({
  layout: LUOSHU_LAYOUT,
  positions: LUOSHU_POSITIONS,
});

/**
 * Returns the complete Luoshu pattern.
 *
 * @typedef {function} get_luoshu
 * @returns {Luoshu}
 */
export const get_luoshu = () => LUOSHU;

/**
 * Returns the Luoshu position for a number.
 *
 * @typedef {function} get_luoshu_position
 * @param {number} number
 * @returns {LuoshuPosition}
 */
export const get_luoshu_position = number => {
  const entry = LUOSHU_POSITIONS.find(
    item => item.number === number
  );

  if (!entry) {
    throw new TypeError('Invalid luoshu number.');
  }

  return entry;
};

/**
 * Returns the Luoshu number for a palace.
 *
 * @typedef {function} get_luoshu_number
 * @param {string} palace
 * @returns {number}
 */
export const get_luoshu_number = palace => {
  const entry = LUOSHU_POSITIONS.find(
    item => item.palace === palace
  );

  if (!entry) {
    throw new TypeError('Invalid luoshu palace.');
  }

  return entry.number;
};

/**
 * Returns the Luoshu palace for a number.
 *
 * @typedef {function} get_luoshu_palace
 * @param {number} number
 * @returns {string}
 */
export const get_luoshu_palace = number =>
  get_luoshu_position(number).palace;

/**
 * Checks whether a value is a valid Luoshu
 * number.
 *
 * @typedef {function} is_luoshu_number
 * @param {*} value
 * @returns {boolean}
 */
export const is_luoshu_number = value =>
  Number.isInteger(value) && value >= 1 && value <= 9;
