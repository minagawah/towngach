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
 *
 * @function label
 * @param {string} key Terminology key.
 * @returns {string} Display label.
 */
const label = key => {
  const term = get_term(key);
  return `${term.en.primary} (${term.zh_tw.primary})`;
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
  get_command_line_values,
  get_term,
  label,
  print_unresolved,
  value,
};
