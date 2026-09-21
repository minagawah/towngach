/**
 * Shared utilities for the manual Purple-White checkers.
 *
 * @module scripts/shared/manual_checker
 */

/**
 * Input values for a manual checker.
 *
 * @typedef {Object} InputValues
 * @property {number} [year] Gregorian year.
 * @property {number} [month] Gregorian month.
 * @property {number} [day] Gregorian day.
 * @property {number} [hour] Hour from 0 through 23.
 * @property {number} [minute] Minute from 0 through 59.
 */

const path = require('path');
const readline = require('readline/promises');
const { stdin, stdout } = require('process');
const babel = require('@babel/core');

const original_loader = require.extensions['.js'];

require.extensions['.js'] = (module, filename) => {
  if (
    filename.includes(`${path.sep}node_modules${path.sep}`)
  ) {
    original_loader(module, filename);
    return;
  }

  const transformed = babel.transformFileSync(filename, {
    configFile: path.resolve(
      __dirname,
      '../../babel.config.js'
    ),
    envName: 'commonjs',
  });
  module._compile(transformed.code, filename);
};

const { Calendar, Terminology } = require('../../src');

const { create_calendar_date } = Calendar;
const { get_terminology } = Terminology;

const DEFAULTS = Object.freeze({
  year: 1985,
  month: 10,
  day: 26,
  hour: 1,
  minute: 35,
});

const FIELDS = Object.freeze([
  ['year', 'year'],
  ['month', 'month'],
  ['day', 'day'],
  ['hour', 'hour'],
  ['minute', 'minute'],
]);

/**
 * Returns shared terminology by key.
 *
 * @function get_term
 * @param {string} key Terminology key.
 * @returns {Object} Localized terminology data.
 */
const get_term = key => get_terminology(key);

/**
 * Formats an English-first display label.
 * Title-cases the English portion, preserving
 * already-properly-cased words and handling
 * hyphens (e.g. "Purple-White" stays intact).
 *
 * @function label
 * @param {string} key Terminology key.
 * @returns {string} Display label.
 */
const label = key => {
  const term = get_term(key);
  const en = term.en.primary.replace(/_/g, ' ');
  const formatted = en
    .split(/([\s-]+)/)
    .map(part => {
      if (/^[\s-]+$/.test(part)) return part;
      const lower = part.toLowerCase();
      return part[0] !== lower[0]
        ? part
        : part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join('');
  return `${formatted} (${term.zh_tw.primary})`;
};

/**
 * Formats a Traditional-Chinese-first value.
 *
 * @function value
 * @param {Object} definition Localized definition.
 * @returns {string} Display value.
 */
const value = definition =>
  `${definition.name.zh_tw.primary} (${definition.name.en.primary})`;

/**
 * Formats an English value into kebab-case
 * with each segment capitalized.
 * Replaces spaces and underscores with hyphens,
 * then title-cases each segment.
 *
 * @function format_value
 * @param {string} value English display value.
 * @returns {string} Capitalized kebab-case value.
 */
const format_value = value =>
  value
    .replace(/[\s_]+/g, '-')
    .split('-')
    .map(
      segment =>
        segment.charAt(0).toUpperCase() +
        segment.slice(1).toLowerCase()
    )
    .join('-');

/**
 * Formats a Traditional-Chinese-first value.
 * The en portion is formatted as kebab-case.
 *
 * @function formatted_value
 * @param {Object} definition Localized definition.
 * @returns {string} Display value.
 */
const formatted_value = definition =>
  `${definition.name.zh_tw.primary} (${format_value(definition.name.en.primary)})`;

/**
 * Parses one integer input field.
 *
 * @function parse_value
 * @param {string} value Raw input.
 * @param {string} field Field name.
 * @returns {number} Parsed integer.
 * @throws {Error} If the value is not an integer.
 */
const parse_value = (value, field) => {
  const parsed = Number(value);
  if (!Number.isInteger(parsed)) {
    throw new Error(`${field} must be an integer.`);
  }
  return parsed;
};

/**
 * Reads positional command-line values.
 *
 * @function get_command_line_values
 * @returns {InputValues} Supplied values.
 */
const get_command_line_values = () => {
  const values = process.argv.slice(2);
  return FIELDS.reduce((result, [key], index) => {
    if (values[index] !== undefined) {
      result[key] = parse_value(values[index], key);
    }
    return result;
  }, {});
};

/**
 * Asks for missing values in interactive mode.
 *
 * @function ask_for_values
 * @param {InputValues} values Existing values.
 * @returns {Promise.<InputValues>} Completed values.
 */
const ask_for_values = async values => {
  if (
    !stdin.isTTY ||
    Object.keys(values).length === FIELDS.length
  ) {
    return values;
  }

  const prompt = readline.createInterface({
    input: stdin,
    output: stdout,
  });

  try {
    for (const [key] of FIELDS) {
      if (values[key] !== undefined) continue;
      const answer = await prompt.question(
        `${label(key)} [${DEFAULTS[key]}]: `
      );
      values[key] =
        answer.trim() === ''
          ? DEFAULTS[key]
          : parse_value(answer, key);
    }
    return values;
  } finally {
    prompt.close();
  }
};

/**
 * Creates a normalized calendar date.
 *
 * @function create_target
 * @param {InputValues} values Input values.
 * @returns {CalendarDate} Normalized date.
 */
const create_target = values =>
  create_calendar_date({
    year: values.year ?? DEFAULTS.year,
    month: values.month ?? DEFAULTS.month,
    day: values.day ?? DEFAULTS.day,
    hour: values.hour ?? DEFAULTS.hour,
    minute: values.minute ?? DEFAULTS.minute,
  });

/**
 * Formats a Towngach date or JavaScript Date.
 *
 * @function format_date
 * @param {CalendarDate|Date} value Date value.
 * @returns {string} ISO datetime string.
 */
const format_date = value => {
  const date =
    value.date instanceof Date ? value.date : value;
  return date.toISOString().replace('.000Z', 'Z');
};

/**
 * Formats a JavaScript Date as a human-readable
 * timestamp with UTC offset.
 *
 * Format: YYYY-MM-DD HH:mm:ss UTC (+HH:MM).
 *
 * @function format_datetime
 * @param {CalendarDate|Date} value Date value.
 * @returns {string} Human-readable datetime string.
 */
const format_datetime = value => {
  const date =
    value.date instanceof Date ? value.date : value;

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(
    2,
    '0'
  );
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hour = String(date.getUTCHours()).padStart(2, '0');
  const minute = String(date.getUTCMinutes()).padStart(
    2,
    '0'
  );
  const second = String(date.getUTCSeconds()).padStart(
    2,
    '0'
  );

  const offsetMinutes = -date.getTimezoneOffset();
  const offsetSign = offsetMinutes >= 0 ? '+' : '-';
  const offsetHours = String(
    Math.floor(Math.abs(offsetMinutes) / 60)
  ).padStart(2, '0');
  const offsetMinutesPart = String(
    Math.abs(offsetMinutes) % 60
  ).padStart(2, '0');

  return `${year}-${month}-${day} ${hour}:${minute}:${second} UTC (${offsetSign}${offsetHours}:${offsetMinutesPart})`;
};

/**
 * Prints an unresolved historical rule.
 *
 * @function print_unresolved
 * @param {string} display_label Display label.
 * @param {Function} callback Calculation callback.
 * @returns {void}
 */
const print_unresolved = (display_label, callback) => {
  try {
    callback();
  } catch (error) {
    console.log(
      `  ${display_label}: ${value({
        name: get_term('unresolved'),
      })} (${error.message})`
    );
  }
};

module.exports = {
  DEFAULTS,
  FIELDS,
  ask_for_values,
  create_target,
  format_date,
  format_datetime,
  format_value,
  formatted_value,
  get_command_line_values,
  get_term,
  label,
  print_unresolved,
  value,
};
