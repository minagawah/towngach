import { build_method_result } from '../_shared';

/**
 * Calculates the monthly Purple-White
 * result for the classical method.
 *
 * @typedef {function} calculate_classical_monthly
 * @param {CalendarDate} date
 * @returns {PurpleWhiteResult}
 */
export const calculate_classical_monthly = date =>
  build_method_result('classical_monthly', date, 2);
