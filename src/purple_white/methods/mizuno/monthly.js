/**
 * @module purple_white/methods/mizuno/monthly
 */
import {
  get_effective_year,
  get_latest_boundary,
  get_month_star_number,
  get_result,
} from '../kigaku/_shared';

/**
 * Calculates monthly Purple-White for Mizuno-style Kigaku.
 *
 * @function calculate_mizuno_monthly
 * @param {*} date Date-like value.
 * @returns {PurpleWhiteResult} Monthly result.
 */
export const calculate_mizuno_monthly = date => {
  const effective_year = get_effective_year(date);
  const boundary = get_latest_boundary(date, [
    'lichun',
    'jingzhe',
    'qingming',
    'lixia',
    'mangzhong',
    'xiaoshu',
    'liqiu',
    'bailu',
    'hanlu',
    'lidong',
    'daxue',
    'xiaohan',
  ]);
  return get_result(
    'mizuno_monthly',
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
