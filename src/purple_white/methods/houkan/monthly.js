/**
 * @module purple_white/methods/houkan/monthly
 */

import { build_method_result } from '../../core/utils/method';
import { determine_houkan_monthly_period } from './_shared';

/**
 * Exposes the actual solar-term
 * (節氣) boundary used by Houkan
 * (方鑑) monthly logic.
 *
 * @param {*} date
 * @returns {Object}
 */
export const determine_houkan_monthly = date =>
  determine_houkan_monthly_period(date);

/**
 * Calculates monthly Purple-White
 * (月家紫白) for Houkan (方鑑).
 *
 * @param {*} date
 * @returns {PurpleWhiteResult}
 */
export const calculate_houkan_monthly = date => {
  determine_houkan_monthly_period(date);
  return build_method_result('houkan_monthly', 'monthly');
};
