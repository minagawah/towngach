/**
 * @module purple_white/methods/kyusei/monthly
 */

import { build_method_result } from '../../core/utils/method';

/**
 * Calculates the monthly Nine Star
 * (九星 / cửu tinh) result for the
 * modern Kyusei method.
 *
 * @typedef {function} calculate_kyusei_monthly
 * @param {CalendarDate} date
 * @returns {PurpleWhiteResult}
 */
export const calculate_kyusei_monthly = date => {
  void date;
  return build_method_result('kyusei_monthly', 'monthly');
};
