/**
 * @module purple_white/methods/kigaku/annual
 */
import {
  get_effective_year,
  get_result,
  get_year_star_number,
} from './_shared';

/**
 * Calculates annual Purple-White for modern Kigaku.
 *
 * @function calculate_kigaku_annual
 * @param {*} date Date-like value.
 * @returns {PurpleWhiteResult} Annual result.
 */
export const calculate_kigaku_annual = date => {
  const effective_year = get_effective_year(date);
  return get_result(
    'kigaku_annual',
    'annual',
    get_year_star_number(effective_year),
    'yang',
    { effective_year }
  );
};
