import { build_method_result } from '../_shared';

/**
 * Calculates the annual Nine Star
 * (九星 / cửu tinh) result for the
 * modern Kyusei method.
 *
 * @typedef {function} calculate_modern_kyusei_annual
 * @param {CalendarDate} date
 * @returns {PurpleWhiteResult}
 */
export const calculate_modern_kyusei_annual = date =>
  build_method_result('modern_kyusei_annual', date, 21);
