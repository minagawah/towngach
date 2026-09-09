import { build_method_result } from '../_shared';
import { determine_houkan_monthly_period } from './_shared';

/**
 * Exposes the actual solar-term boundary used by Houkan monthly logic.
 * @param {*} date
 * @returns {Object}
 */
export const determine_houkan_monthly = date =>
  determine_houkan_monthly_period(date);

/**
 * Calculates monthly Houkan Purple-White.
 * @param {*} date
 * @returns {PurpleWhiteResult}
 */
export const calculate_houkan_monthly = date => {
  determine_houkan_monthly_period(date);
  return build_method_result('houkan_monthly', 'monthly');
};
