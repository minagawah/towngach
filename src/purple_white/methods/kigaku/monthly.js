/**
 * @module purple_white/methods/kigaku/monthly
 */
import {
  get_effective_year,
  get_latest_boundary,
  get_month_star_number,
  get_result,
  MONTH_TERMS,
} from './_shared';

/**
 * Calculates monthly Purple-White for modern Kigaku.
 *
 * @function calculate_kigaku_monthly
 * @param {*} date Date-like value.
 * @returns {PurpleWhiteResult} Monthly result.
 */
export const calculate_kigaku_monthly = date => {
  const effective_year = get_effective_year(date);
  const boundary = get_latest_boundary(date, MONTH_TERMS);
  return get_result(
    'kigaku_monthly',
    'monthly',
    get_month_star_number(date, effective_year),
    'yang',
    {
      effective_year,
      solar_term: boundary.solar_term,
      solar_term_boundary: boundary.date,
    }
  );
};
