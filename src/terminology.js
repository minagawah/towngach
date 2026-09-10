/**
 * @module terminology
 */

import { set_multi_helper } from './locale';

/**
 * Shared localized terminology
 * for Eastern astrological concepts.
 *
 * English is the source-facing label;
 * Traditional Chinese is the default
 * display value used by
 * the manual checkers.
 */
const TERMINOLOGY = set_multi_helper(
  [
    ['houkan', 'Houkan', '方鑑'],
    ['purple_white', 'Purple-White Nine Stars', '紫白九星'],
    ['input', 'input', '輸入'],
    ['year', 'year', '年'],
    ['month', 'month', '月'],
    ['day', 'day', '日'],
    ['hour', 'hour', '時'],
    ['minute', 'minute', '分'],
    ['hourly', 'hourly', '時家'],
    ['monthly_boundary', 'monthly boundary', '月界'],
    ['daily_structure', 'daily structure', '日家結構'],
    [
      'calculation_availability',
      'calculation availability',
      '計算可用性',
    ],
    ['day_sexagen', 'day sexagen', '日干支'],
    ['hour_branch', 'hour branch', '時支'],
    ['dun', 'Dun', '遁'],
    ['yang_dun', 'Yang Dun', '陽遁'],
    ['yin_dun', 'Yin Dun', '陰遁'],
    ['three_yuan', 'Three Yuan', '三元'],
    ['star', 'star', '紫白星'],
    ['flight', 'flight', '飛泊'],
    ['origin', 'origin', '元起點'],
    ['solar_term', 'solar term', '節氣'],
    ['boundary', 'boundary', '交節時刻'],
    ['annual_result', 'annual result', '年家結果'],
    ['monthly_result', 'monthly result', '月家結果'],
    ['daily_result', 'daily result', '日家結果'],
    ['unresolved', 'unresolved', '未定'],
    ['forward', 'forward flight', '順飛'],
    ['reverse', 'reverse flight', '逆飛'],
    ['upper', 'upper', '上元'],
    ['middle', 'middle', '中元'],
    ['lower', 'lower', '下元'],
  ].map(([key, en, zh_tw]) => ({
    key,
    name: {
      en: { pr: en },
      zh_tw: { pr: zh_tw },
    },
  })),
  ['name']
);

/**
 * Returns a localized
 * terminology definition.
 *
 * @param {string} key
 * @returns {Object}
 */
export const get_terminology = key => {
  const definition = TERMINOLOGY[key];
  if (!definition)
    throw new TypeError('Invalid terminology key.');
  return definition.name;
};

export { TERMINOLOGY };
