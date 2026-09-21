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

const shared = require('./shared/manual_checker');
const {
  Branch,
  Calendar,
  SanYuan,
  SolarTerm,
  Stem,
  Terminology,
  PurpleWhite,
} = require('../src');

const {
  ask_for_values,
  create_target,
  format_date,
  format_datetime,
  get_command_line_values,
  get_term,
  formatted_value,
  label,
  print_unresolved,
  value,
} = shared;

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
 * Maps daily period names to solar-term
 * (二十四節気) IDs. Solar-term IDs belong
 * to the API.
 *
 * @constant {Object.<string, string>}
 */
const DAILY_SOLAR_TERMS = Object.freeze({
  winter_solstice: 'dong_zhi',
  rain_water: 'yu_shui',
  grain_rain: 'gu_yu',
  summer_solstice: 'xia_zhi',
  limit_of_heat: 'chu_shu',
  frost_descent: 'shuang_jiang',
});

/**
 * Formats a sexagenary day (日干支).
 *
 * @function get_sexagen_value
 * @param {HoukanDaySexagen} day
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
 * @function get_dun_value
 * @param {string} direction Flight direction.
 * @returns {string} Localized Dun value.
 */
const get_dun_value = direction =>
  direction === 'forward'
    ? formatted_value({ name: get_term('yang_dun') })
    : formatted_value({ name: get_term('yin_dun') });

/**
 * Formats "purple-white-flight" (紫白飛泊).
 *
 * @function get_flight_value
 * @param {string} direction Flight direction.
 * @returns {string} Localized flight value.
 */
const get_flight_value = direction =>
  formatted_value({ name: get_term(direction) });

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
    `  ${label('three_yuan')}: ${formatted_value(
      get_san_yuan_definition(hourly.san_yuan)
    )}`
  );

  console.log(
    `  ${label('star')}: ${formatted_value(
      get_purple_white_star_definition(hourly.star)
    )} (#${get_purple_white_star_number(hourly.star)})`
  );

  console.log(
    `  ${label('flight')}: ${get_flight_value(hourly.direction)}`
  );

  console.log(
    `  ${label('origin')}: ${format_datetime(hourly.origin_start)}`
  );

  console.log(`\n${label('monthly_boundary')}`);

  console.log(
    `  ${label('solar_term')}: ${formatted_value(
      get_solar_term_definition(monthly.solar_term)
    )}`
  );

  console.log(
    `  ${label('boundary')}: ${format_datetime(monthly.boundary)}`
  );

  console.log(`\n${label('daily_structure')}`);

  for (const [term, dun, san_yuan, star] of daily.periods) {
    const solar_term = DAILY_SOLAR_TERMS[term];
    const star_definition =
      get_purple_white_star_definition(
        get_purple_white_star(star)
      );

    console.log(
      `  ${formatted_value(get_solar_term_definition(solar_term))}: ` +
        `${formatted_value({ name: get_term(`${dun}_dun`) })}, ` +
        `${formatted_value({ name: get_term(san_yuan) })}, ` +
        `${formatted_value(star_definition)}`
    );
  }
};

run().catch(error => {
  console.error(`Error: ${error.message}`);
  process.exitCode = 1;
});
