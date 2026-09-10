/**
 * @module purple_white/methods/kyusei/daily
 */

import { build_method_result } from '../../core/utils/method';

/**
 * Calculates the daily Nine Star
 * (九星 / cửu tinh) result for the
 * modern Kyusei method.
 *
 * @typedef {function} calculate_kyusei_daily
 * @param {CalendarDate} date
 * @returns {PurpleWhiteResult}
 */
export const calculate_kyusei_daily = date => {
  void date;
  return build_method_result('kyusei_daily', 'daily');
};
