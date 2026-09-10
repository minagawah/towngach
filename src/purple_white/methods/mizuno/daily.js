/**
 * @module purple_white/methods/mizuno/daily
 */
import {
  get_day_index,
  get_latest_boundary,
  get_result,
} from '../kigaku/_shared';

/**
 * Returns the astronomical Yin/Yang mode for a date.
 *
 * @function get_daily_mode
 * @param {*} date Date-like value.
 * @returns {{mode: string, boundary: Object}} Daily mode data.
 */
const get_daily_mode = date => {
  const boundary = get_latest_boundary(date, [
    'dongzhi',
    'xiazhi',
  ]);
  return {
    mode:
      boundary.solar_term === 'dongzhi' ? 'yang' : 'yin',
    boundary,
  };
};

/**
 * Calculates daily Purple-White for Mizuno-style Kigaku.
 *
 * @function calculate_mizuno_daily
 * @param {*} date Date-like value.
 * @returns {PurpleWhiteResult} Daily result.
 */
export const calculate_mizuno_daily = date => {
  const day_index = get_day_index(date);
  const { mode, boundary } = get_daily_mode(date);
  const star_number =
    mode === 'yang'
      ? (day_index % 9) + 1
      : 9 - (day_index % 9);

  return get_result(
    'mizuno_daily',
    'daily',
    star_number,
    mode,
    {
      day_index,
      solstice: boundary.solar_term,
      solstice_boundary: boundary.date,
    }
  );
};

export { get_daily_mode };
