import { build_method_result } from '../_shared';

/**
 * Calculates the daily Purple-White
 * result for the classical method.
 *
 * @typedef {function} calculate_classical_daily
 * @param {CalendarDate} date
 * @returns {PurpleWhiteResult}
 */
export const calculate_classical_daily = date =>
  build_method_result('classical_daily', date, 3);
