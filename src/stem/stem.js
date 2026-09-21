/**
 * @module stem/stem
 */

import { create_cycle } from '../lib/cycle';
import { set_multi_helper } from '../locale';

/**
 * One of the 10 Tian-Gan (Heavenly Stems)
 * (天干 / tian-gan / thập thiên can).
 *
 * @typedef {string} Stem
 */

/**
 * 10 Gan (stem) names in canonical order.
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

/**
 * The element associated with each Tian-Gan
 * (Heavenly Stem) in index order.
 *
 * @constant {Array.<Element>}
 * @example
 * ['wood', 'wood', 'fire', 'fire', 'earth',
 *  'earth', 'metal', 'metal', 'water', 'water']
 */
const STEM_ELEMENTS = Object.freeze([
  'wood',
  'wood',
  'fire',
  'fire',
  'earth',
  'earth',
  'metal',
  'metal',
  'water',
  'water',
]);

/**
 * Localization definitions for 10 Tian-Gan (Heavenly Stem) names.
 *
 * @type {Object.<string, Object>}
 * @example
 * {
 *   jia: {
 *     name: {
 *       en: { primary: 'jia' },
 *       vi: { primary: 'giáp' },
 *       zh_ch: { primary: '甲' },
 *       zh_tw: { primary: '甲' },
 *       ja: { kanji: '甲', hiragana: 'かのえ', katakana: 'カノエ' },
 *     },
 *   },
 * }
 */
const STEM_NAMES = set_multi_helper(
  [
    [
      'jia',
      'jia',
      'giáp',
      '甲',
      '甲',
      '甲',
      'かのえ',
      'カノエ',
    ],
    [
      'yi',
      'yi',
      'ất',
      '乙',
      '乙',
      '乙',
      'きのと',
      'キノト',
    ],
    [
      'bing',
      'bing',
      'bính',
      '丙',
      '丙',
      '丙',
      'ひのえ',
      'ヒノエ',
    ],
    [
      'ding',
      'ding',
      'đinh',
      '丁',
      '丁',
      '丁',
      'ひのと',
      'ヒノト',
    ],
    [
      'wu',
      'wu',
      'mậu',
      '戊',
      '戊',
      '戊',
      'つちのえ',
      'ツチノエ',
    ],
    [
      'ji',
      'ji',
      'kỷ',
      '己',
      '己',
      '己',
      'つちのと',
      'ツチノト',
    ],
    [
      'geng',
      'geng',
      'canh',
      '庚',
      '庚',
      '庚',
      'かのえ',
      'カノエ',
    ],
    [
      'xin',
      'xin',
      'tân',
      '辛',
      '辛',
      '辛',
      'かのと',
      'カノト',
    ],
    [
      'ren',
      'ren',
      'nhâm',
      '壬',
      '壬',
      '壬',
      'みずのえ',
      'ミズノエ',
    ],
    [
      'gui',
      'gui',
      'quý',
      '癸',
      '癸',
      '癸',
      'みずのと',
      'ミズノト',
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
 * Data entry for a Tian-Gan (Heavenly Stem) definition.
 *
 * @typedef {Object} StemDefinition
 * @property {Stem} stem - The canonical stem key.
 * @property {number} index - Position in the canonical cycle.
 * @property {'yang'|'yin'} polarity - The stem polarity.
 * @property {Element} element - The associated Five Element.
 * @property {LocalizedData} name - Localized stem name.
 */

/**
 * Stable metadata for each Tian-Gan (Heavenly Stem).
 *
 * @constant {Array.<StemDefinition>}
 */
export const STEM_DEFINITIONS = Object.freeze(
  STEMS.map((stem, index) =>
    Object.freeze({
      stem,
      index,
      polarity: index % 2 === 0 ? 'yang' : 'yin',
      element: STEM_ELEMENTS[index],
      name: STEM_NAMES[stem].name,
    })
  )
);

/**
 * Cyclic iterator for Tian-Gan (Heavenly Stems).
 *
 * @private
 */
const stem_cycle = create_cycle(STEMS);

/**
 * The first Tian-Gan (Heavenly Stem).
 *
 * @constant {Stem}
 */
export const STEM = STEMS[0];

/**
 * Returns all 10 Tian-Gan (Heavenly Stems).
 *
 * @typedef {function} get_stems
 * @returns {Array.<Stem>}
 */
export const get_stems = () => stem_cycle.get_all();

/**
 * Returns the Gan (stem) at a cyclic index.
 *
 * @typedef {function} get_stem
 * @param {number} index
 * @returns {Stem}
 */
export const get_stem = index => stem_cycle.get(index);

/**
 * Returns the canonical Gan (stem) index.
 *
 * @typedef {function} get_stem_index
 * @param {Stem} stem
 * @returns {number}
 */
export const get_stem_index = stem => {
  const index = stem_cycle.index_of(stem);
  if (index < 0) throw new TypeError('Invalid stem.');
  return index;
};

/**
 * Returns stable metadata for a Tian-Gan (Heavenly Stem).
 *
 * @typedef {function} get_stem_definition
 * @param {Stem} stem
 * @returns {StemDefinition}
 */
export const get_stem_definition = stem => {
  const definition = STEM_DEFINITIONS.find(
    item => item.stem === stem
  );

  if (!definition) {
    throw new TypeError('Invalid stem.');
  }

  return definition;
};

/**
 * Checks whether a value is a Gan (stem).
 *
 * @typedef {function} is_stem
 * @param {*} value
 * @returns {boolean}
 */
export const is_stem = value => stem_cycle.is(value);

/**
 * Shifts a Gan (stem) through the cycle.
 *
 * @typedef {function} shift_stem
 * @param {Stem} stem
 * @param {number} offset
 * @returns {Stem}
 */
export const shift_stem = (stem, offset) =>
  stem_cycle.shift(stem, offset);
