/**
 * @module solar_term/solar_term
 */

import {
  compare_calendar_dates,
  normalize_calendar_date,
} from '../calendar';
import {
  get_solar_term_target_longitude,
  search_longitude_boundary,
  get_sun_ecliptic_longitude,
} from '../astronomy';
import { create_cycle } from '../lib/cycle';
import { set_multi_helper } from '../locale';

/**
 * One of the "24 Solar Terms" (節気 / 節氣 /
 * 节气 / jie-qi / tiết khí).
 *
 * @typedef {string} SolarTerm
 */

/**
 * A solar term occurrence.
 *
 * @typedef {Object} SolarTermOccurrence
 * @property {Date} date - The occurrence date.
 * @property {SolarTerm} solar_term - The solar term key.
 */

/**
 * The twenty-four solar terms.
 * @constant {Array.<SolarTerm>}
 */
export const SOLAR_TERMS = Object.freeze([
  'li_chun',
  'yu_shui',
  'jing_zhe',
  'chun_fen',
  'qing_ming',
  'gu_yu',
  'li_xia',
  'xiao_man',
  'mang_zhong',
  'xia_zhi',
  'xiao_shu',
  'da_shu',
  'li_qiu',
  'chu_shu',
  'bai_lu',
  'qiu_fen',
  'han_lu',
  'shuang_jiang',
  'li_dong',
  'xiao_xue',
  'da_xue',
  'dong_zhi',
  'xiao_han',
  'da_han',
]);

/**
 * Localization definitions for Twenty-Four Solar Term names.
 *
 * @type {Object.<string, Object>}
 * @example
 * {
 *   li_chun: {
 *     name: {
 *       en: { primary: 'li chun' },
 *       vi: { primary: 'lập xuân' },
 *       zh_ch: { primary: '立春' },
 *       zh_tw: { primary: '立春' },
 *       ja: { kanji: '立春', hiragana: 'りっしゅん', katakana: 'リッシュン' },
 *     },
 *   },
 * }
 */
const SOLAR_TERM_NAMES = set_multi_helper(
  [
    [
      'li_chun',
      'li chun',
      'lập xuân',
      '立春',
      '立春',
      '立春',
      'りっしゅん',
      'リッシュン',
    ],
    [
      'yu_shui',
      'yu shui',
      'vũ thủy',
      '雨水',
      '雨水',
      '雨水',
      'うすい',
      'ウスイ',
    ],
    [
      'jing_zhe',
      'jing zhe',
      'kinh trập',
      '惊蛰',
      '驚蟄',
      '啓蟄',
      'けいちつ',
      'ケイチツ',
    ],
    [
      'chun_fen',
      'chun fen',
      'xuân phân',
      '春分',
      '春分',
      '春分',
      'しゅんぶん',
      'シュンブン',
    ],
    [
      'qing_ming',
      'qing ming',
      'thanh minh',
      '清明',
      '清明',
      '清明',
      'せいめい',
      'セイメイ',
    ],
    [
      'gu_yu',
      'gu yu',
      'cốc vũ',
      '谷雨',
      '穀雨',
      '穀雨',
      'こくう',
      'コクウ',
    ],
    [
      'li_xia',
      'li xia',
      'lập hạ',
      '立夏',
      '立夏',
      '立夏',
      'りっか',
      'リッカ',
    ],
    [
      'xiao_man',
      'xiao man',
      'tiểu mãn',
      '小满',
      '小滿',
      '小満',
      'しょうまん',
      'ショウマン',
    ],
    [
      'mang_zhong',
      'mang zhong',
      'mang chủng',
      '芒种',
      '芒種',
      '芒種',
      'ぼうしゅ',
      'ボウシュ',
    ],
    [
      'xia_zhi',
      'xia zhi',
      'hạ chí',
      '夏至',
      '夏至',
      '夏至',
      'げし',
      'ゲシ',
    ],
    [
      'xiao_shu',
      'xiao shu',
      'tiểu thử',
      '小暑',
      '小暑',
      '小暑',
      'しょうしょ',
      'ショウショ',
    ],
    [
      'da_shu',
      'da shu',
      'đại thử',
      '大暑',
      '大暑',
      '大暑',
      'たいしょ',
      'タイショ',
    ],
    [
      'li_qiu',
      'li qiu',
      'lập thu',
      '立秋',
      '立秋',
      '立秋',
      'りっしゅう',
      'リッシュウ',
    ],
    [
      'chu_shu',
      'chu shu',
      'xử thử',
      '处暑',
      '處暑',
      '處暑',
      'しょしょ',
      'ショショ',
    ],
    [
      'bai_lu',
      'bai lu',
      'bạch lộ',
      '白露',
      '白露',
      '白露',
      'はくろ',
      'ハクロ',
    ],
    [
      'qiu_fen',
      'qiu fen',
      'thu phân',
      '秋分',
      '秋分',
      '秋分',
      'しゅうぶん',
      'シュウブン',
    ],
    [
      'han_lu',
      'han lu',
      'hàn lộ',
      '寒露',
      '寒露',
      '寒露',
      'かんろ',
      'カンロ',
    ],
    [
      'shuang_jiang',
      'shuang jiang',
      'sương giáng',
      '霜降',
      '霜降',
      '霜降',
      'そうこう',
      'ソウコウ',
    ],
    [
      'li_dong',
      'li dong',
      'lập đông',
      '立冬',
      '立冬',
      '立冬',
      'りっとう',
      'リットウ',
    ],
    [
      'xiao_xue',
      'xiao xue',
      'tiểu tuyết',
      '小雪',
      '小雪',
      '小雪',
      'しょうせつ',
      'ショウセツ',
    ],
    [
      'da_xue',
      'da xue',
      'đại tuyết',
      '大雪',
      '大雪',
      '大雪',
      'たいせつ',
      'タイセツ',
    ],
    [
      'dong_zhi',
      'dong zhi',
      'đông chí',
      '冬至',
      '冬至',
      '冬至',
      'とうじ',
      'トウジ',
    ],
    [
      'xiao_han',
      'xiao han',
      'tiểu hàn',
      '小寒',
      '小寒',
      '小寒',
      'しょうかん',
      'ショウカン',
    ],
    [
      'da_han',
      'da han',
      'đại hàn',
      '大寒',
      '大寒',
      '大寒',
      'だいかん',
      'ダイカン',
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
 * Stable metadata for Solar Term identities.
 *
 * @constant {Array.<Object>}
 */
export const SOLAR_TERM_DEFINITIONS = Object.freeze(
  SOLAR_TERMS.map((solar_term, index) =>
    Object.freeze({
      solar_term,
      index,
      name: SOLAR_TERM_NAMES[solar_term].name,
    })
  )
);

/**
 * Cyclic iterator for Twenty-Four Solar Terms.
 *
 * @private
 */
const solar_term_cycle = create_cycle(SOLAR_TERMS);

/**
 * The first solar term.
 *
 * @constant {SolarTerm}
 */
export const SOLAR_TERM = SOLAR_TERMS[0];

/**
 * Approximate calendar month and day anchors for each solar term.
 *
 * @constant {Array.<{month: number, day: number}>}
 */
const SOLAR_TERM_ANCHORS = Object.freeze([
  { month: 2, day: 4 },
  { month: 2, day: 19 },
  { month: 3, day: 5 },
  { month: 3, day: 20 },
  { month: 4, day: 4 },
  { month: 4, day: 20 },
  { month: 5, day: 5 },
  { month: 5, day: 21 },
  { month: 6, day: 5 },
  { month: 6, day: 21 },
  { month: 7, day: 7 },
  { month: 7, day: 22 },
  { month: 8, day: 7 },
  { month: 8, day: 23 },
  { month: 9, day: 7 },
  { month: 9, day: 23 },
  { month: 10, day: 8 },
  { month: 10, day: 23 },
  { month: 11, day: 7 },
  { month: 11, day: 22 },
  { month: 12, day: 7 },
  { month: 12, day: 21 },
  { month: 1, day: 5 },
  { month: 1, day: 20 },
]);

/**
 * Search window in days around solar term anchors.
 *
 * @private
 * @constant {number}
 */
const SEARCH_WINDOW_DAYS = 15;

/**
 * Milliseconds in one day.
 *
 * @private
 * @constant {number}
 */
const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Helper to construct a UTC Date instance at 12:00:00 UTC.
 *
 * @private
 * @param {number} year
 * @param {number} month
 * @param {number} day
 * @returns {Date}
 */
const create_utc_date = (year, month, day) =>
  new Date(Date.UTC(year, month - 1, day, 12, 0, 0, 0));

/**
 * Returns all solar terms.
 *
 * @typedef {function} get_solar_terms
 * @returns {Array.<SolarTerm>}
 */
export const get_solar_terms = () =>
  solar_term_cycle.get_all();

/**
 * Returns a solar term by index.
 *
 * @typedef {function} get_solar_term
 * @param {number} index
 * @returns {SolarTerm}
 */
export const get_solar_term = index =>
  solar_term_cycle.get(index);

/**
 * Returns the solar term index.
 *
 * @typedef {function} get_solar_term_index
 * @param {SolarTerm} solar_term
 * @returns {number}
 */
export const get_solar_term_index = solar_term => {
  const index = solar_term_cycle.index_of(solar_term);
  if (index < 0) throw new TypeError('Invalid solar term.');
  return index;
};

/**
 * Returns stable metadata for a Solar Term identity.
 *
 * @typedef {function} get_solar_term_definition
 * @param {SolarTerm} solar_term
 * @returns {Object}
 */
export const get_solar_term_definition = solar_term => {
  const definition = SOLAR_TERM_DEFINITIONS.find(
    item => item.solar_term === solar_term
  );

  if (!definition) {
    throw new TypeError('Invalid Solar Term.');
  }

  return definition;
};

/**
 * Checks whether a value is a solar term.
 *
 * @typedef {function} is_solar_term
 * @param {*} value
 * @returns {boolean}
 */
export const is_solar_term = value =>
  solar_term_cycle.is(value);

/**
 * Returns the estimated anchor date for a solar term in a given year.
 *
 * @private
 * @param {SolarTerm} solar_term
 * @param {number} year
 * @returns {Date}
 */
const get_solar_term_anchor = (solar_term, year) => {
  const index = get_solar_term_index(solar_term);

  if (index < 0) {
    throw new TypeError('Invalid solar term.');
  }

  const { month, day } = SOLAR_TERM_ANCHORS[index];
  return create_utc_date(year, month, day);
};

/**
 * Returns the solar term for a date.
 *
 * @typedef {function} get_solar_term_for_date
 * @param {CalendarDate} date
 * @returns {SolarTermOccurrence}
 */
export const get_solar_term_for_date = date => {
  const normalized = normalize_calendar_date(date);
  const longitude = get_sun_ecliptic_longitude(normalized);
  const offset = (((longitude - 315) % 360) + 360) % 360;
  const index =
    Math.floor(offset / 15) % SOLAR_TERMS.length;

  return {
    date: normalized,
    solar_term: SOLAR_TERMS[index],
  };
};

/**
 * Returns the start moment of a solar term.
 *
 * @typedef {function} get_solar_term_start
 * @param {SolarTerm} solar_term
 * @param {number} year
 * @returns {SolarTermOccurrence}
 */
export const get_solar_term_start = (solar_term, year) => {
  const index = get_solar_term_index(solar_term);

  if (index < 0) {
    throw new TypeError('Invalid solar term.');
  }

  const anchor = get_solar_term_anchor(solar_term, year);
  const start = new Date(
    anchor.getTime() - SEARCH_WINDOW_DAYS * DAY_MS
  );
  const end = new Date(
    anchor.getTime() + SEARCH_WINDOW_DAYS * DAY_MS
  );
  const date = search_longitude_boundary(
    start,
    end,
    get_solar_term_target_longitude(index)
  );

  return {
    date,
    solar_term,
  };
};

/**
 * Checks whether a date is after a term.
 *
 * @typedef {function} is_after_solar_term
 * @param {CalendarDate} date
 * @param {SolarTerm} solar_term
 * @returns {boolean}
 */
export const is_after_solar_term = (date, solar_term) => {
  const normalized = normalize_calendar_date(date);
  const start = get_solar_term_start(
    solar_term,
    normalized.year
  ).date;

  return compare_calendar_dates(normalized, start) >= 0;
};
