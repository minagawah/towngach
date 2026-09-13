/**
 * @module purple_white/methods/mizuno/annual
 */
import {
  get_effective_year,
  get_result,
  get_year_star_number,
} from '../kigaku/_shared';

/**
 * Calculates annual Purple-White for Mizuno-style Kigaku.
 *
 * @function calculate_mizuno_annual
 * @param {*} date Date-like value.
 * @returns {PurpleWhiteResult} Annual result.
 */
export const calculate_mizuno_annual = date => {
  const effective_year = get_effective_year(date);
  return get_result(
    'mizuno_annual',
    'annual',
    get_year_star_number(effective_year),
    'yang',
    { effective_year }
  );
};
