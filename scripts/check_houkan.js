#!/usr/bin/env node

/**
 * Small manual checker for Houkan (方鑑)
 * Purple-White (紫白九星) methods.
 *
 * Usage:
 *   node scripts/check_houkan.js
 *   node scripts/check_houkan.js \
 *     1974 5 10 4 0
 *
 * Positional arguments are year, month, day,
 * hour, and optional minute. When arguments
 * are omitted in an interactive terminal,
 * the script asks for each value and uses
 * the defaults below when input is blank.
 */

/**
 * Normalized Towngach calendar date.
 * @typedef {import('../src/calendar/calendar').CalendarDate} CalendarDate
 */

/**
 * earthly-branch (地支) identifier.
 * @typedef {import('../src/branch/branch').Branch} Branch
 */

/**
 * heavenly-stem (天干) identifier.
 * @typedef {import('../src/stem/stem').Stem} Stem
 */

/**
 * solar-term (二十四節気) identifier.
 * @typedef {import('../src/solar_term/solar_term').SolarTerm} SolarTerm
 */

/**
 * three-epoch (三元) identifier.
 * @typedef {import('../src/san_yuan/san_yuan').SanYuan} SanYuan
 */

/**
 * purple-white star (紫白九星) identifier.
 * @typedef {import('../src/purple_white/core/nine_stars/star').PurpleWhiteStar} PurpleWhiteStar
 */

/**
 * purple-white flight (紫白飛泊) direction.
 * @typedef {import('../src/purple_white/core/movement/flight').FlightDirection} FlightDirection
 */

/**
 * Localized presentation data.
 * @typedef {import('../src/locale/Localizer').LocalizedData} LocalizedData
 */

/**
 * A definition with localized display data.
 *
 * @typedef {Object} LocalizedDefinition
 * @property {LocalizedData} name
 */

/**
 * Sexagenary (六十干支) day data from Houkan.
 *
 * @typedef {Object} HoukanDaySexagen
 * @property {string} sexagen
 * @property {Stem} stem
 * @property {Branch} branch
 */

/**
 * Hourly Houkan result data.
 *
 * @typedef {Object} HoukanHourlyResult
 * @property {PurpleWhiteStar} star
 * @property {FlightDirection} direction
 * @property {SolarTerm} solar_term
 * @property {Branch} hour_branch
 * @property {SanYuan} san_yuan
 * @property {Date} origin_start
 */

const path = require('path');
const readline = require('readline/promises');
const { stdin, stdout } = require('process');
const babel = require('@babel/core');

// The source tree uses ES modules, while this
// manual checker is intended to run directly
// with Node. Install a small local Babel
// require hook so the script does not require
// a separate build step.

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
      '../babel.config.js'
    ),
    envName: 'commonjs',
  });
  module._compile(transformed.code, filename);
};

const {
  Branch,
  Calendar,
  SanYuan,
  SolarTerm,
  Stem,
  Terminology,
  PurpleWhite,
} = require('../src');

const { create_calendar_date } = Calendar;
const { get_terminology } = Terminology;
const { get_branch_definition } = Branch;
const { get_stem_definition } = Stem;
const { get_solar_term_definition } = SolarTerm;
const { get_san_yuan_definition } = SanYuan;

const {
  get_purple_white_star,
  get_purple_white_star_definition,
  get_purple_white_star_number,
} = PurpleWhite;

const houkan = PurpleWhite.methods.houkan;

/**
 * Input values for the target date and time.
 *
 * @typedef {Object} InputValues
 * @property {number} [year] Gregorian year.
 * @property {number} [month] Gregorian month.
 * @property {number} [day] Gregorian day.
 * @property {number} [hour] Hour from 0
 * through 23.
 * @property {number} [minute] Minute from 0
 * through 59.
 */

// Marty McFly escaping the
// Libyans at Twin Pines Mall

/**
 * Default Gregorian datetime.
 * @constant {InputValues}
 */
const DEFAULTS = Object.freeze({
  year: 1985,
  month: 10,
  day: 26,
  hour: 1,
  minute: 35,
});

/**
 * Input fields accepted by the checker.
 *
 * @constant {Array.<Array.<string>>}
 */
const FIELDS = Object.freeze([
  ['year', 'year'],
  ['month', 'month'],
  ['day', 'day'],
  ['hour', 'hour'],
  ['minute', 'minute'],
]);

/**
 * Maps daily period names to solar-term
 * (二十四節気) IDs. solar-term IDs belong
 * to the API.
 * @constant {Object.<string, string>}
 */
const DAILY_SOLAR_TERMS = Object.freeze({
  winter_solstice: 'dongzhi',
  rain_water: 'yushui',
  grain_rain: 'guyu',
  summer_solstice: 'xiazhi',
  limit_of_heat: 'chushu',
  frost_descent: 'shuangjiang',
});

/**
 * Returns shared terminology by key.
 *
 * @function
 * @param {string} key Terminology key.
 * @returns {LocalizedData}
 */
const get_term = key => get_terminology(key);

/**
 * Formats an English-first display label.
 *
 * @function
 * @param {string} key Terminology key.
 * @returns {string} English and Traditional
 * Chinese.
 */
const label = key => {
  const term = get_term(key);
  return `${term.en.primary} (${term.zh_tw.primary})`;
};

/**
 * Formats a Traditional-Chinese-first value.
 *
 * @function
 * @param {LocalizedDefinition} definition
 * Localized definition.
 * @returns {string} Traditional Chinese
 * and English.
 */
const value = definition =>
  `${definition.name.zh_tw.primary} (${definition.name.en.primary})`;

/**
 * Formats a sexagenary day (日干支).
 *
 * @function
 * @param {HoukanDaySexagen} day
 * Sexagenary day data.
 * @returns {string} Localized sexagenary day.
 */
const get_sexagen_value = day => {
  const stem = get_stem_definition(day.stem);
  const branch = get_branch_definition(day.branch);
  return (
    `${stem.name.zh_tw.primary}${branch.name.zh_tw.primary}` +
    ` (${stem.name.en.primary}_${branch.name.en.primary})`
  );
};

/**
 * Formats "yin/yang dun" (陰陽遁).
 *
 * @function
 * @param {FlightDirection} direction
 * Flight direction.
 * @returns {string} Localized Dun value.
 */
const get_dun_value = direction =>
  direction === 'forward'
    ? value({ name: get_term('yang_dun') })
    : value({ name: get_term('yin_dun') });

/**
 * Formats "purple-white-flight" (紫白飛泊).
 *
 * @function
 * @param {FlightDirection} direction
 * Flight direction.
 * @returns {string} Localized flight value.
 */
const get_flight_value = direction =>
  value({ name: get_term(direction) });

/**
 * Parses one integer input field.
 *
 * @function
 * @param {string} value Raw user input.
 * @param {string} field Field name.
 * @returns {number} Parsed integer.
 * @throws {Error} If input is not an integer.
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
 * @function
 * @returns {InputValues} Supplied input
 * values.
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
 * Asks for missing values in
 * interactive mode.
 *
 * @function
 * @param {InputValues} values
 * Existing input values.
 * @returns {Promise.<InputValues>}
 * Completed values.
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
 * @function
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
 * Formats a Towngach date or JS Date.
 *
 * @function
 * @param {CalendarDate|Date} value
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
 * @function
 * @param {string} label Display label.
 * @param {Function} callback
 * Calculation callback.
 * @returns {void}
 */
const print_unresolved = (label, callback) => {
  try {
    callback();
  } catch (error) {
    console.log(
      `  ${label}: ${value({
        name: get_term('unresolved'),
      })} (${error.message})`
    );
  }
};

/**
 * Runs the Houkan manual checker.
 * It reports hourly "purple-white"
 * (時家紫白), the active "solar-term"
 * (節氣), and the documented
 * "daily-three-epoch" (時家三元)
 * structure.
 *
 * @function
 * @returns {Promise.<void>} Completed check.
 */
const run = async () => {
  const values = await ask_for_values(
    get_command_line_values()
  );

  const target = create_target(values);
  const hourly = houkan.calculate_houkan_hourly(target);
  const monthly = houkan.determine_houkan_monthly(target);

  const daily =
    houkan.determine_houkan_daily_period(target);

  const day = houkan.get_houkan_day_sexagen(target);

  console.log(
    `\n${label('houkan')} ${value({
      name: get_term('purple_white'),
    })} check`
  );

  console.log(
    '\nMarty McFly escaping the Libyans at Twin Pines Mall\n'
  );

  console.log(
    `  ${label('input')}: ${format_date(target)}`
  );

  console.log(`\n${label('hourly')}`);

  console.log(
    `  ${label('day_sexagen')}: ${get_sexagen_value(day)}`
  );

  console.log(
    `  ${label('hour_branch')}: ${value(
      get_branch_definition(hourly.hour_branch)
    )}`
  );

  console.log(
    `  ${label('dun')}: ${get_dun_value(hourly.direction)}`
  );

  console.log(
    `  ${label('three_yuan')}: ${value(
      get_san_yuan_definition(hourly.san_yuan)
    )}`
  );

  console.log(
    `  ${label('star')}: ${value(
      get_purple_white_star_definition(hourly.star)
    )} (#${get_purple_white_star_number(hourly.star)})`
  );

  console.log(
    `  ${label('flight')}: ${get_flight_value(hourly.direction)}`
  );

  console.log(
    `  ${label('origin')}: ${format_date(hourly.origin_start)}`
  );

  console.log(`\n${label('monthly_boundary')}`);

  console.log(
    `  ${label('solar_term')}: ${value(
      get_solar_term_definition(monthly.solar_term)
    )}`
  );

  console.log(
    `  ${label('boundary')}: ${format_date(monthly.boundary)}`
  );

  console.log(`\n${label('daily_structure')}`);

  for (const [term, dun, san_yuan, star] of daily.periods) {
    const solar_term = DAILY_SOLAR_TERMS[term];
    const star_definition =
      get_purple_white_star_definition(
        get_purple_white_star(star)
      );

    console.log(
      `  ${value(get_solar_term_definition(solar_term))}: ` +
        `${value({ name: get_term(`${dun}_dun`) })}, ` +
        `${value({ name: get_term(san_yuan) })}, ` +
        `${value(star_definition)}`
    );
  }

  console.log(`\n${label('calculation_availability')}`);

  print_unresolved(label('annual_result'), () =>
    houkan.calculate_houkan_annual(target)
  );

  print_unresolved(label('monthly_result'), () =>
    houkan.calculate_houkan_monthly(target)
  );

  print_unresolved(label('daily_result'), () =>
    houkan.calculate_houkan_daily(target)
  );
};

run().catch(error => {
  console.error(`Error: ${error.message}`);
  process.exitCode = 1;
});
