/**
 * @module branch/branch
 */

import { create_cycle } from '../lib/cycle';
import { set_multi_helper } from '../locale';

/**
 * One of the 12 Di-Zhi (Earthly Branches)
 * (十二地支 / shi-er-di-zhi / thập nhị địa chi).
 *
 * @typedef {string} Branch
 */

/**
 * 12 Zhi (Branch) names in canonical cyclic order.
 *
 * @constant {Array.<Branch>}
 */
export const BRANCHES = Object.freeze([
  'zi',
  'chou',
  'yin',
  'mao',
  'chen',
  'si',
  'wu',
  'wei',
  'shen',
  'you',
  'xu',
  'hai',
]);

/**
 * Localization definitions for 12 Di-Zhi (Earthly Branch) names.
 *
 * @type {Object.<string, BranchNameData>}
 */

/**
 * Data entry for a localized Di-Zhi (Earthly Branch) name.
 *
 * @typedef {Object} BranchNameData
 * @property {LocalizedData} name - The localized branch name.
 * @example
 * {
 *   zi: {
 *     name: {
 *       en: { primary: 'zi' },
 *       vi: { primary: 'tý' },
 *       zh_ch: { primary: '子' },
 *       zh_tw: { primary: '子' },
 *       ja: { kanji: '子', hiragana: 'ね', katakana: 'ネ' }
 *     }
 *   },
 * }
 */
const BRANCH_NAMES = set_multi_helper(
  [
    ['zi', 'zi', 'tý', '子', '子', '子', 'ね', 'ネ'],
    [
      'chou',
      'chou',
      'sửu',
      '丑',
      '丑',
      '丑',
      'うし',
      'ウシ',
    ],
    ['yin', 'yin', 'dần', '寅', '寅', '寅', 'とら', 'トラ'],
    ['mao', 'mao', 'mão', '卯', '卯', '卯', 'う', 'ウ'],
    [
      'chen',
      'chen',
      'thìn',
      '辰',
      '辰',
      '辰',
      'たつ',
      'タツ',
    ],
    ['si', 'si', 'tỵ', '巳', '巳', '巳', 'み', 'ミ'],
    ['wu', 'wu', 'ngọ', '午', '午', '午', 'うま', 'ウマ'],
    [
      'wei',
      'wei',
      'mùi',
      '未',
      '未',
      '未',
      'ひつじ',
      'ヒツジ',
    ],
    [
      'shen',
      'shen',
      'thân',
      '申',
      '申',
      '申',
      'さる',
      'サル',
    ],
    ['you', 'you', 'dậu', '酉', '酉', '酉', 'とり', 'トリ'],
    ['xu', 'xu', 'tuất', '戌', '戌', '戌', 'いぬ', 'イヌ'],
    ['hai', 'hai', 'hợi', '亥', '亥', '亥', 'い', 'イ'],
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
 * Data entry for an Di-Zhi (Earthly Branch) definition.
 *
 * @typedef {Object} BranchDefinition
 * @property {Branch} branch - The canonical branch key.
 * @property {number} index - Position in the canonical cycle.
 * @property {'yang'|'yin'} polarity - The branch polarity.
 * @property {LocalizedData} name - Localized branch name.
 */

/**
 * Stable metadata for each Di-Zhi (Earthly Branch).
 *
 * @constant {Array.<BranchDefinition>}
 */
export const BRANCH_DEFINITIONS = Object.freeze(
  BRANCHES.map((branch, index) =>
    Object.freeze({
      branch,
      index,
      polarity: index % 2 === 0 ? 'yang' : 'yin',
      name: BRANCH_NAMES[branch].name,
    })
  )
);

const branch_cycle = create_cycle(BRANCHES);

/**
 * The first Di-Zhi.
 *
 * @constant {Branch}
 */
export const BRANCH = BRANCHES[0];

/**
 * Returns all 12 Di-Zhi (Earthly Branch).
 *
 * @typedef {function} get_branches
 * @returns {Array.<Branch>}
 */
export const get_branches = () => branch_cycle.get_all();

/**
 * Returns the Zhi (branch) at a cyclic index.
 *
 * @typedef {function} get_branch
 * @param {number} index
 * @returns {Branch}
 */
export const get_branch = index => branch_cycle.get(index);

/**
 * Returns the canonical Zhi (branch) index.
 *
 * @typedef {function} get_branch_index
 * @param {Branch} branch
 * @returns {number}
 */
export const get_branch_index = branch => {
  const index = branch_cycle.index_of(branch);
  if (index < 0) throw new TypeError('Invalid branch.');
  return index;
};

/**
 * Returns stable metadata for an Di-Zhi (Earthly Branch).
 *
 * @typedef {function} get_branch_definition
 * @param {Branch} branch
 * @returns {BranchDefinition}
 */
export const get_branch_definition = branch => {
  const definition = BRANCH_DEFINITIONS.find(
    item => item.branch === branch
  );

  if (!definition) {
    throw new TypeError('Invalid branch.');
  }

  return definition;
};

/**
 * Checks whether a value is a branch.
 *
 * @typedef {function} is_branch
 * @param {*} value
 * @returns {boolean}
 */
export const is_branch = value => branch_cycle.is(value);

/**
 * Shifts a branch through the cycle.
 *
 * @typedef {function} shift_branch
 * @param {Branch} branch
 * @param {number} offset
 * @returns {Branch}
 */
export const shift_branch = (branch, offset) =>
  branch_cycle.shift(branch, offset);
