/**
 * @module elem/elem
 */
import {
  LOCALES,
  Localizer,
  set_multi_helper,
} from '../locale';

/**
 * @typedef {('wood'|'fire'|'earth'|'metal'|'water')} Key
 */

/**
 * @type {Array.<Key>}
 */
export const ELEMENT_KEYS = [
  'wood',
  'fire',
  'earth',
  'metal',
  'water',
];

/**
 * @typedef {import('../locale/constants').Locale} Locale
 */

/**
 * @typedef {import('../locale/Localizer').LocalizedData} LocalizedData
 */

/**
 * @typedef {import('../locale/Localizer').DataMultiSetterArgs} DataMultiSetterArgs
 */

/**
 * @typedef {Object.<Key, Object.<Locale, DataMultiSetterArgs>>} Source
 */

/**
 * Each value being 'LocalizedData'.
 *
 * @typedef {Object} Item
 * @property {LocalizedData} name
 * @property {LocalizedData} season
 * @property {LocalizedData} color
 */

/**
 * A type signature for ELEMENTS
 * generated at the runtime.
 * Notice it has longer key length
 * compared to the ones in
 * the source data.
 *
 * @typedef {Object.<string, Item>} Elements
 * @example
 * // See how the generated data
 * // has attribute keys different
 * // from the source data.
 * {
 *   wood: {
 *     name: {
 *       en: { primary: 'wood' },
 *       vi: { primary: 'gỗ', secondary: 'go' },
 *       zh_ch: { primary: '木', secondary: 'mu' },
 *       zh_tw: { primary: '木', secondary: 'mu' },
 *       ja: { kanji: '木', hiragana: 'き', katakana: 'キ' },
 *     },
 *     season: {
 *       en: { primary: 'spring' },
 *       vi: { primary: 'mùa xuân', secondary: 'mua xuan' },
 *       zh_ch: { primary: '春天', secondary: 'chun tian' },
 *       zh_tw: { primary: '春天', secondary: 'chun tian' },
 *       ja: { kanji: '春', hiragana: 'はる', katakana: 'ハル' },
 *     ...
 *   },
 *   ...
 *   ...
 * }
 * @todo Probably need "tertiary", "quaternary", and "quinary"?
 */

/**
 * IMPORTANT:
 * This is just a source data,
 * and is used only at runtime.
 *
 * @private
 * @type {Array.<Source>}
 */
const _raw_elements = [
  {
    key: 'wood',
    name: {
      en: { pr: 'wood' },
      vi: { pr: 'gỗ', se: 'go' },
      zh_ch: { pr: '木', se: 'mu' },
      zh_tw: { pr: '木', se: 'mu' },
      ja: { kan: '木', hira: 'き', kata: 'キ' },
    },
    season: {
      en: { pr: 'spring' },
      vi: { pr: 'mùa xuân', se: 'mua xuan' },
      zh_ch: { pr: '春天', se: 'chun tian' },
      zh_tw: { pr: '春天', se: 'chun tian' },
      ja: { kan: '春', hira: 'はる', kata: 'ハル' },
    },
    color: {
      en: { pr: 'green' },
      vi: { pr: 'xanh lá cây', se: 'xanh la cay' },
      zh_ch: { pr: '绿色', se: 'lu se' },
      zh_tw: { pr: '綠色', se: 'lu se' },
      ja: { kan: '緑', hira: 'みどり', kata: 'ミドリ' },
    },
  },
  {
    key: 'fire',
    name: {
      en: { pr: 'fire' },
      vi: { pr: 'hỏa', se: 'hoa' },
      zh_ch: { pr: '火', se: 'huo' },
      zh_tw: { pr: '火', se: 'huo' },
      ja: { kan: '火', hira: 'ひ', kata: 'ヒ' },
    },
    season: {
      en: { pr: 'summer' },
      vi: { pr: 'mùa hạ', se: 'mua ha' },
      zh_ch: { pr: '夏天', se: 'xia tian' },
      zh_tw: { pr: '夏天', se: 'xia tian' },
      ja: { kan: '夏', hira: 'なつ', kata: 'ナツ' },
    },
    color: {
      en: { pr: 'red' },
      vi: { pr: 'đỏ', se: 'do' },
      zh_ch: { pr: '红色', se: 'hong se' },
      zh_tw: { pr: '紅色', se: 'hong se' },
      ja: { kan: '赤', hira: 'あか', kata: 'アカ' },
    },
  },
  {
    key: 'earth',
    name: {
      en: { pr: 'earth' },
      vi: { pr: 'thổ', se: 'tho' },
      zh_ch: { pr: '土', se: 'tu' },
      zh_tw: { pr: '土', se: 'tu' },
      ja: { kan: '土', hira: 'つち', kata: 'ツチ' },
    },
    season: {
      en: { pr: 'late summer' },
      vi: { pr: 'cuối hạ', se: 'cuoi ha' },
      zh_ch: { pr: '长夏', se: 'chang xia' },
      zh_tw: { pr: '長夏', se: 'chang xia' },
      ja: { kan: '土用', hira: 'どよう', kata: 'ドヨウ' },
    },
    color: {
      en: { pr: 'yellow' },
      vi: { pr: 'vàng', se: 'vang' },
      zh_ch: { pr: '黄色', se: 'huang se' },
      zh_tw: { pr: '黃色', se: 'huang se' },
      ja: { kan: '黄色', hira: 'きいろ', kata: 'キイロ' },
    },
  },
  {
    key: 'metal',
    name: {
      en: { pr: 'metal' },
      vi: { pr: 'kim', se: 'kim' },
      zh_ch: { pr: '金', se: 'jin' },
      zh_tw: { pr: '金', se: 'jin' },
      ja: { kan: '金', hira: 'かね', kata: 'カネ' },
    },
    season: {
      en: { pr: 'autumn' },
      vi: { pr: 'mùa thu', se: 'mua thu' },
      zh_ch: { pr: '秋天', se: 'qiu tian' },
      zh_tw: { pr: '秋天', se: 'qiu tian' },
      ja: { kan: '秋', hira: 'あき', kata: 'アキ' },
    },
    color: {
      en: { pr: 'white' },
      vi: { pr: 'trắng', se: 'trang' },
      zh_ch: { pr: '白色', se: 'bai se' },
      zh_tw: { pr: '白色', se: 'bai se' },
      ja: { kan: '白', hira: 'しろ', kata: 'シロ' },
    },
  },
  {
    key: 'water',
    name: {
      en: { pr: 'water' },
      vi: { pr: 'thủy', se: 'thuy' },
      zh_ch: { pr: '水', se: 'shui' },
      zh_tw: { pr: '水', se: 'shui' },
      ja: { kan: '水', hira: 'みず', kata: 'ミズ' },
    },
    season: {
      en: { pr: 'winter' },
      vi: { pr: 'mùa đông', se: 'mua dong' },
      zh_ch: { pr: '冬天', se: 'dong tian' },
      zh_tw: { pr: '冬天', se: 'dong tian' },
      ja: { kan: '冬', hira: 'ふゆ', kata: 'フユ' },
    },
    color: {
      en: { pr: 'black' },
      vi: { pr: 'đen', se: 'den' },
      zh_ch: { pr: '黑色', se: 'hei se' },
      zh_tw: { pr: '黑色', se: 'hei se' },
      ja: { kan: '黒', hira: 'くろ', kata: 'クロ' },
    },
  },
];

/**
 * Generating at the build-time.
 * @type {Elements}
 */
export const ELEMENTS = set_multi_helper(_raw_elements, [
  'name',
  'season',
  'color',
]);
