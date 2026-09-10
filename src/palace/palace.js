/**
 * @module palace/palace
 */

import { create_cycle } from '../lib/cycle';
import { set_multi_helper } from '../locale';

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

const PALACE_NAMES = set_multi_helper(
  [
    [
      'qian',
      'qian',
      'càn',
      '乾',
      '乾',
      '乾',
      'けん',
      'ケン',
    ],
    [
      'kun',
      'kun',
      'khôn',
      '坤',
      '坤',
      '坤',
      'こん',
      'コン',
    ],
    [
      'zhen',
      'zhen',
      'chấn',
      '震',
      '震',
      '震',
      'しん',
      'シン',
    ],
    ['xun', 'xun', 'tốn', '巽', '巽', '巽', 'そん', 'ソン'],
    [
      'kan',
      'kan',
      'khảm',
      '坎',
      '坎',
      '坎',
      'かん',
      'カン',
    ],
    ['li', 'li', 'ly', '离', '離', '離', 'り', 'リ'],
    ['gen', 'gen', 'cấn', '艮', '艮', '艮', 'ごん', 'ゴン'],
    ['dui', 'dui', 'đoài', '兑', '兌', '兌', 'だ', 'ダ'],
    [
      'center',
      'center',
      'trung cung',
      '中宫',
      '中宮',
      '中宮',
      'ちゅうぐう',
      'チュウグウ',
    ],
  ].map(([key, en, vi, zh_ch, zh_tw, kan, hira, kata]) => ({
    key,
    name: {
      en: { pr: en },
      vi: { pr: vi },
      zh_ch: { pr: zh_ch },
      zh_tw: { pr: zh_tw },
      ja: { kan, hira, kata },
    },
  })),
  ['name']
);

/**
 * The Nine Palaces in canonical order.
 *
 * @constant {Array.<Palace>}
 */
export const PALACES = Object.freeze(PALACE_SEQUENCE);

const PALACE_DEFINITIONS = Object.freeze(
  [
    ['qian', 'northwest', 6],
    ['kun', 'southwest', 2],
    ['zhen', 'east', 3],
    ['xun', 'southeast', 4],
    ['kan', 'north', 1],
    ['li', 'south', 9],
    ['gen', 'northeast', 8],
    ['dui', 'west', 7],
    ['center', 'center', 5],
  ].map(([palace, direction, number]) => ({
    palace,
    direction,
    number,
    name: PALACE_NAMES[palace].name,
  }))
);

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
