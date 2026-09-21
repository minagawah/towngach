/**
 * @module elem/elem
 */

import { create_cycle } from '../lib/cycle';
import { set_multi_helper } from '../locale';

/**
 * One of the "Five Elements"
 * (五行 / wu-xing / ngũ hành).
 *
 * @typedef {string} Element
 */

/**
 * @typedef {import('../locale/Localizer.js').LocalizedData} LocalizedData
 */

/**
 * The Five Element definition.
 *
 * @typedef {Object} ElementDefinition
 * @property {Element} element - The canonical element key.
 * @property {number} index - Position in the canonical cycle.
 * @property {Element} generation - Element this one generates.
 * @property {Element} control - Element this one controls.
 * @property {LocalizedData} name - Localized element name.
 * @property {LocalizedData} season - Localized element season.
 * @property {LocalizedData} color - Localized element color.
 */

/**
 * The five element names in canonical order.
 * @constant {Array.<Element>}
 */
export const ELEMENTS = Object.freeze([
  'wood',
  'fire',
  'earth',
  'metal',
  'water',
]);

/**
 * Data entry for a localized Five Element name.
 *
 * @typedef {Object} ElementNameData
 * @property {LocalizedData} name - The localized element name.
 * @example
 * {
 *   wood: {
 *     name: {
 *       en: { primary: 'wood' },
 *       vi: { primary: 'gỗ' },
 *       zh_ch: { primary: '木' },
 *       zh_tw: { primary: '木' },
 *       ja: { kanji: '木', hiragana: 'き',
 *       katakana: 'キ' }
 *     }
 *   },
 *   ...
 * }
 */
export const ELEMENT_NAMES = set_multi_helper(
  [
    ['wood', 'wood', 'gỗ', '木', '木', '木', 'き', 'キ'],
    ['fire', 'fire', 'hỏa', '火', '火', '火', 'ひ', 'ヒ'],
    [
      'earth',
      'earth',
      'thổ',
      '土',
      '土',
      '土',
      'つち',
      'ツチ',
    ],
    [
      'metal',
      'metal',
      'kim',
      '金',
      '金',
      '金',
      'かね',
      'カネ',
    ],
    [
      'water',
      'water',
      'thủy',
      '水',
      '水',
      '水',
      'みず',
      'ミズ',
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
 * Data entry for a localized Five Element season.
 *
 * @typedef {Object} ElementSeasonData
 * @property {LocalizedData} season - The localized element season.
 * @example
 * {
 *   wood: {
 *     season: {
 *       en: { primary: 'spring' },
 *       vi: { primary: 'mùa xuân' },
 *       zh_ch: { primary: '春天' },
 *       zh_tw: { primary: '春天' },
 *       ja: { kanji: '春', hiragana: 'はる',
 *       katakana: 'ハル' }
 *     }
 *   },
 *   ...
 * }
 */
const ELEMENT_SEASONS = set_multi_helper(
  [
    [
      'wood',
      'spring',
      'mùa xuân',
      '春天',
      '春天',
      '春',
      'はる',
      'ハル',
    ],
    [
      'fire',
      'summer',
      'mùa hạ',
      '夏天',
      '夏天',
      '夏',
      'なつ',
      'ナツ',
    ],
    [
      'earth',
      'late summer',
      'cuối hạ',
      '长夏',
      '長夏',
      '土用',
      'どよう',
      'ドヨウ',
    ],
    [
      'metal',
      'autumn',
      'mùa thu',
      '秋天',
      '秋天',
      '秋',
      'あき',
      'アキ',
    ],
    [
      'water',
      'winter',
      'mùa đông',
      '冬天',
      '冬天',
      '冬',
      'ふゆ',
      'フユ',
    ],
  ].map(([key, en, vi, zh_ch, zh_tw, kan, hira, kata]) => ({
    key,
    season: {
      en: { pr: en },
      vi: { pr: vi },
      zh_ch: { pr: zh_ch },
      zh_tw: { pr: zh_tw },
      ja: { kan, hira, kata },
    },
  })),
  ['season']
);

/**
 * Data entry for a localized Five Element color.
 *
 * @typedef {Object} ElementColorData
 * @property {LocalizedData} color - The localized element color.
 * @example
 * {
 *   wood: {
 *     color: {
 *       en: { primary: 'green' },
 *       vi: { primary: 'xanh lá cây' },
 *       zh_ch: { primary: '绿色' },
 *       zh_tw: { primary: '綠色' },
 *       ja: { kanji: '緑', hiragana: 'みどり',
 *       katakana: 'ミドリ' }
 *     }
 *   },
 *   ...
 * }
 */
const ELEMENT_COLORS = set_multi_helper(
  [
    [
      'wood',
      'green',
      'xanh lá cây',
      '绿色',
      '綠色',
      '緑',
      'みどり',
      'ミドリ',
    ],
    [
      'fire',
      'red',
      'đỏ',
      '红色',
      '紅色',
      '赤',
      'あか',
      'アカ',
    ],
    [
      'earth',
      'yellow',
      'vàng',
      '黄色',
      '黃色',
      '黄色',
      'きいろ',
      'キイロ',
    ],
    [
      'metal',
      'white',
      'trắng',
      '白色',
      '白色',
      '白',
      'しろ',
      'シロ',
    ],
    [
      'water',
      'black',
      'đen',
      '黑色',
      '黑色',
      '黒',
      'くろ',
      'クロ',
    ],
  ].map(([key, en, vi, zh_ch, zh_tw, kan, hira, kata]) => ({
    key,
    color: {
      en: { pr: en },
      vi: { pr: vi },
      zh_ch: { pr: zh_ch },
      zh_tw: { pr: zh_tw },
      ja: { kan, hira, kata },
    },
  })),
  ['color']
);

/**
 * Stable metadata for each Five Element.
 * Generated at build-time from the
 * canonical `ELEMENTS` array combined
 * with localization data.
 *
 * @constant {Array.<ElementDefinition>}
 * @example
 * [
 *   {
 *     element: 'wood',
 *     index: 0,
 *     generation: 'fire',
 *     control: 'earth',
 *     name: { en: { primary: 'wood' }, ... },
 *     season: { en: { primary: 'spring' }, ... },
 *     color: { en: { primary: 'green' }, ... }
 *   },
 *   {
 *     element: 'fire',
 *     index: 1,
 *     generation: 'earth',
 *     control: 'metal',
 *     name: { en: { primary: 'fire' }, ... },
 *     season: { en: { primary: 'summer' }, ... },
 *     color: { en: { primary: 'red' }, ... }
 *   },
 *   ...
 * ]
 */
export const ELEMENT_DEFINITIONS = Object.freeze(
  ELEMENTS.map((element, index) =>
    Object.freeze({
      element,
      index,
      generation: ELEMENTS[(index + 1) % ELEMENTS.length],
      control: ELEMENTS[(index + 2) % ELEMENTS.length],
      name: ELEMENT_NAMES[element].name,
      season: ELEMENT_SEASONS[element].season,
      color: ELEMENT_COLORS[element].color,
    })
  )
);

/**
 * Cyclic iterator for Five Elements.
 * @private
 */
const element_cycle = create_cycle(ELEMENTS);

/**
 * The first Five Element.
 * @constant {Element}
 */
export const ELEMENT = ELEMENTS[0];

/**
 * Returns all Five Elements.
 * @typedef {function} get_elements
 * @returns {Array.<Element>}
 */
export const get_elements = () => element_cycle.get_all();

/**
 * Returns the element at a cyclic index.
 * @typedef {function} get_element
 * @param {number} index
 * @returns {Element}
 */
export const get_element = index =>
  element_cycle.get(index);

/**
 * Returns the canonical element index.
 * @typedef {function} get_element_index
 * @param {Element} element
 * @returns {number}
 */
export const get_element_index = element => {
  const index = element_cycle.index_of(element);
  if (index < 0) throw new TypeError('Invalid element.');
  return index;
};

/**
 * Returns stable metadata for a Five Element.
 * @typedef {function} get_element_definition
 * @param {Element} element
 * @returns {ElementDefinition}
 */
export const get_element_definition = element => {
  const definition = ELEMENT_DEFINITIONS.find(
    item => item.element === element
  );

  if (!definition) {
    throw new TypeError('Invalid element.');
  }

  return definition;
};

/**
 * Checks whether a value is a Five Element.
 * @typedef {function} is_element
 * @param {*} value
 * @returns {boolean}
 */
export const is_element = value => element_cycle.is(value);

/**
 * Shifts a Five Element through the cycle.
 * @typedef {function} shift_element
 * @param {Element} element
 * @param {number} offset
 * @returns {Element}
 */
export const shift_element = (element, offset) =>
  element_cycle.shift(element, offset);

/**
 * Returns the generated element.
 * @typedef {function} get_generated_element
 * @param {Element} element
 * @returns {Element}
 */
export const get_generated_element = element => {
  const idx = get_element_index(element);
  if (idx < 0) throw new TypeError('Invalid element.');
  return ELEMENTS[(idx + 1) % ELEMENTS.length];
};

/**
 * Returns the controlled element.
 * @typedef {function} get_controlled_element
 * @param {Element} element
 * @returns {Element}
 */
export const get_controlled_element = element => {
  const idx = get_element_index(element);
  if (idx < 0) throw new TypeError('Invalid element.');
  return ELEMENTS[(idx + 2) % ELEMENTS.length];
};
