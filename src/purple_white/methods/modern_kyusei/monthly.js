import { build_method_result } from '../_shared';

/**
 * Calculates the monthly Nine Star
 * (九星 / cửu tinh) result for the
 * modern Kyusei method.
 *
 * @typedef {function} calculate_modern_kyusei_monthly
 * @param {CalendarDate} date
 * @returns {PurpleWhiteResult}
 */
export const calculate_modern_kyusei_monthly = date =>
  build_method_result('modern_kyusei_monthly', date, 22);
