#!/usr/bin/env node

/**
 * Small manual checker for the Houkan Purple-White methods.
 *
 * Usage:
 *   node scripts/check_houkan.js
 *   node scripts/check_houkan.js 1974 5 10 4 0
 *
 * Positional arguments are year, month, day, hour, and optional minute.
 * When arguments are omitted in an interactive terminal, the script asks
 * for each value and uses the defaults below when input is blank.
 */

const path = require('path');
const readline = require('readline/promises');
const { stdin, stdout } = require('process');
const babel = require('@babel/core');

// The source tree uses ES modules, while this manual checker is intended
// to run directly with Node. Install a small local Babel require hook so
// the script does not require a separate build step.
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

const { create_calendar_date } = require('../src/calendar');
const houkan = require('../src/purple_white/methods/houkan');
const {
  get_purple_white_star_number,
} = require('../src/purple_white/star');

const DEFAULTS = Object.freeze({
  year: 1974,
  month: 5,
  day: 10,
  hour: 4,
  minute: 0,
});

const FIELDS = Object.freeze([
  ['year', 'Year'],
  ['month', 'Month'],
  ['day', 'Day'],
  ['hour', 'Hour'],
  ['minute', 'Minute'],
]);

const parse_value = (value, field) => {
  const parsed = Number(value);
  if (!Number.isInteger(parsed)) {
    throw new Error(`${field} must be an integer.`);
  }
  return parsed;
};

const get_command_line_values = () => {
  const values = process.argv.slice(2);
  return FIELDS.reduce((result, [key], index) => {
    if (values[index] !== undefined) {
      result[key] = parse_value(values[index], key);
    }
    return result;
  }, {});
};

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
    for (const [key, label] of FIELDS) {
      if (values[key] !== undefined) continue;
      const answer = await prompt.question(
        `${label} [${DEFAULTS[key]}]: `
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

const create_target = values =>
  create_calendar_date({
    year: values.year ?? DEFAULTS.year,
    month: values.month ?? DEFAULTS.month,
    day: values.day ?? DEFAULTS.day,
    hour: values.hour ?? DEFAULTS.hour,
    minute: values.minute ?? DEFAULTS.minute,
  });

const format_date = value => {
  const date =
    value.date instanceof Date ? value.date : value;
  return date.toISOString().replace('.000Z', 'Z');
};

const print_unresolved = (label, callback) => {
  try {
    callback();
  } catch (error) {
    console.log(
      `  ${label}: unresolved (${error.message})`
    );
  }
};

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

  console.log('\nHoukan Purple-White check');
  console.log(`  Input: ${format_date(target)}`);
  console.log('\nHourly');
  console.log(`  Day: ${day.sexagen}`);
  console.log(`  Hour branch: ${hourly.hour_branch}`);
  console.log(
    `  Dun: ${hourly.direction === 'forward' ? 'yang' : 'yin'}`
  );
  console.log(`  Three Yuan: ${hourly.san_yuan}`);
  console.log(
    `  Star: ${hourly.star} (#${get_purple_white_star_number(hourly.star)})`
  );
  console.log(`  Flight: ${hourly.direction}`);
  console.log(
    `  Origin: ${format_date(hourly.origin_start)}`
  );

  console.log('\nMonthly boundary');
  console.log(`  Solar term: ${monthly.solar_term}`);
  console.log(
    `  Boundary: ${format_date(monthly.boundary)}`
  );

  console.log('\nDaily structure');
  for (const [term, dun, san_yuan, star] of daily.periods) {
    console.log(
      `  ${term}: ${dun}, ${san_yuan}, star ${star}`
    );
  }

  console.log('\nCalculation availability');
  print_unresolved('Annual result', () =>
    houkan.calculate_houkan_annual(target)
  );
  print_unresolved('Monthly result', () =>
    houkan.calculate_houkan_monthly(target)
  );
  print_unresolved('Daily result', () =>
    houkan.calculate_houkan_daily(target)
  );
};

run().catch(error => {
  console.error(`Error: ${error.message}`);
  process.exitCode = 1;
});
