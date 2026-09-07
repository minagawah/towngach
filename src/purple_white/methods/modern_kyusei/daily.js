import { build_method_result } from '../_shared';

/**
 * Calculates the daily Nine Star
 * (九星 / cửu tinh) result for the
 * modern Kyusei method.
 *
 * @typedef {function} calculate_modern_kyusei_daily
 * @param {CalendarDate} date
 * @returns {PurpleWhiteResult}
 */
export const calculate_modern_kyusei_daily = date =>
  build_method_result('modern_kyusei_daily', date, 23);
