/**
 * @module purple_white/core/nine_stars/star
 */

import { create_cycle } from '../../../lib/cycle';
import { set_multi_helper } from '../../../locale';

/**
 * One of the "Purple-White Stars"
 * (紫白星 / zi-bai-xing / tử bạch tinh).
 *
 * @typedef {string} PurpleWhiteStar
 */

/**
 * @typedef {import('../../../locale/Localizer').LocalizedData} LocalizedData
 */

/**
 * A Purple-White star definition.
 *
 * @typedef {Object} PurpleWhiteStarDefinition
 * @property {PurpleWhiteStar} star - The canonical star key.
 * @property {number} number - The star number (1-9).
 * @property {string} element - The associated element.
 * @property {string} color - The associated color.
 * @property {LocalizedData} name - Localized star name.
 */

/**
 * The nine Purple-White stars.
 * @constant {Array.<PurpleWhiteStar>}
 */
export const PURPLE_WHITE_STARS = Object.freeze([
  'one_white',
  'two_black',
  'three_jade',
  'four_green',
  'five_yellow',
  'six_white',
  'seven_red',
  'eight_white',
  'nine_purple',
]);

/**
 * Data entry for a localized Purple-White star name.
 *
 * @typedef {Object} StarNameData
 * @property {LocalizedData} name - The localized star name.
 * @example
 * {
 *   one_white: {
 *     name: {
 *       en: { primary: 'one white' },
 *       vi: { primary: 'nhất bạch' },
 *       zh_ch: { primary: '一白' },
 *       zh_tw: { primary: '一白' },
 *       ja: { kanji: '一白', hiragana: 'いっぱく',
 *       katakana: 'イッパク' },
 *     },
 *   },
 * }
 */

/**
 * Localization definitions for Purple-White star names.
 *
 * @type {Object.<string, StarNameData>}
 */
const STAR_NAMES = set_multi_helper(
  [
    [
      'one_white',
      'one white',
      'nhất bạch',
      '一白',
      '一白',
      '一白',
      'いっぱく',
      'イッパク',
    ],
    [
      'two_black',
      'two black',
      'nhị hắc',
      '二黑',
      '二黑',
      '二黒',
      'にこく',
      'ニコク',
    ],
    [
      'three_jade',
      'three jade',
      'tam bích',
      '三碧',
      '三碧',
      '三碧',
      'さんぺき',
      'サンペキ',
    ],
    [
      'four_green',
      'four green',
      'tứ lục',
      '四绿',
      '四綠',
      '四緑',
      'しろく',
      'シロク',
    ],
    [
      'five_yellow',
      'five yellow',
      'ngũ hoàng',
      '五黄',
      '五黃',
      '五黄',
      'ごおう',
      'ゴオウ',
    ],
    [
      'six_white',
      'six white',
      'lục bạch',
      '六白',
      '六白',
      '六白',
      'ろっぱく',
      'ロッパク',
    ],
    [
      'seven_red',
      'seven red',
      'thất xích',
      '七赤',
      '七赤',
      '七赤',
      'しちせき',
      'シチセキ',
    ],
    [
      'eight_white',
      'eight white',
      'bát bạch',
      '八白',
      '八白',
      '八白',
      'はっぱく',
      'ハッパク',
    ],
    [
      'nine_purple',
      'nine purple',
      'cửu tử',
      '九紫',
      '九紫',
      '九紫',
      'きゅうし',
      'キュウシ',
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
 * Stable star metadata.
 * @constant {Array.<PurpleWhiteStarDefinition>}
 */
export const PURPLE_WHITE_STAR_DEFINITIONS = Object.freeze([
  {
    star: 'one_white',
    number: 1,
    element: 'water',
    color: 'white',
    name: STAR_NAMES.one_white.name,
  },
  {
    star: 'two_black',
    number: 2,
    element: 'earth',
    color: 'black',
    name: STAR_NAMES.two_black.name,
  },
  {
    star: 'three_jade',
    number: 3,
    element: 'wood',
    color: 'jade',
    name: STAR_NAMES.three_jade.name,
  },
  {
    star: 'four_green',
    number: 4,
    element: 'wood',
    color: 'green',
    name: STAR_NAMES.four_green.name,
  },
  {
    star: 'five_yellow',
    number: 5,
    element: 'earth',
    color: 'yellow',
    name: STAR_NAMES.five_yellow.name,
  },
  {
    star: 'six_white',
    number: 6,
    element: 'metal',
    color: 'white',
    name: STAR_NAMES.six_white.name,
  },
  {
    star: 'seven_red',
    number: 7,
    element: 'metal',
    color: 'red',
    name: STAR_NAMES.seven_red.name,
  },
  {
    star: 'eight_white',
    number: 8,
    element: 'earth',
    color: 'white',
    name: STAR_NAMES.eight_white.name,
  },
  {
    star: 'nine_purple',
    number: 9,
    element: 'fire',
    color: 'purple',
    name: STAR_NAMES.nine_purple.name,
  },
]);

/**
 * Cyclic iterator for Purple-White stars.
 * @private
 */
const star_cycle = create_cycle(PURPLE_WHITE_STARS);

/**
 * The first Purple-White star.
 * @constant {PurpleWhiteStar}
 */
export const STAR = PURPLE_WHITE_STARS[0];

/**
 * Returns all Purple-White stars.
 * @typedef {function} get_purple_white_stars
 * @returns {Array.<PurpleWhiteStar>}
 */
export const get_purple_white_stars = () =>
  star_cycle.get_all();

/**
 * Returns a Purple-White star by number.
 *
 * @typedef {function} get_purple_white_star
 * @param {number} number
 * @returns {PurpleWhiteStar}
 */
export const get_purple_white_star = number =>
  star_cycle.get((Number(number) || 1) - 1);

/**
 * Returns the star number.
 *
 * @typedef {function} get_purple_white_star_number
 * @param {PurpleWhiteStar} star
 * @returns {number}
 */
export const get_purple_white_star_number = star => {
  const found = PURPLE_WHITE_STAR_DEFINITIONS.find(
    item => item.star === star
  );

  if (!found) {
    throw new TypeError('Invalid star.');
  }

  return found.number;
};

/**
 * Returns the canonical star index.
 *
 * @typedef {function} get_purple_white_star_index
 * @param {PurpleWhiteStar} star
 * @returns {number}
 */
export const get_purple_white_star_index = star => {
  const index = star_cycle.index_of(star);
  if (index < 0) throw new TypeError('Invalid star.');
  return index;
};

/**
 * Returns the star definition.
 *
 * @typedef {function} get_purple_white_star_definition
 * @param {PurpleWhiteStar} star
 * @returns {PurpleWhiteStarDefinition}
 */
export const get_purple_white_star_definition = star => {
  const found = PURPLE_WHITE_STAR_DEFINITIONS.find(
    item => item.star === star
  );

  if (!found) {
    throw new TypeError('Invalid star.');
  }

  return found;
};

/**
 * Checks whether a value is a star.
 *
 * @typedef {function} is_purple_white_star
 * @param {*} value
 * @returns {boolean}
 */
export const is_purple_white_star = value =>
  star_cycle.is(value);

/**
 * Shifts a star through the cycle.
 *
 * @typedef {function} shift_purple_white_star
 * @param {PurpleWhiteStar} star
 * @param {number} offset
 * @returns {PurpleWhiteStar}
 */
export const shift_purple_white_star = (star, offset) =>
  star_cycle.shift(star, offset);
