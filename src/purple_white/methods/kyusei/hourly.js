/**
 * @module purple_white/methods/kyusei/hourly
 */

import { build_method_result } from '../../core/utils/method';

/**
 * Calculates the hourly Nine Star
 * (九星 / cửu tinh) result for the
 * modern Kyusei method.
 *
 * @typedef {function} calculate_kyusei_hourly
 * @param {CalendarDate} date
 * @returns {PurpleWhiteResult}
 */
export const calculate_kyusei_hourly = date => {
  void date;
  return build_method_result('kyusei_hourly', 'hourly');
};
