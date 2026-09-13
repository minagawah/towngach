/**
 * @module purple_white/methods/mizuno/hourly
 */
import {
  get_latest_solar_term,
  get_result,
  get_solar_term_group,
  get_time_index,
} from '../kigaku/_shared';
import { get_daily_mode } from './daily';

const STARTING_STARS = Object.freeze({
  group_a: Object.freeze({ yang: 1, yin: 9 }),
  group_b: Object.freeze({ yang: 7, yin: 3 }),
  group_c: Object.freeze({ yang: 4, yin: 6 }),
});

/**
 * Calculates hourly Purple-White for Mizuno-style Kigaku.
 *
 * @function calculate_mizuno_hourly
 * @param {*} date Date-like value.
 * @returns {PurpleWhiteResult} Hourly result.
 */
export const calculate_mizuno_hourly = date => {
  const solar_term = get_latest_solar_term(date);
  const group = get_solar_term_group(solar_term.solar_term);
  const { mode, boundary: solstice_boundary } =
    get_daily_mode(date);
  const time_index = get_time_index(date);
  const base_star = STARTING_STARS[group][mode];
  const star_number =
    mode === 'yang'
      ? ((base_star - 1 + time_index) % 9) + 1
      : ((base_star - 1 + (9 - (time_index % 9))) % 9) + 1;

  return get_result(
    'mizuno_hourly',
    'hourly',
    star_number,
    mode,
    {
      solar_term: solar_term.solar_term,
      solar_term_boundary: solar_term.date,
      solar_term_group: group,
      solstice_boundary,
      base_star,
      time_index,
    }
  );
};
