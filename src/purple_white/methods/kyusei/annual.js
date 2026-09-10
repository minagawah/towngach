/**
 * @module purple_white/methods/kyusei/annual
 */

import { build_method_result } from '../../core/utils/method';

/**
 * Calculates the annual Nine Star
 * (九星 / cửu tinh) result for the
 * modern Kyusei method.
 *
 * @typedef {function} calculate_kyusei_annual
 * @param {CalendarDate} date
 * @returns {PurpleWhiteResult}
 */
export const calculate_kyusei_annual = date => {
  void date;
  return build_method_result('kyusei_annual', 'annual');
};
