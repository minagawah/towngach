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
const { get_terminology } = require('../src/terminology');
const houkan = require('../src/purple_white/methods/houkan');
const { get_branch_definition } = require('../src/branch');
const { get_stem_definition } = require('../src/stem');
const {
  get_solar_term_definition,
} = require('../src/solar_term');
const {
  get_san_yuan_definition,
} = require('../src/san_yuan');
const {
  get_purple_white_star,
  get_purple_white_star_definition,
  get_purple_white_star_number,
} = require('../src/purple_white/star');

// Marty McFly escaping the Libyans at Twin Pines Mall
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

const DAILY_SOLAR_TERMS = Object.freeze({
  winter_solstice: 'dongzhi',
  rain_water: 'yushui',
  grain_rain: 'guyu',
  summer_solstice: 'xiazhi',
  limit_of_heat: 'chushu',
  frost_descent: 'shuangjiang',
});

const get_term = key => get_terminology(key);

const label = key => {
  const term = get_term(key);
  return `${term.en.primary} (${term.zh_tw.primary})`;
};

const value = definition =>
  `${definition.name.zh_tw.primary} (${definition.name.en.primary})`;

const get_sexagen_value = day => {
  const stem = get_stem_definition(day.stem);
  const branch = get_branch_definition(day.branch);
  return (
    `${stem.name.zh_tw.primary}${branch.name.zh_tw.primary}` +
    ` (${stem.name.en.primary}_${branch.name.en.primary})`
  );
};

const get_dun_value = direction =>
  direction === 'forward'
    ? value({ name: get_term('yang_dun') })
    : value({ name: get_term('yin_dun') });

const get_flight_value = direction =>
  value({ name: get_term(direction) });

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
      `  ${label}: ${value({
        name: get_term('unresolved'),
      })} (${error.message})`
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
