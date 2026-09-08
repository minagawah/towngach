import { build_method_result } from '../_shared';

/**
 * Calculates the hourly Purple-White
 * result for the classical method.
 *
 * @typedef {function} calculate_classical_hourly
 * @param {CalendarDate} date
 * @returns {PurpleWhiteResult}
 */
export const calculate_classical_hourly = date =>
  build_method_result('classical_hourly', 'hourly');
