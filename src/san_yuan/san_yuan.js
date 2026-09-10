/**
 * @module san_yuan/san_yuan
 */

import { create_cycle } from '../lib/cycle';
import { set_multi_helper } from '../locale';

/**
 * Represents one of the Three Epochs
 * (三元 / tam nguyên).
 *
 * @typedef {string} SanYuan
 */

/**
 * A method-specific Three Epoch result.
 *
 * @typedef {Object} SanYuanResult
 */

/**
 * The Three Epoch names.
 *
 * @constant {Array.<SanYuan>}
 */
export const SAN_YUAN = Object.freeze([
  'upper',
  'middle',
  'lower',
]);

const SAN_YUAN_NAMES = set_multi_helper(
  [
    {
      key: 'upper',
      name: {
        en: { pr: 'upper' },
        vi: { pr: 'thượng nguyên' },
        zh_ch: { pr: '上元' },
        zh_tw: { pr: '上元' },
        ja: {
          kan: '上元',
          hira: 'じょうげん',
          kata: 'ジョウゲン',
        },
      },
    },
    {
      key: 'middle',
      name: {
        en: { pr: 'middle' },
        vi: { pr: 'trung nguyên' },
        zh_ch: { pr: '中元' },
        zh_tw: { pr: '中元' },
        ja: {
          kan: '中元',
          hira: 'ちゅうげん',
          kata: 'チュウゲン',
        },
      },
    },
    {
      key: 'lower',
      name: {
        en: { pr: 'lower' },
        vi: { pr: 'hạ nguyên' },
        zh_ch: { pr: '下元' },
        zh_tw: { pr: '下元' },
        ja: { kan: '下元', hira: 'かげん', kata: 'カゲン' },
      },
    },
  ],
  ['name']
);

/**
 * Stable metadata for the Three Epochs.
 *
 * @constant {Array.<Object>}
 */
export const SAN_YUAN_DEFINITIONS = Object.freeze(
  SAN_YUAN.map((san_yuan, index) =>
    Object.freeze({
      san_yuan,
      index,
      name: SAN_YUAN_NAMES[san_yuan].name,
    })
  )
);

const san_yuan_cycle = create_cycle(SAN_YUAN);

/**
 * Returns the Three Epoch names.
 *
 * @typedef {function} get_san_yuan
 * @returns {Array.<SanYuan>}
 */
export const get_san_yuan = () => san_yuan_cycle.get_all();

/**
 * Checks whether a value is a Three Epoch.
 *
 * @typedef {function} is_san_yuan
 * @param {*} value
 * @returns {boolean}
 */
export const is_san_yuan = value =>
  san_yuan_cycle.is(value);

/**
 * Returns the canonical Three Epoch index.
 *
 * @typedef {function} get_san_yuan_index
 * @param {SanYuan} san_yuan
 * @returns {number}
 */
export const get_san_yuan_index = san_yuan =>
  san_yuan_cycle.index_of(san_yuan);

/**
 * Returns stable metadata for a Three Epoch.
 *
 * @typedef {function} get_san_yuan_definition
 * @param {SanYuan} san_yuan
 * @returns {Object}
 */
export const get_san_yuan_definition = san_yuan => {
  const definition = SAN_YUAN_DEFINITIONS.find(
    item => item.san_yuan === san_yuan
  );

  if (!definition) {
    throw new TypeError('Invalid Three Epoch.');
  }

  return definition;
};

/**
 * Shifts a Three Epoch through the cycle.
 *
 * @typedef {function} shift_san_yuan
 * @param {SanYuan} san_yuan
 * @param {number} offset
 * @returns {SanYuan}
 */
export const shift_san_yuan = (san_yuan, offset) =>
  san_yuan_cycle.shift(san_yuan, offset);

/**
 * Creates a normalized Three Epoch result.
 *
 * @typedef {function} create_san_yuan_result
 * @param {Object} value
 * @returns {SanYuanResult}
 */
export const create_san_yuan_result = value =>
  Object.freeze({
    ...value,
  });
