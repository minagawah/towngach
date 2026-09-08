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
 * One of the Twenty-Four Solar Terms
 * (節氣 / tiết khí).
 *
 * @typedef {string} SolarTerm
 */

/**
 * A solar term occurrence.
 *
 * @typedef {Object} SolarTermOccurrence
 */

/**
 * The twenty-four solar terms.
 *
 * @constant {Array.<SolarTerm>}
 */
export const SOLAR_TERMS = Object.freeze([
  'lichun',
  'yushui',
  'jingzhe',
  'chunfen',
  'qingming',
  'guyu',
  'lixia',
  'xiaoman',
  'mangzhong',
  'xiazhi',
  'xiaoshu',
  'dashu',
  'liqiu',
  'chushu',
  'bailu',
  'qiufen',
  'hanlu',
  'shuangjiang',
  'lidong',
  'xiaoxue',
  'daxue',
  'dongzhi',
  'xiaohan',
  'dahan',
]);

const SOLAR_TERM_NAMES = set_multi_helper(
  [
    [
      'lichun',
      'lichun',
      'lập xuân',
      '立春',
      '立春',
      '立春',
      'りっしゅん',
      'リッシュン',
    ],
    [
      'yushui',
      'yushui',
      'vũ thủy',
      '雨水',
      '雨水',
      '雨水',
      'うすい',
      'ウスイ',
    ],
    [
      'jingzhe',
      'jingzhe',
      'kinh trập',
      '惊蛰',
      '驚蟄',
      '啓蟄',
      'けいちつ',
      'ケイチツ',
    ],
    [
      'chunfen',
      'chunfen',
      'xuân phân',
      '春分',
      '春分',
      '春分',
      'しゅんぶん',
      'シュンブン',
    ],
    [
      'qingming',
      'qingming',
      'thanh minh',
      '清明',
      '清明',
      '清明',
      'せいめい',
      'セイメイ',
    ],
    [
      'guyu',
      'guyu',
      'cốc vũ',
      '谷雨',
      '穀雨',
      '穀雨',
      'こくう',
      'コクウ',
    ],
    [
      'lixia',
      'lixia',
      'lập hạ',
      '立夏',
      '立夏',
      '立夏',
      'りっか',
      'リッカ',
    ],
    [
      'xiaoman',
      'xiaoman',
      'tiểu mãn',
      '小满',
      '小滿',
      '小満',
      'しょうまん',
      'ショウマン',
    ],
    [
      'mangzhong',
      'mangzhong',
      'mang chủng',
      '芒种',
      '芒種',
      '芒種',
      'ぼうしゅ',
      'ボウシュ',
    ],
    [
      'xiazhi',
      'xiazhi',
      'hạ chí',
      '夏至',
      '夏至',
      '夏至',
      'げし',
      'ゲシ',
    ],
    [
      'xiaoshu',
      'xiaoshu',
      'tiểu thử',
      '小暑',
      '小暑',
      '小暑',
      'しょうしょ',
      'ショウショ',
    ],
    [
      'dashu',
      'dashu',
      'đại thử',
      '大暑',
      '大暑',
      '大暑',
      'たいしょ',
      'タイショ',
    ],
    [
      'liqiu',
      'liqiu',
      'lập thu',
      '立秋',
      '立秋',
      '立秋',
      'りっしゅう',
      'リッシュウ',
    ],
    [
      'chushu',
      'chushu',
      'xử thử',
      '处暑',
      '處暑',
      '處暑',
      'しょしょ',
      'ショショ',
    ],
    [
      'bailu',
      'bailu',
      'bạch lộ',
      '白露',
      '白露',
      '白露',
      'はくろ',
      'ハクロ',
    ],
    [
      'qiufen',
      'qiufen',
      'thu phân',
      '秋分',
      '秋分',
      '秋分',
      'しゅうぶん',
      'シュウブン',
    ],
    [
      'hanlu',
      'hanlu',
      'hàn lộ',
      '寒露',
      '寒露',
      '寒露',
      'かんろ',
      'カンロ',
    ],
    [
      'shuangjiang',
      'shuangjiang',
      'sương giáng',
      '霜降',
      '霜降',
      '霜降',
      'そうこう',
      'ソウコウ',
    ],
    [
      'lidong',
      'lidong',
      'lập đông',
      '立冬',
      '立冬',
      '立冬',
      'りっとう',
      'リットウ',
    ],
    [
      'xiaoxue',
      'xiaoxue',
      'tiểu tuyết',
      '小雪',
      '小雪',
      '小雪',
      'しょうせつ',
      'ショウセツ',
    ],
    [
      'daxue',
      'daxue',
      'đại tuyết',
      '大雪',
      '大雪',
      '大雪',
      'たいせつ',
      'タイセツ',
    ],
    [
      'dongzhi',
      'dongzhi',
      'đông chí',
      '冬至',
      '冬至',
      '冬至',
      'とうじ',
      'トウジ',
    ],
    [
      'xiaohan',
      'xiaohan',
      'tiểu hàn',
      '小寒',
      '小寒',
      '小寒',
      'しょうかん',
      'ショウカン',
    ],
    [
      'dahan',
      'dahan',
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

const solar_term_cycle = create_cycle(SOLAR_TERMS);

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

const SEARCH_WINDOW_DAYS = 15;
const DAY_MS = 24 * 60 * 60 * 1000;

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
export const get_solar_term_index = solar_term =>
  solar_term_cycle.index_of(solar_term);

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
