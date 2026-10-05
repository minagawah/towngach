/**
 * @module purple_white/methods/houkan/_shared
 */

import { normalize_calendar_date } from '../../../calendar';
import { get_branch } from '../../../branch';

import {
  get_sexagen_by_index,
  get_sexagen_definition,
} from '../../../sexagen';

import {
  get_solar_term,
  get_solar_term_for_date,
  get_solar_term_index,
  get_solar_term_start,
} from '../../../solar_term';

import { create_purple_white_flight } from '../../core/movement/flight';
import { create_purple_white_result } from '../../core/utils/purple_white';
import { get_purple_white_star } from '../../core/nine_stars/star';

const HOUR_MS = 2 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;
const DAY_REFERENCE = Date.UTC(2000, 0, 7);

const YANG_DUN_TERMS = Object.freeze([
  'dong_zhi',
  'yu_shui',
  'gu_yu',
]);

const YIN_DUN_TERMS = Object.freeze([
  'xia_zhi',
  'chu_shu',
  'shuang_jiang',
]);

const HOURLY_GROUPS = Object.freeze({
  upper: Object.freeze(['zi', 'wu', 'mao', 'you']),
  middle: Object.freeze(['yin', 'shen', 'si', 'hai']),
  lower: Object.freeze(['chen', 'xu', 'chou', 'wei']),
});

const STARTING_STARS = Object.freeze({
  yang: Object.freeze({ upper: 1, middle: 7, lower: 4 }),
  yin: Object.freeze({ upper: 9, middle: 3, lower: 6 }),
});

const DAILY_PERIODS = Object.freeze([
  Object.freeze({
    name: 'winter_solstice',
    solar_term: 'dong_zhi',
    dun: 'yang',
    san_yuan: 'upper',
    starting_star: 1,
  }),
  Object.freeze({
    name: 'rain_water',
    solar_term: 'yu_shui',
    dun: 'yang',
    san_yuan: 'middle',
    starting_star: 7,
  }),
  Object.freeze({
    name: 'grain_rain',
    solar_term: 'gu_yu',
    dun: 'yang',
    san_yuan: 'lower',
    starting_star: 4,
  }),
  Object.freeze({
    name: 'summer_solstice',
    solar_term: 'xia_zhi',
    dun: 'yin',
    san_yuan: 'upper',
    starting_star: 9,
  }),
  Object.freeze({
    name: 'limit_of_heat',
    solar_term: 'chu_shu',
    dun: 'yin',
    san_yuan: 'middle',
    starting_star: 3,
  }),
  Object.freeze({
    name: 'frost_descent',
    solar_term: 'shuang_jiang',
    dun: 'yin',
    san_yuan: 'lower',
    starting_star: 6,
  }),
]);

const DAILY_SOLSTICES = Object.freeze([
  Object.freeze({
    solar_term: 'dong_zhi',
    name: 'winter_solstice',
    first: Object.freeze({
      direction: -1,
      starting_star: 9,
    }),
    second: Object.freeze({
      direction: 1,
      starting_star: 8,
    }),
  }),
  Object.freeze({
    solar_term: 'xia_zhi',
    name: 'summer_solstice',
    first: Object.freeze({
      direction: 1,
      starting_star: 9,
    }),
    second: Object.freeze({
      direction: -1,
      starting_star: 2,
    }),
  }),
]);

const get_traditional_day_date = date => {
  const normalized = normalize_calendar_date(date);
  const day = new Date(normalized.timestamp);

  if (normalized.hour >= 23)
    day.setUTCDate(day.getUTCDate() + 1);

  return new Date(
    Date.UTC(
      day.getUTCFullYear(),
      day.getUTCMonth(),
      day.getUTCDate()
    )
  );
};

/**
 * Returns the sexagenary day
 * (日干支) using the repository's
 * UTC date adapter.
 * 2000-01-07 is the implementation
 * reference treated as "甲子".
 *
 * @param {*} date
 * @returns {Object}
 */
export const get_houkan_day_sexagen = date => {
  const day = get_traditional_day_date(date);
  const offset = Math.floor(
    (day.getTime() - DAY_REFERENCE) / DAY_MS
  );
  const sexagen = get_sexagen_by_index(offset);

  return {
    sexagen,
    ...get_sexagen_definition(sexagen),
    traditional_day: day,
  };
};

/**
 * Returns the traditional double-hour
 * branch (時支). "子時" begins at 23:00.
 *
 * @param {*} date
 * @returns {Branch}
 */
export const get_houkan_hour_branch = date => {
  const hour = normalize_calendar_date(date).hour;
  return get_branch(Math.floor(((hour + 1) % 24) / 2));
};

/**
 * Determines the latest supported
 * Yin/Yang Dun (陰陽遁) boundary.
 *
 * @param {*} date
 * @returns {Object}
 */
export const determine_houkan_dun = date => {
  const normalized = normalize_calendar_date(date);

  const detected =
    get_solar_term_for_date(normalized).solar_term;

  const detected_index = get_solar_term_index(detected);

  const terms = [...YANG_DUN_TERMS, ...YIN_DUN_TERMS];

  const candidates = terms.map(solar_term => {
    const index = get_solar_term_index(solar_term);

    const year =
      index > detected_index
        ? normalized.year - 1
        : normalized.year;

    const date = get_solar_term_start(
      solar_term,
      year
    ).date;

    return { solar_term, date };
  });

  const applicable = candidates
    .filter(
      item => item.date.timestamp <= normalized.timestamp
    )
    .sort(
      (left, right) =>
        left.date.timestamp - right.date.timestamp
    )
    .at(-1);

  if (!applicable)
    throw new Error(
      'Unable to determine Houkan Dun boundary.'
    );

  return {
    ...applicable,
    dun: YANG_DUN_TERMS.includes(applicable.solar_term)
      ? 'yang'
      : 'yin',
  };
};

/**
 * Classifies an hourly branch into
 * the confirmed Three Yuan (三元) groups.
 *
 * @param {Branch} branch
 * @returns {string}
 */
export const determine_houkan_hourly_san_yuan = branch => {
  const san_yuan = Object.entries(HOURLY_GROUPS).find(
    ([, branches]) => branches.includes(branch)
  )?.[0];

  if (!san_yuan)
    throw new TypeError('Invalid hourly branch.');

  return san_yuan;
};

/**
 * Returns the confirmed hourly
 * origin star (時家起始星).
 *
 * @param {string} dun
 * @param {string} san_yuan
 * @returns {PurpleWhiteStar}
 */
export const get_houkan_hourly_starting_star = (
  dun,
  san_yuan
) => {
  const number = STARTING_STARS[dun]?.[san_yuan];
  if (!number)
    throw new TypeError('Invalid Houkan hourly origin.');
  return get_purple_white_star(number);
};

const get_day_start = day => day.getTime() - HOUR_MS / 2;

/**
 * Determines the latest "甲己"-day
 * (甲己日) "子"-hour (子時) origin
 * without
 * selecting a future boundary
 * or using an arbitrary search window.
 *
 * @param {*} date
 * @returns {Object}
 */
export const determine_houkan_hourly_origin = date => {
  const normalized = normalize_calendar_date(date);
  const day = get_houkan_day_sexagen(normalized);
  const days_from_jia_ji = day.index % 5;

  const origin_day = new Date(
    day.traditional_day.getTime()
  );

  origin_day.setUTCDate(
    origin_day.getUTCDate() - days_from_jia_ji
  );

  const start = get_day_start(origin_day);

  const elapsed = normalized.timestamp - start;
  if (elapsed < 0)
    throw new Error(
      'Houkan hourly origin begins in the future.'
    );

  return {
    start: new Date(start),
    origin_day,
    elapsed_hours: Math.floor(elapsed / HOUR_MS),
    day_sexagen: day,
  };
};

const normalize_star_number = number =>
  ((((number - 1) % 9) + 9) % 9) + 1;

/**
 * Returns the effective year at the Li-Chun boundary.
 *
 * Houkan annual Three-Yuan anchors documented in 方鑑秘伝集 are
 * Jia-Zi years 1684 (upper), 1744 (middle), and 1804 (lower).
 * Each 60-year Yuan runs in reverse star order from its anchor star.
 */
export const get_houkan_effective_year = date =>
  get_solar_term_start(
    'li_chun',
    normalize_calendar_date(date).year
  ).date.timestamp <=
  normalize_calendar_date(date).timestamp
    ? normalize_calendar_date(date).year
    : normalize_calendar_date(date).year - 1;

export const get_houkan_annual_star_number = year => {
  const offset = (((year - 1684) % 180) + 180) % 180;
  const yuan = Math.floor(offset / 60);
  const starting_star = [1, 4, 7][yuan];
  return normalize_star_number(
    starting_star - (offset % 60)
  );
};

/**
 * Returns the Sixty Gan-Zhi Unit month used by Houkan's historical
 * 60-month circulation. The source example begins the Upper-Yuan
 * Jia-Zi Month at the Li-Dong boundary before the documented Jia-Zi Year;
 * the following months are Yi-Chou and Bing-Yin.
 */
export const get_houkan_month_sexagen = date => {
  const normalized = normalize_calendar_date(date);
  const effective_year =
    get_houkan_effective_year(normalized);
  const month_terms = [
    'li_dong',
    'da_xue',
    'xiao_han',
    'li_chun',
    'jing_zhe',
    'qing_ming',
    'li_xia',
    'mang_zhong',
    'xiao_shu',
    'li_qiu',
    'bai_lu',
    'han_lu',
  ];

  const candidates = month_terms
    .flatMap(solar_term =>
      [
        effective_year - 1,
        effective_year,
        effective_year + 1,
      ].map(year => ({
        solar_term,
        year,
        date: get_solar_term_start(solar_term, year).date,
      }))
    )
    .filter(
      item => item.date.timestamp <= normalized.timestamp
    )
    .sort((a, b) => a.date.timestamp - b.date.timestamp);

  const boundary = candidates.at(-1);
  if (!boundary)
    throw new Error(
      'Unable to determine Houkan monthly boundary.'
    );

  const term_index = month_terms.indexOf(
    boundary.solar_term
  );
  const anchor = get_solar_term_start('li_dong', 1683).date;
  const months = (boundary.year - 1683) * 12 + term_index;
  const index = ((months % 60) + 60) % 60;
  const sexagen = get_sexagen_by_index(index);

  return {
    ...get_sexagen_definition(sexagen),
    solar_term: boundary.solar_term,
    solar_term_boundary: boundary.date,
    anchor,
  };
};

export const get_houkan_monthly_star_number = date => {
  const month = get_houkan_month_sexagen(date);
  const term_order = [
    'li_dong',
    'da_xue',
    'xiao_han',
    'li_chun',
    'jing_zhe',
    'qing_ming',
    'li_xia',
    'mang_zhong',
    'xiao_shu',
    'li_qiu',
    'bai_lu',
    'han_lu',
  ];
  const term_index = term_order.indexOf(month.solar_term);
  const cycle_year =
    month.solar_term === 'li_dong' ||
    month.solar_term === 'da_xue'
      ? month.solar_term_boundary.year
      : month.solar_term_boundary.year - 1;
  const elapsed_months =
    (cycle_year - 1683) * 12 + term_index;
  const offset = ((elapsed_months % 180) + 180) % 180;
  const yuan = Math.floor(offset / 60);
  const starting_star = [1, 4, 7][yuan];
  return normalize_star_number(
    starting_star - (offset % 60)
  );
};

/**
 * Creates the shared Purple-White
 * flight (紫白飛泊) result.
 *
 * @param {number} star_number
 * @param {string} dun
 * @returns {PurpleWhiteResult}
 */
export const create_houkan_result = (star_number, dun) => {
  const direction = dun === 'yang' ? 'forward' : 'reverse';
  const star = get_purple_white_star(star_number);

  const flight = create_purple_white_flight(
    star,
    'center',
    direction
  );

  return create_purple_white_result({
    star,
    palace: 'center',
    direction,
    flight,
  });
};

/**
 * Determines the active actual
 * solar-term (節氣) boundary for
 * monthly logic.
 *
 * @param {*} date
 * @returns {Object}
 */
export const determine_houkan_monthly_period = date => {
  const normalized = normalize_calendar_date(date);

  const detected =
    get_solar_term_for_date(normalized).solar_term;

  const index = get_solar_term_index(detected);

  let solar_term = detected;
  let year = normalized.year;
  let boundary = get_solar_term_start(
    solar_term,
    year
  ).date;

  if (boundary.timestamp > normalized.timestamp) {
    solar_term = get_solar_term(index - 1);
    if (index === 0) year -= 1;
    boundary = get_solar_term_start(solar_term, year).date;
  }

  return { solar_term, boundary, date: normalized };
};

export const HOUKAN_HOURLY_GROUPS = HOURLY_GROUPS;
export const HOUKAN_STARTING_STARS = STARTING_STARS;

export const HOUKAN_SOLAR_TERM_PERIODS = Object.freeze({
  yang: YANG_DUN_TERMS,
  yin: YIN_DUN_TERMS,
});

const shift_calendar_day = (date, days) => {
  const shifted = new Date(date.getTime());
  shifted.setUTCDate(shifted.getUTCDate() + days);
  return shifted;
};

/**
 * Returns the first 甲子 on or after a traditional day.
 *
 * @private
 * @param {Date} day
 * @returns {Date}
 */
const get_jia_zi_on_or_after = day => {
  const sexagen = get_houkan_day_sexagen(day);
  return shift_calendar_day(
    sexagen.traditional_day,
    sexagen.index === 0 ? 0 : 60 - sexagen.index
  );
};

const get_daily_period_occurrences = year =>
  DAILY_PERIODS.map(period => {
    const boundary = get_solar_term_start(
      period.solar_term,
      year
    ).date;
    const boundary_day =
      get_houkan_day_sexagen(boundary).traditional_day;
    const start = get_jia_zi_on_or_after(boundary_day);

    return {
      ...period,
      boundary,
      start,
      start_sexagen: 'jia_zi',
      year,
    };
  });

/**
 * Determines the active ordinary daily 60-day state.
 *
 * The historical tables are keyed by 甲子 starts, not by
 * the astronomical instant of the named solar term itself.
 * The first 甲子 on or after each seasonal boundary is used.
 *
 * @param {*} date
 * @returns {Object}
 */
export const determine_houkan_daily_period = date => {
  const normalized = normalize_calendar_date(date);
  const candidates = [
    ...get_daily_period_occurrences(normalized.year - 1),
    ...get_daily_period_occurrences(normalized.year),
    ...get_daily_period_occurrences(normalized.year + 1),
  ]
    .filter(
      item => item.start.getTime() <= normalized.timestamp
    )
    .sort(
      (left, right) =>
        left.start.getTime() - right.start.getTime()
    );

  const active = candidates.at(-1);

  if (!active)
    throw new Error(
      'Unable to determine Houkan daily period.'
    );

  return {
    ...active,
    date: normalized,
    direction: active.dun === 'yang' ? 1 : -1,
    periods: DAILY_PERIODS.map(period => [
      period.name,
      period.dun,
      period.san_yuan,
      period.starting_star,
    ]),
  };
};

const get_leap_occurrences = year =>
  DAILY_SOLSTICES.map(solstice => {
    const boundary = get_solar_term_start(
      solstice.solar_term,
      year
    ).date;
    const boundary_day = get_houkan_day_sexagen(boundary);

    if (boundary_day.sexagen !== 'jia_wu') return null;

    // The source's 「後の甲子を取用ひ」 is implemented literally:
    // 甲午 is followed by 甲子 exactly 30 days later.
    const start = shift_calendar_day(
      boundary_day.traditional_day,
      30
    );
    const end = shift_calendar_day(start, 59);

    return {
      name: solstice.name,
      solar_term: solstice.solar_term,
      boundary,
      boundary_day: boundary_day.traditional_day,
      trigger_sexagen: boundary_day.sexagen,
      start,
      end,
      first: solstice.first,
      second: solstice.second,
      year,
    };
  }).filter(Boolean);

/**
 * Determines whether a date is inside an applicable 閏九星
 * interval, returning the active half of the 60-day recipe.
 *
 * Winter: 30 days reverse/Yin, then 30 days forward/Yang.
 * Summer: 30 days forward/Yang, then 30 days reverse/Yin.
 *
 * @param {*} date
 * @returns {Object|null}
 */
export const get_houkan_daily_leap_period = date => {
  const normalized = normalize_calendar_date(date);
  const occurrences = [
    ...get_leap_occurrences(normalized.year - 1),
    ...get_leap_occurrences(normalized.year),
    ...get_leap_occurrences(normalized.year + 1),
  ];

  const leap = occurrences.find(item => {
    const timestamp =
      get_houkan_day_sexagen(
        normalized
      ).traditional_day.getTime();
    return (
      timestamp >= item.start.getTime() &&
      timestamp <= item.end.getTime()
    );
  });

  if (!leap) return null;

  const elapsed_days = Math.floor(
    (get_houkan_day_sexagen(
      normalized
    ).traditional_day.getTime() -
      leap.start.getTime()) /
      DAY_MS
  );
  const half = elapsed_days < 30 ? leap.first : leap.second;

  return {
    ...leap,
    phase: elapsed_days < 30 ? 'first' : 'second',
    direction: half.direction,
    dun: half.direction === 1 ? 'yang' : 'yin',
    starting_star: half.starting_star,
    elapsed_days,
  };
};
