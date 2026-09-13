#!/usr/bin/env node

/**
 * Small manual checker for Mizuno-style Kigaku Purple-White methods.
 *
 * Usage:
 *   node scripts/check_mizuno.js
 *   node scripts/check_mizuno.js \
 *     1974 5 10 4 0
 *
 * Positional arguments are year, month, day,
 * hour, and optional minute. When arguments
 * are omitted in an interactive terminal, the
 * script asks for each value and uses the same
 * defaults as the Houkan checker when input is blank.
 *
 * @module scripts/check_mizuno
 */

/**
 * Normalized Towngach calendar date.
 * @typedef {import('../src/calendar/calendar').CalendarDate} CalendarDate
 */

/**
 * Purple-White star identifier.
 * @typedef {import('../src/purple_white/core/nine_stars/star').PurpleWhiteStar} PurpleWhiteStar
 */

/**
 * Purple-White calculation result.
 * @typedef {import('../src/purple_white/core/utils/purple_white').PurpleWhiteResult} PurpleWhiteResult
 */

const shared = require('./shared/manual_checker');
const { PurpleWhite, SolarTerm } = require('../src');
const { get_solar_term_definition } = SolarTerm;
const {
  get_purple_white_star_definition,
  get_purple_white_star_number,
} = PurpleWhite;
const mizuno = PurpleWhite.methods.mizuno;

const {
  ask_for_values,
  create_target,
  format_date,
  get_command_line_values,
  get_term,
  label,
  print_unresolved,
  value,
} = shared;

/**
 * Formats a Purple-White star.
 *
 * @function get_star_value
 * @param {PurpleWhiteStar} star Purple-White star.
 * @returns {string} Localized star value.
 */
const get_star_value = star =>
  `${value(get_purple_white_star_definition(star))}` +
  ` (#${get_purple_white_star_number(star)})`;

/**
 * Formats a Yin/Yang mode.
 *
 * @function get_mode_value
 * @param {string} mode Yin/Yang mode.
 * @returns {string} Localized mode value.
 */
const get_mode_value = mode =>
  value({ name: get_term(`${mode}_dun`) });

/**
 * Runs the Mizuno manual checker.
 *
 * @function run
 * @returns {Promise.<void>} Completed check.
 */
const run = async () => {
  const values = await ask_for_values(
    get_command_line_values()
  );
  const target = create_target(values);
  const annual = mizuno.calculate_mizuno_annual(target);
  const monthly = mizuno.calculate_mizuno_monthly(target);
  const daily = mizuno.calculate_mizuno_daily(target);
  const hourly = mizuno.calculate_mizuno_hourly(target);

  console.log(
    `\nMizuno-style Kigaku ${value({
      name: get_term('purple_white'),
    })} check`
  );

  console.log(
    '\nMarty McFly escaping the Libyans at Twin Pines Mall\n'
  );

  console.log(
    `  ${label('input')}: ${format_date(target)}`
  );

  console.log(`\n${label('annual_result')}`);
  console.log(
    `  ${label('star')}: ${get_star_value(annual.star)}`
  );
  console.log(`  effective year: ${annual.effective_year}`);

  console.log(`\n${label('monthly_result')}`);
  console.log(
    `  ${label('star')}: ${get_star_value(monthly.star)}`
  );
  console.log(
    `  ${label('solar_term')}: ${value(
      get_solar_term_definition(monthly.solar_term)
    )}`
  );
  console.log(
    `  ${label('boundary')}: ${format_date(
      monthly.solar_term_boundary
    )}`
  );

  console.log(`\n${label('daily_result')}`);
  console.log(`  mode: ${get_mode_value(daily.mode)}`);
  console.log(
    `  ${label('star')}: ${get_star_value(daily.star)}`
  );
  console.log(`  day index: ${daily.day_index}`);
  console.log(
    `  ${label('boundary')}: ${format_date(
      daily.solstice_boundary
    )}`
  );

  console.log(`\n${label('hourly_result')}`);
  console.log(`  mode: ${get_mode_value(hourly.mode)}`);
  console.log(
    `  ${label('star')}: ${get_star_value(hourly.star)}`
  );
  console.log(`  time index: ${hourly.time_index}`);
  console.log(
    `  solar-term group: ${hourly.solar_term_group}`
  );
  console.log(`  base star: ${hourly.base_star}`);
  console.log(
    `  ${label('solar_term')}: ${value(
      get_solar_term_definition(hourly.solar_term)
    )}`
  );
  console.log(
    `  ${label('boundary')}: ${format_date(
      hourly.solar_term_boundary
    )}`
  );

  console.log(`\n${label('calculation_availability')}`);
  print_unresolved('Kigaku daily result', () =>
    PurpleWhite.methods.kigaku.calculate_kigaku_daily(
      target
    )
  );
  print_unresolved('Kigaku hourly result', () =>
    PurpleWhite.methods.kigaku.calculate_kigaku_hourly(
      target
    )
  );
};

run().catch(error => {
  console.error(`Error: ${error.message}`);
  process.exitCode = 1;
});
