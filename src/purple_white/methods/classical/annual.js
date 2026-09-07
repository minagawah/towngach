import { build_method_result } from '../_shared';

/**
 * Calculates the annual Purple-White
 * result for the classical method.
 *
 * @typedef {function} calculate_classical_annual
 * @param {CalendarDate} date
 * @returns {PurpleWhiteResult}
 */
export const calculate_classical_annual = date =>
  build_method_result('classical_annual', date, 1);
